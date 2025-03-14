<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/RamBanner.jpg";
const headers = [
  "STT",
  "Loại ram",
  "Dung lượng",
  "Số khe",
  "Hỗ trợ tối đa",
  "Trạng thái",
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
    title="DANH SÁCH RAM"
    :image="bannerImage"
    :headers="headers"
    :data="data"
    link="/RamCRUD"
  />
</template>
