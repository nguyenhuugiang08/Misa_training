import { createApp } from "vue";
import "./assets/css/main.css";
import App from "./App.vue";
import router from "./routers";
import diy from "./store/diy";
import { vue3Debounce } from "vue-debounce";
import vueDebounce, { PluginConfig, debounce } from "vue-debounce";
import vueClickOutsideElement from 'vue-click-outside-element'
import 'devextreme/dist/css/dx.light.css';

const app = createApp(App);

app.use(vueClickOutsideElement)
app.use < PluginConfig > (vueDebounce, { lock: true, defaultTime: "400ms", listenTo: "keyup" });
app.provide("diy", diy);
app.directive("debounce", vue3Debounce({ lock: true }));
app.use(router);
app.mount("#app");
