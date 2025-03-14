

<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/pinBanner.jpg";
import { ref, onMounted } from "vue";
import { getAllPin} from "../../service/SPCTService.js"; 
const headers = [
  "STT",
  "Mã pin",
  "Thời lượng pin",
  "Dung lượng pin",
  "Công xuất sạc",
  "Thao tác",
];
const pin = ref([]);

const fetchPin = async () => {
    const data = await getAllPin();
    pin.value = data.map((pin,i) => ({
      stt: i+1,
      maPin: pin.maPin,
      thoiLuongPin: pin.thoiLuongPin,
      dungLuongPin: pin.dungLuongPin,
      congSuatSac: pin.congSuatSac,
    }));
  };
  onMounted(fetchPin);
</script>

<template>
  <ElementListLayout
    title="DANH SÁCH PIN SẠC"
    :image="bannerImage"
    :headers="headers"
    :data="pin"
  />
</template>

