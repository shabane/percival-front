import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/style.css";

// createApp(App).use(router).mount("#app");

function getCookieValue(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

function getCredits() {
  return {
    username: getCookieValue("username"),
    password: getCookieValue("password"),
  };
}

const app = createApp(App);
app.config.globalProperties.$getCookieValue = getCookieValue;
app.config.globalProperties.$getCredits = getCredits;
app.use(router);
app.mount("#app");
