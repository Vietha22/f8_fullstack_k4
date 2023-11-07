import image from "./Assets/images/404-not-found.jpg";
import "./Assets/Errors.scss";
export const Error = () => {
  return `
    <div class="error-page">
        <img src="${image}" />
    </div>
    `;
};
