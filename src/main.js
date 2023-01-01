import { createApp } from "vue";
import "./assets/css/main.css";
import App from "./App.vue";
import router from "./routers";
import diy from "./store/diy";

const app = createApp(App);

app.provide("diy", diy);

app.use(router);
app.mount("#app");
