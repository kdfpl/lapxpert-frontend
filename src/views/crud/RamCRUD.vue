<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAllRam, addRam, updateRam } from "../../service/SPCTService.js";
import { getAllLoaiRam } from "../../service/LoaiRamService.js";
import RichTextEditor from "../../components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();
const loaiRamList = ref({});
const fetchLoaiRam = async () => {
  loaiRamList.value = await getAllLoaiRam();
}
const ramData = ref({
  idLoaiRam: 0,
  maRam: "",
  dungLuongRam: 0,
  soKheRam: 0,
  hoTroToiDa: 0,
});
const isEditing = ref(false);

onMounted(async () => {
  if (route.params.id) { // Chỉ khi có id mới thực hiện sửa
    isEditing.value = true;
    const ramList = await getAllRam();
    const selectedRam = ramList.find((ram) => ram.id == route.params.id);
    if (selectedRam) {
      ramData.value = { ...selectedRam };
    }
  }
});


const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await updateRam(ramData.value.id, ramData.value);
      alert("Cập nhật Ram thành công!");
    } else {
      await addRam(ramData.value);
      alert("Thêm Ram thành công!");
    }
    router.push("/ram"); // Điều hướng về danh sách
  } catch (error) {
    console.error("Lỗi khi thêm/sửa Ram:", error);
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  }
};
onMounted(fetchLoaiRam);
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
      <h1 class="text-3xl font-bold">THÊM/SỬA RAM</h1>
      <button
        class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
        <router-link to="/Ram">Danh Sách</router-link>
      </button>
    </div>
  </div>
  <div class="flex">
    <div class="flex-1 mr-5 w-140 bg-gray-50 p-4 rounded-lg bg-white border rounded">
      <h3 class="text-lg font-semibold mb-4">{{ isEditing ? "Sửa RAM" : "Thêm RAM" }}</h3>
      <select class="border p-2 w-full mb-2" v-model="ramData.idLoaiRam">
        <option v-for="loaiRam in loaiRamList" :key="loaiRam.id" :value="loaiRam">
          {{ loaiRam.maLoai }}
        </option>
      </select>
      <input v-model="ramData.maRam" placeholder="Mã RAM" class="border p-2 w-full mb-2" required />
      <input v-model.number="ramData.dungLuongRam" type="number" placeholder="Dung Lượng RAM" value=""
        class="border p-2 w-full mb-2" required />
      <input v-model.number="ramData.soKheRam" type="number" placeholder="Số khe RAM" value=""
        class="border p-2 w-full mb-2" required />
      <input v-model.number="ramData.hoTroToiDa" type="number" placeholder="Hỗ trợ tối đa" value=""
        class="border p-2 w-full mb-2" required />
      <button @click="handleSubmit" class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
        {{ isEditing ? "Sửa" : "Thêm" }}
      </button>
    </div>
  </div>
</template>
