import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./routers";
import VueApexCharts from "vue3-apexcharts";
import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://appwrite.khoadang.info.vn/v1")
  .setProject("67da2d570011d22db4bc");
const account = new Account(client);
const databases = new Databases(client);

const result = await databases.listDocuments(
  "67da2d9b003aa9b7f455", // databaseId
  "67da320a0000ffdd969a", // collectionId
  [], // queries (optional)
);

console.log(result);

const pinia = createPinia();

createApp(App)
  .use(VueApexCharts)
  .component("apexchart", VueApexCharts)
  .use(pinia)
  .use(router)
  .mount("#app");
