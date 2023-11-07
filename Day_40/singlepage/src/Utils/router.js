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
      navigator.on(route.path, (params) => {
        const pattern = /\{body\}/;
        html = defaultLayout
          ? defaultLayout().replace(pattern, route.component(params))
          : route.component(params);
        render(html);
      });
    });
  }

  navigator.notFound(() => {
    html = Error();
    render(html);
  });
  navigator.resolve();
};

window.navigate = (path) => {
  navigator.navigate(path);
};
