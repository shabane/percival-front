import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/style.css";
import { isValidLink, usernamer, passworder } from "@/tools";

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

function setCookie(key, value) {
  let date = new Date();
  date.setTime(date.getTime() + 31 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

const app = createApp(App);
app.config.globalProperties.$getCookieValue = getCookieValue;
app.config.globalProperties.$getCredits = getCredits;
app.config.globalProperties.$isValidLink = isValidLink;
app.config.globalProperties.$usernamer = usernamer;
app.config.globalProperties.$passworder = passworder;
app.config.globalProperties.$setCookie = setCookie;
app.use(router);
app.mount("#app");
