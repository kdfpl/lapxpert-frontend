<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAllGpu, addGpu, updateGpu } from "../../service/SPCTService.js";
import RichTextEditor from "../../components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();
const gpuData = ref({
  maGpu: "",
  loaiGpu: "",
  tenGpu: "",
  boNhoVram: 0,
  congNgheGpu: "",
});
const isEditing = ref(false);

onMounted(async () => {
  if (route.params.id) { // Chỉ khi có id mới thực hiện sửa
    isEditing.value = true;
    const gpuList = await getAllGpu();
    const selectedGpu = gpuList.find((gpu) => gpu.id == route.params.id);
    if (selectedGpu) {
      gpuData.value = { ...selectedGpu };
    }
  }
});


const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updateGpu(gpuData.value.id, gpuData.value);
      alert("Cập nhật GPU thành công!");
    } else {
      await addGpu(gpuData.value);
      alert("Thêm GPU thành công!");
    }
    router.push("/gpu"); // Điều hướng về danh sách
  } catch (error) {
    console.error("Lỗi khi thêm/sửa GPU:", error);
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
      <h1 class="text-3xl font-bold">THÊM/SỬA GPU</h1>
      <button
        class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
        <router-link to="/gpu">Danh Sách</router-link>
      </button>
    </div>
  </div>
  <div class="flex">
    <div class="flex-1 mr-5 w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded">
      <h3 class="text-lg font-semibold mb-4">{{ isEditing ? "Sửa GPU" : "Thêm GPU" }}</h3>
      <input v-model="gpuData.maGpu" placeholder="Mã GPU" class="border p-2 w-full mb-2" required />
      <input v-model="gpuData.loaiGpu" placeholder="Loại GPU" class="border p-2 w-full mb-2" required />
      <input v-model="gpuData.tenGpu" placeholder="Tên GPU" class="border p-2 w-full mb-2" required />
      <input v-model.number="gpuData.boNhoVram" type="number" placeholder="Bộ nhớ VRAM" class="border p-2 w-full mb-2" required />
      <input v-model="gpuData.congNgheGpu" placeholder="Công nghệ GPU" class="border p-2 w-full mb-2" required />
      <button @click="handleSubmit" class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
        {{ isEditing ? "Sửa" : "Thêm" }}
      </button>
    </div>
  </div>
</template>
