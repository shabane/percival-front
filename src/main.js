import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/style.css";

// createApp(App).use(router).mount("#app");
const app = createApp(App);
app.use(router);
app.mount("#app");
