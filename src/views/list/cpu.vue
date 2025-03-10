<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/CPUBanner.jpg";
const headers = [
  "STT",
  "Hãng CPU",
  "Tên CPU",
  "Thế hệ CPU",
  "Số nhân",
  "Số luồng",
  "Xung nhịp",
  "Thao tác",
];
const data = Array(20).fill([
  "demo",
  "demo",
  "demo",
  "demo",
  "demo",
  "demo",
  "demo",
  "demo",
]);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH CPU"
    :image="bannerImage"
    :headers="headers"
    :data="data"
  />
</template>
