import { createApp } from "vue";
import "./assets/css/main.css";
import App from "./App.vue";
import router from "./routers";
import diy from "./store/diy";
import { vue3Debounce } from "vue-debounce";

const app = createApp(App);

app.provide("diy", diy);
app.directive("debounce", vue3Debounce({ lock: true }));
app.use(router);
app.mount("#app");
