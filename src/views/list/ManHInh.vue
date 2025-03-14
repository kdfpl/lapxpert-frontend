<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/ManhinhBanner.jpg";
import { ref, onMounted } from "vue";
import { getAllManHinh} from "../../service/SPCTService.js"; 
const headers = [
  "STT",
  "Mã màn hình",
  "Kích thước",
  "Tần số quét",
  "Tấm nền",
  "Độ phân giải",
  "Thao tác",
];
const manHinh = ref([]);

const fetchManHinh = async () => {
    const data = await getAllManHinh();
    manHinh.value = data.map((manHinh,i) => ({
      stt: i+1,
      maManHinh: manHinh.maManHinh,
      kichThuoc: manHinh.kichThuoc,
      tanSoQuet: manHinh.tanSoQuet,
      loaiTamNen: manHinh.loaiTamNen,
      doPhanGiai: manHinh.doPhanGiai,
    }));
  };
  onMounted(fetchManHinh);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH MÀN HÌNH"
    :image="bannerImage"
    :headers="headers"
    :data="manHinh"
  />
</template>
