import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import router from "./routers";
import VueApexCharts from "vue3-apexcharts";
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas)

const pinia = createPinia()

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(VueApexCharts).component("apexchart", VueApexCharts)
    .use(pinia)
    .use(router)
    .mount("#app")
