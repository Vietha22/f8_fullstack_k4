import { client } from "./client.js";
import { config } from "./config.js";
const { SERVER_API_AUTH, PAGE_LIMIT } = config;

client.setUrl(SERVER_API_AUTH);

const app = {
  root: document.querySelector("#root"),
  query: {
    // _sort: "id",
    _page: 1,
    _limit: PAGE_LIMIT,
  },
  isLogin: function () {
    let token = localStorage.getItem("login_token");
    let accessToken;

    if (token) {
      accessToken = JSON.parse(token).accessToken;
    }
    const status = accessToken ? true : false;
    if (!status) {
      localStorage.removeItem("login_token");
    }

    return status;
  },
  render: function () {
    console.log("re-render");
    let html;

    if (this.isLogin()) {
      html = `
      <div class="container py-3">
        <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
        <ul class="profile list-unstyled d-flex gap-3">
          <li>Chào bạn: <span class="name">Loading...</span></li>
          <li><a href="#" class="text-decoration-none logout">Đăng xuất</a></li>
        </ul>
        <div class="w-50">
          <h2 class="">Viết bài</h2>
          <form action="" class="writePost">
            <div class="mb-3">
              <label for="">Enter your title</label>
              <input type="text" name="title" class="form-control title" placeholder="Title..." required/>
            </div>
            <div class="mb-3">
              <label for="">Enter your content</label>
              <textarea class="form-control content" rows="3" placeholder="Content..." required></textarea>
            </div>
            <div class="gap-2">
              <button class="btn btn-primary" type="submit">Write new</button>
            </div>
            <div class="msg mt-3 text-danger text-center"></div>
          </form>
        </div>
        </div>
        `;
      this.getProfile();
    } else {
      html = `
      <div class="container py-3">
        <div class="row">
          <div class="">
            <button class="btn btn-primary loginBtn">Đăng nhập</button>
          </div>
        </div>
      </div>
      `;
    }

    html += `<div class="posts container py-3"></div>`;

    this.root.innerHTML = html;
    this.getPosts(this.query);
  },
  renderPosts: function (posts) {
    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
    const postsEl = this.root.querySelector(".posts");

    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");

      postEl.innerHTML = `
      <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
        <span>${post.userId.name}</span>
      </a>
      <h3>${post.title}</h3> 
      <p>${post.content}</p>
      <hr />
      `;

      postsEl.append(postEl);
    });
  },
  getPosts: async function (query = {}) {
    let queryString = new URLSearchParams(query).toString();
    queryString = queryString ? "?" + queryString : "";
    const { response, data } = await client.get(`/blogs${queryString}`);
    const { data: posts } = data;
    if (posts.length) {
      this.renderPosts(posts);
    } else {
      // this.endOfPosts = true;
      // this.hideLoader();
      // const footer = document.querySelector(".footer");
      // footer.innerHTML = `<p>Đã xem hết tất cả bài viết!</p>`;
    }
  },
  addEvent: function () {
    this.root.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("login")) {
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");

        const email = emailEl.value;
        const password = passwordEl.value;

        this.login({ email, password });
      }
    });

    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("logout")) {
        e.preventDefault();
        this.logout();
      }
    });

    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("loginBtn")) {
        this.renderLoginForm();
      }
    });

    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("registerBtn")) {
        this.renderRegisterForm();
      }
    });

    this.root.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("register")) {
        const nameEl = e.target.querySelector(".name");
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");

        const name = nameEl.value;
        const email = emailEl.value;
        const password = passwordEl.value;

        this.register({ email, password, name });
      }
    });

    this.root.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("writePost")) {
        const titleEl = e.target.querySelector(".title");
        const contentEl = e.target.querySelector(".content");

        const title = titleEl.value;
        const content = contentEl.value;

        this.writePost({
          title,
          content,
        });
      }
    });

    window.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !this.endOfPosts) {
        // this.showLoader();
        setTimeout(() => {
          this.query._page++;
          this.getPosts(this.query);
        }, 500);
      }
    });
  },
  writePost: async function (info) {
    const titleEl = document.querySelector(".title");
    const contentEl = document.querySelector(".content");
    try {
      this.loadingWrite(); //Thêm loading

      let token = localStorage.getItem("login_token");
      let accessToken;

      if (token) {
        accessToken = JSON.parse(token).accessToken;
      }

      if (!accessToken) {
        throw new Error("accessToken not null");
      }

      client.setToken(accessToken);
      const { response, data } = await client.post("/blogs", info);

      if (response.status === 401) {
        throw new Error("accessToken hết hạn");
      }

      if (response.status === 200) {
        titleEl.value = "";
        contentEl.value = "";
        this.loadingWrite(false); //Xóa loading
      }

      this.render();
    } catch (e) {
      if (e.message === "accessToken hết hạn") {
        const title = titleEl.value;
        const content = contentEl.value;

        await this.getRefreshToken();
        await this.writePost({ title, content });
      }
    }
  },
  loadingLogin: function (status = true) {
    const button = this.root.querySelector(".login .btn");
    if (status) {
      button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
      button.disabled = true;
    } else {
      button.innerHTML = `Đăng nhập`;
      button.disabled = false;
    }
  },
  loadingRegister: function (status = true) {
    const button = this.root.querySelector(".register .btn");
    if (status) {
      button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
      button.disabled = true;
    } else {
      button.innerHTML = `Đăng ký`;
      button.disabled = false;
    }
  },
  loadingWrite: function (status = true) {
    const button = this.root.querySelector(".writePost .btn");
    if (status) {
      button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
      button.disabled = true;
    } else {
      button.innerHTML = `Write new`;
      button.disabled = false;
    }
  },
  showError: function (auth, msgText) {
    const msg = this.root.querySelector(`${auth} .msg`);
    msg.innerText = ``;
    msg.innerText = msgText;
  },
  login: async function (info) {
    this.loadingLogin(); //Thêm loading
    try {
      //Call API
      const { response, data } = await client.post("/auth/login", info);
      this.loadingLogin(false); //Xóa loading

      if (response.status === 400) {
        throw new Error(data.message);
      }

      //Thêm token vào Storage (localStorage)
      const { accessToken, refreshToken } = data.data;
      const token = { accessToken, refreshToken };
      localStorage.setItem("login_token", JSON.stringify(token));
      //Render
      this.render();
    } catch (e) {
      this.showError(".login", e.message);
    }
  },
  register: async function (info) {
    this.loadingRegister();
    try {
      //Call API
      const { response, data } = await client.post("/auth/register", info);
      this.loadingRegister(false); //Xóa loading

      if (response.status === 400) {
        throw new Error(data.message);
      }

      this.renderLoginForm();
    } catch (e) {
      this.showError(".register", e.message);
    }
  },
  renderLoginForm: function () {
    let html = `
    <div class="container py-3">
      <div class="row justify-content-center">
        <div class="col-8 col-lg-6">
          <h2 class="text-center">Đăng nhập</h2>
          <form action="" class="login">
            <div class="mb-3">
              <label for="">Email</label>
              <input type="email" name="email" class="form-control email" placeholder="Email..." required/>
            </div>
            <div class="mb-3">
              <label for="">Password</label>
              <input type="password" name="password" class="form-control password" placeholder="Password..." required/>
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit">Đăng nhập</button>
              <button class="btn btn-primary registerBtn" type="button">Đăng ký</button>
            </div>
            <div class="msg mt-3 text-danger text-center"></div>
          </form>
        </div>
      </div>
    </div>`;
    this.root.innerHTML = html;
  },
  renderRegisterForm: function () {
    let html = `
        <div class="container py-3">
          <div class="row justify-content-center">
            <div class="col-8 col-lg-6">
              <h2 class="text-center">Đăng ký</h2>
              <form action="" class="register">
                <div class="mb-3">
                  <label for="">Điền tên</label>
                  <input type="text" name="name" class="form-control name" placeholder="Name..." required/>
                </div>
                <div class="mb-3">
                  <label for="">Điền email</label>
                  <input type="email" name="email" class="form-control email" placeholder="Email..." required/>
                </div>
                <div class="mb-3">
                  <label for="">Điền password</label>
                  <input type="password" name="password" class="form-control password" placeholder="Password..." required/>
                </div>
                <div class="d-grid">
                  <button class="btn btn-primary" type="submit">Đăng ký</button>
                </div>
                <div class="msg mt-3 text-danger text-center"></div>
              </form>
            </div>
          </div>
        </div>`;
    this.root.innerHTML = html;
  },
  getProfile: async function () {
    try {
      let token = localStorage.getItem("login_token");
      let accessToken;

      if (token) {
        accessToken = JSON.parse(token).accessToken;
      }

      if (!accessToken) {
        throw new Error("accessToken not null");
      }

      client.setToken(accessToken);
      const { response, data: user } = await client.get("/users/profile");

      if (response.status === 401) {
        throw new Error("accessToken hết hạn");
      }

      const profileEl = this.root.querySelector(".profile");
      const profileName = profileEl.querySelector(".name");
      profileName.innerText = user.data.name;
    } catch (e) {
      if (e.message === "accessToken hết hạn") {
        await this.getRefreshToken();
        await this.getProfile();
      }
    }
  },
  logout: async function () {
    try {
      let token = localStorage.getItem("login_token");
      let accessToken;

      if (token) {
        accessToken = JSON.parse(token).accessToken;
      }

      if (!accessToken) {
        throw new Error("accessToken not null");
      }

      client.setToken(accessToken);
      const { response, data } = await client.post("/auth/logout");

      if (response.status === 401) {
        throw new Error("Unauthorize");
      }

      localStorage.removeItem("login_token");
      this.render();
    } catch (e) {
      localStorage.removeItem("login_token");
      this.render();
    }
  },
  getRefreshToken: async function () {
    try {
      let token = localStorage.getItem("login_token");
      let refreshToken;

      if (token) {
        refreshToken = JSON.parse(token).refreshToken;
      }

      if (!refreshToken) {
        throw new Error("refreshToken not null");
      }

      const { response, data } = await client.post("/auth/refresh-token", {
        refreshToken,
      });

      if (response.status === 401) {
        throw new Error("Unauthorize");
      }

      console.log("Lấy token mới");

      const newToken = data.data.token;
      localStorage.setItem("login_token", JSON.stringify(newToken));
    } catch (e) {
      if (e.message === "Unauthorize") {
        localStorage.removeItem("login_token");
        this.render();
        console.log("Vui lòng đăng nhập lại để lấy refreshToken mới!");
      }
    }
  },
  start: function () {
    //Khởi động ứng dụng
    this.render();
    this.addEvent();
  },
};

app.start();
