<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/OCBanner.jpg";
import { ref, onMounted } from "vue";
import { getAllOCung} from "../../service/SPCTService.js"; 
const headers = [
  "STT",
  "Loại ổ cứng",
  "Mã ổ cứng",
  "Dung lượng",
  "Chuẩn kết nối",
  "Tốc độ đọc",
  "Tốc độ ghi",
  "Hỗ trợ nâng cấp",
  "Thao tác",
];
const oCung = ref([]);

const fetchOCung = async () => {
    const data = await getAllOCung();
    oCung.value = data.map((oCung,i) => ({
      stt: i+1,
      loaiOCung: oCung.loaiOCung,
      maOCung: oCung.maOCung,
      dungLuong: oCung.dungLuong,
      chuanKetNoi: oCung.chuanKetNoi,
      tocDoDoc: oCung.tocDoDoc,
      tocDoGhi: oCung.tocDoGhi,
      hoTroNangCap: oCung.hoTroNangCap,
    }));
  };
  onMounted(fetchOCung);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH Ổ CỨNG"
    :image="bannerImage"
    :headers="headers"
    :data="oCung"
  />
</template>
