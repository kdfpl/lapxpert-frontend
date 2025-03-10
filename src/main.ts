import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(VueApexCharts).component('apexchart', VueApexCharts)
    .use(router)
    .mount('#app')
