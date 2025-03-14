<script setup>
import { ref, onMounted } from "vue";
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/GPUBanner.jpg";
import { getAllGpu} from "../../service/SPCTService.js"; 
const headers = [
  "STT",
  "Loại GPU",
  "Mã GPU",
  "Tên GPU",
  "Công nghệ",
  "Bộ nhớ VRam",
  "Thao tác",
];

const gpu = ref([]);

const fetchGpu = async () => {
    const data = await getAllGpu();
    gpu.value = data.map((gpu,i) => ({
      stt: i+1,
      loaiGpu: gpu.loaiGpu,
      maGpu: gpu.maGpu,
      tenGpu: gpu.tenGpu,
      congNgheGpu: gpu.congNgheGpu,
      boNhoVram: gpu.boNhoVram,
    }));
  };
  onMounted(fetchGpu);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH GPU"
    :image="bannerImage"
    :headers="headers"
    :data="gpu"
  />
</template>
