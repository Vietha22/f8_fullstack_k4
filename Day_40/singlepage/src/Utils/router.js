import Navigo from "navigo";
import { Error } from "../Error";

const navigator = new Navigo("/", { linksSelector: "a" });

const root = document.querySelector("#root");
const render = (html) => {
  root.innerHTML = html;
};

export const router = (routes, defaultLayout = null) => {
  let html;

  if (routes.length) {
    routes.forEach((route) => {
      navigator
        .on(route.path, (params) => {
          html = defaultLayout ? defaultLayout() : route.component(params);
          const pattern = /\{body\}/;
          html = html.replace(pattern, route.component(params));
          render(html);
        })
        .notFound(() => {
          html = Error();
          render(html);
        });
    });
  }

  navigator.resolve();
};

window.navigate = (path) => {
  navigator.navigate(path);
};

// import Navigo from "navigo";
// import { Error } from "../Error";

// const routerNav = new Navigo("/", { linksSelector: "a" });
// const root = document.querySelector("#root");
// window.navigate = (path) => {
//   routerNav.navigate(path);
// };

// const render = (content) => {
//   root.innerHTML = content;
// };

// export const router = (pathArr, mainLayout = null) => {
//   let html = `{body}`;
//   if (mainLayout) {
//     html = mainLayout();
//   }

//   if (Array.isArray(pathArr)) {
//     pathArr.forEach((item) => {
//       routerNav.on(item.path, (param) =>
//         render(html.replace(/\{body\}/g, item.component(param)))
//       );
//     });
//   }
//   routerNav.notFound(() => render(Error()));
//   routerNav.resolve();
// };
