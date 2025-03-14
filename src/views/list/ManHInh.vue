<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/ManhinhBanner.jpg";
const headers = [
  "STT",
  "Mã màn hình",
  "Kích thước",
  "Tần số quét",
  "Tấm nền",
  "Độ phân giải",
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
    title="DANH SÁCH MÀN HÌNH"
    :image="bannerImage"
    :headers="headers"
    :data="data"
  />
</template>
