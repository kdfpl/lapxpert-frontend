<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from '../../assets/img/colorBanner.jpg';
import { SquarePen } from 'lucide-vue-next';
const headers = ["STT", "Mã màu", "Tên màu", "Hiển thị", "Thao tác"];

function getColer(color) {
  return `<div class='w-10 h-10 rounded-full' style='background-color: ${color};'></div>`;
}
const data = [
  [1, "#FF5733", "Đỏ cam", getColer("#FF5733")],
  [2, "#33FF57", "Xanh lá", getColer("#33FF57")],
  [3, "#3357FF", "Xanh dương", getColer("#3357FF")],
  [4, "#FFD700", "Vàng", getColer("#FFD700")],
  [5, "#FF69B4", "Hồng", getColer("#FF69B4")],
];
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH MÀU SẮC"
    :image="bannerImage"
    :headers="headers"
    :data="data"
  />

  
</template>
