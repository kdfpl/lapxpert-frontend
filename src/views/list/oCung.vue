<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/OCBanner.jpg";
const headers = [
  "STT",
  "Loại ổ cứng",
  "Mã ổ cứng",
  "Tên ổ cứng",
  "Dung lượng",
  "Chuẩn kết nối",
  "Tốc độ đọc",
  "Tốc độ ghi",
  "Hỗ trợ nâng cấp",
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
  "demo",
  "demo",
]);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH Ổ CỨNG"
    :image="bannerImage"
    :headers="headers"
    :data="data"
  />
</template>
