<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/GPUBanner.jpg";
const headers = [
  "STT",
  "Loại GPU",
  "Mã GPU",
  "Tên GPU",
  "Công nghệ",
  "Bộ nhớ VRam",
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
]);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH GPU"
    :image="bannerImage"
    :headers="headers"
    :data="data"
  />
</template>
