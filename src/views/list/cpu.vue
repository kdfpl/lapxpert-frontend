<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/CPUBanner.jpg";
import { ref, onMounted, computed } from "vue";
import { getAllCpu, addCpu, updateCpu, deleteCpu } from "../../service/SPCTService.js";
const headers = [
  "STT",
  "Hãng CPU",
  "Tên CPU",
  "Thế hệ CPU",
  "Số nhân",
  "Số luồng",
  "Xung nhịp",
];
const isEditing = ref(false);
const selectedCpu = ref({});
const cpuList = ref([]);

const fetchCpu = async () => {
  try {
    const data = await getAllCpu();
    if (Array.isArray(data)) {
      cpuList.value = data;
    } else {
      console.error("Dữ liệu trả về không hợp lệ:", data);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách CPU:", error.message);
  }
};

const formattedData = computed(() =>
  Array.isArray(cpuList.value)
    ? cpuList.value.map((cpu, index) => ({
      id: cpu.id,
      hangCpu: cpu.hangCpu,
      tenCpu: cpu.tenCpu,
      theHeCpu: cpu.theHeCpu,
      soNhan: cpu.soNhan,
      soLuong: cpu.soLuong,
      xungNhip: cpu.xungNhip,
    }))
    : []
);
const softDeleteCpu = async (cpu) => {
  if (!confirm('Bạn có chắc chắn muốn xóa CPU này?')) return;

  const cpuToDelete = cpuList.value.find(item => item.id === cpu.id);
  
  if (!cpuToDelete) return;

  try {
    console.log(cpuToDelete.value.id);
    await deleteCpu(cpuToDelete.value.id);
    await fetchKhachHang(); 
  } catch (error) {
    console.log(cpuToDelete.value.id);
    console.error('Lỗi khi xóa CPU:', error);
  }
};

onMounted(async () => {
  await fetchCpu();
});
</script>

<template>
  <div class="p-6 mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
    <div class="flex justify-between">
      <!-- Thanh tìm kiếm -->
      <div class="flex items-center max-w-md shadow-md bg-white/60 rounded-md">
        <input v-model="search" type="search" class="w-60 px-5 py-2 border-0 bg-white text-gray-900 focus:outline-none"
          placeholder="Tìm kiếm..." />
        <button class="flex items-center justify-center w-12 h-12 text-white rounded-r-lg transition"
          :class="search ? 'bg-black' : 'bg-gray-500 cursor-not-allowed'" :disabled="!search">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>

      <!-- Nút Thêm và Xuất -->
      <div class="flex space-x-3">
        <router-link to="/CpuCRUD">
          <button
            class="px-6 py-2 rounded-lg font-semibold text-white bg-gray-900 shadow-lg hover:scale-105 active:scale-95 transition">
            + THÊM
          </button>
        </router-link>
        <button
          class="px-6 py-2 rounded-lg font-semibold border text-black bg-white shadow-lg hover:scale-105 active:scale-95 transition">
          XUẤT
        </button>
      </div>
    </div>
  </div>
  <!-- Bảng hiển thị dữ liệu -->
  <customTable :headers="headers" :data="formattedData" :deleteFunc="deleteCpu" link="/CpuCRUD" />
</template>