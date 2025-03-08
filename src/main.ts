import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import router từ file index.js

const app = createApp(App);
app.use(router);
app.mount("#app"); // Phải có <div id="app"></div> trong index.html
