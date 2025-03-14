<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/RamBanner.jpg";
import { ref, onMounted } from "vue";
import { getAllRam} from "../../service/SPCTService.js"; 
const headers = [
  "STT",
  "Loại ram",
  "Dung lượng",
  "Số khe",
  "Hỗ trợ tối đa",
  "Thao tác",
];
const ram = ref([]);

const fetchRam = async () => {
    const data = await getAllRam();
    ram.value = data.map((ram,i) => ({
      stt: i+1,
      loaiRam: ram.idLoaiRam.tenLoaiRam,
      dungLuong: ram.dungLuongRam,
      soKhe: ram.soKheRam,
      hoTroToiDa: ram.hoTroToiDa,
    }));
  };
  onMounted(fetchRam);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH RAM"
    :image="bannerImage"
    :headers="headers"
    :data="ram"
    link="/RamCRUD"
  />
</template>
