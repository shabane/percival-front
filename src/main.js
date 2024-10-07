import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/style.css";

// createApp(App).use(router).mount("#app");

function getCookieValue(cookieName) {
  return new Promise((resolve, reject) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        resolve(cookie.substring(name.length, cookie.length));
        return;
      }
    }
    reject(`Cookie with name ${cookieName} not found`);
  });
}

function getCredits() {
  return Promise.all([
    getCookieValue("username"),
    getCookieValue("password"),
  ]).then(([username, password]) => ({
    username,
    password,
  }));
}

const app = createApp(App);
app.config.globalProperties.$getCookieValue = getCookieValue;
app.config.globalProperties.$getCredits = getCredits;
app.use(router);
app.mount("#app");
