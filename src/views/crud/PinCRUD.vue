<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAllPin, addPin, updatePin } from "../../api/service/SPCTService.js";
import RichTextEditor from "../../components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();
const pinData = ref({
  maPin: "",
  dungLuongPin: 0,
  thoiLuongPin: 0.0,
  congSuatSac: 0,
});
const isEditing = ref(false);

onMounted(async () => {
  if (route.params.id) { // Chỉ khi có id mới thực hiện sửa
    isEditing.value = true;
    const pinList = await getAllPin();
    const selectedPin = pinList.find((pin) => pin.id == route.params.id);
    if (selectedPin) {
      pinData.value = { ...selectedPin };
    }
  }
});


const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updatePin(pinData.value.id, pinData.value);
      alert("Cập nhật PIN thành công!");
    } else {
      await addPin(pinData.value);
      alert("Thêm PIN thành công!");
    }
    router.push("/pin"); // Điều hướng về danh sách
  } catch (error) {
    console.error("Lỗi khi thêm/sửa PIN:", error);
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  }
};
</script>

<template>
  <div class="relative w-full mt-5">
    <!-- Banner -->
    <div class="w-full h-50 overflow-hidden rounded-lg">
      <img class="w-full h-full object-cover" src="../../assets/img/RamBanner.jpg" alt="Banner" />
    </div>

    <!-- Thẻ thông tin đè lên -->
    <div
      class="absolute bottom-[-40px] bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex justify-between space-x-4">
      <h1 class="text-3xl font-bold">THÊM/SỬA PIN</h1>
      <button
        class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
        <router-link to="/pin">Danh Sách</router-link>
      </button>
    </div>
  </div>
  <div class="flex">
    <div class="flex-1 mr-5 w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded">
      <h3 class="text-lg font-semibold mb-4">{{ isEditing ? "Sửa PIN" : "Thêm PIN" }}</h3>
      <input v-model="pinData.maPin" placeholder="Mã PIN" class="border p-2 w-full mb-2" required />
      <input v-model.number="pinData.dungLuongPin" type="number" placeholder="Dung lượng PIN" class="border p-2 w-full mb-2" required />
      <input v-model.number="pinData.thoiLuongPin" type="number" placeholder="Thời lượng PIN" class="border p-2 w-full mb-2" required />
      <input v-model.number="pinData.congSuatSac" type="number" placeholder="Công suất sạc" class="border p-2 w-full mb-2" required />
      <button @click="handleSubmit" class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
        {{ isEditing ? "Sửa" : "Thêm" }}
      </button>
    </div>
  </div>
</template>
