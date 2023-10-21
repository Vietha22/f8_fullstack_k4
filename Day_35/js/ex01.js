import { client } from "./client.js";
import { config } from "./config.js";
const { PAGE_LIMIT } = config;

const app = {
  rootEl: document.querySelector(".posts"),
  query: {
    _sort: "id",
    _page: 1,
    _limit: PAGE_LIMIT,
  },
  endOfPosts: false,
  render: function (posts) {
    const stripHtml = (html) => html.replace(/(<([^>]+)>)/gi, "");
    this.rootEl.innerHTML += posts
      .map(
        (post) =>
          `<div class="post">
            <div class="postAuthor">
              <img class="avatar" src="${stripHtml(post.avatar)}" alt="" />
              <h3 class="authorName">${stripHtml(post.username)}</h3>
            </div>
            <img class="postImg" src="${stripHtml(post.img)}" alt="" />
            <div class="postInfo">
              <div class="postCats">
                <span class="postCat">#${stripHtml(post.category)}</span>
              </div>
              <a class="link">
                <span class="postTitle">${stripHtml(post.title)}</span>
              </a>
              <span class="postDate"></span>
            </div>
            <p class="postDesc">${stripHtml(post.content)}</p>
          </div>`
      )
      .join("");
  },

  // Call API
  getPosts: async function (query = {}) {
    let queryString = new URLSearchParams(query).toString();
    queryString = queryString ? "?" + queryString : "";
    const { data: posts } = await client.get(`/posts${queryString}`);
    if (posts.length) {
      this.render(posts);
    } else {
      this.endOfPosts = true;
      this.hideLoader();
      const footer = document.querySelector(".footer");
      footer.innerHTML = `<p>Đã xem hết tất cả bài viết!</p>`;
    }
  },

  hideLoader: function () {
    const loader = document.querySelector(".loader");
    loader.classList.remove("show");
  },

  showLoader: function () {
    const loader = document.querySelector(".loader");
    loader.classList.add("show");
  },

  loadPosts: function () {
    window.addEventListener(
      "scroll",
      () => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !this.endOfPosts) {
          this.showLoader();
          setTimeout(() => {
            this.query._page++;
            this.getPosts(this.query);
          }, 500);
        }
      },
      {
        passive: true,
      }
    );
  },

  // Khởi động app
  start: function () {
    this.getPosts(this.query);
    this.loadPosts();
  },
};

// Chạy app
app.start();
