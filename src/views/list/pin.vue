

<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/pinBanner.jpg";
const headers = [
  "STT",
  "Mã pin",
  "Thời lượng pin",
  "Dung lượng pin",
  "Công xuất sạc",
  "Thao tác",
];
const data = Array(20).fill([
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
    title="DANH SÁCH PIN SẠC"
    :image="bannerImage"
    :headers="headers"
    :data="data"
  />
</template>

