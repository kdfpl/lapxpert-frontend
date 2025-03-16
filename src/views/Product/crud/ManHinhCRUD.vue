<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAllManHinh, addManHinh, updateManHinh } from "@/api/service/SPCTService.js";
import RichTextEditor from "@/components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();
const manHinhData = ref({
  maManHinh: "",
  kichThuoc: 0.0,
  tanSoQuet: 0,
  loaiTamNen: "",
  doSang: 0,
  chuanMau: "",
  doPhanGiai: "",
});
const isEditing = ref(false);

onMounted(async () => {
  if (route.params.id) { // Chỉ khi có id mới thực hiện sửa
    isEditing.value = true;
    const manHinhList = await getAllManHinh();
    const selectedManHinh = manHinhList.find((manHinh) => manHinh.id == route.params.id);
    if (selectedManHinh) {
      manHinhData.value = { ...selectedManHinh };
    }
  }
});

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updateManHinh(manHinhData.value.id, manHinhData.value);
      alert("Cập nhật Screen thành công!");
    } else {
      await addManHinh(manHinhData.value);
      alert("Thêm Screen thành công!");
    }
    router.push("/admin/man-hinh"); // Điều hướng về danh sách
  } catch (error) {
    console.error("Lỗi khi thêm/sửa Screen:", error);
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  }
};
</script>

<template>
  <div class="relative w-full mt-5">
    <!-- Banner -->
    <div class="w-full h-50 overflow-hidden rounded-lg">
      <img class="w-full h-full object-cover" src="@/assets/img/RamBanner.jpg" alt="Banner" />
    </div>

    <!-- Thẻ thông tin đè lên -->
    <div
      class="absolute bottom-[-40px] bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex justify-between space-x-4">
      <h1 class="text-3xl font-bold">THÊM/SỬA MÀN HÌNH</h1>
      <button
        class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
        <router-link to="/admin/man-hinh">Danh Sách</router-link>
      </button>
    </div>
  </div>
  <div class="flex">
    <div class="flex-1 mr-5 w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded">
      <h3 class="text-lg font-semibold mb-4">{{ isEditing ? "Sửa Màn Hình" : "Thêm Màn Hình" }}</h3>
      <input v-model="manHinhData.maManHinh" placeholder="Mã màn hình" class="border p-2 w-full mb-2" required />
      <input v-model.number="manHinhData.kichThuoc" type="number" placeholder="Kích thước" class="border p-2 w-full mb-2" required />
      <input v-model.number="manHinhData.tanSoQuet" type="number" placeholder="Tần số quét" class="border p-2 w-full mb-2" required />
      <input v-model="manHinhData.loaiTamNen" placeholder="Loại tấm nền" class="border p-2 w-full mb-2" required />
      <input v-model.number="manHinhData.doSang" type="number" placeholder="Độ sáng" class="border p-2 w-full mb-2" required />
      <input v-model="manHinhData.chuanMau" placeholder="Chuẩn màu" class="border p-2 w-full mb-2" required />
      <input v-model="manHinhData.doPhanGiai" placeholder="Độ phân giải" class="border p-2 w-full mb-2" required />
      <button @click="handleSubmit" class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
        {{ isEditing ? "Sửa" : "Thêm" }}
      </button>
    </div>
  </div>
</template>
