<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from '../../assets/img/colorBanner.jpg';
import { ref, onMounted } from "vue";
import { getAllMauSac} from "../../service/SPCTService.js"; 
// import { SquarePen } from 'lucide-vue-next'; --lấy màu
const headers = ["STT", "Mã màu", "Tên màu", "Thao tác"];

// function getColer(color) {
//   return `<div class='w-10 h-10 rounded-full' style='background-color: ${color};'></div>`;
// }  --hàm get mã màu
const mauSac = ref([]);

const fetchMauSac = async () => {
    const data = await getAllMauSac();
    mauSac.value = data.map((mauSac,i) => ({
      stt: i+1,
      maMau: mauSac.maMau,
      tenMau: mauSac.tenMau
    }));
  };
  onMounted(fetchMauSac);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH MÀU SẮC"
    :image="bannerImage"
    :headers="headers"
    :data="mauSac"
  />

  
</template>
