import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import router from "./routers";
import VueApexCharts from "vue3-apexcharts";

const pinia = createPinia()

createApp(App)
    .use(VueApexCharts).component("apexchart", VueApexCharts)
    .use(pinia)
    .use(router)
    .mount("#app")
