<script setup>
import ElementListLayout from "../../layout/ElementListLayout.vue";
import customTable from "../../components/customTable.vue";
import bannerImage from "../../assets/img/pinBanner.jpg";
import { ref, onMounted, computed } from "vue";
import { getAllPin, deletePin } from "../../api/service/SPCTService.js";
const headers = [
  "#",
  "Id",
  "Mã pin",
  "Thời lượng pin",
  "Dung lượng pin",
  "Công xuất sạc",
];

const isEditing = ref(false);
const selectedPin = ref({});
const pinList = ref([]);

const fetchPin = async () => {
  try {
    const data = await getAllPin();
    if (Array.isArray(data)) {
      pinList.value = data;
    } else {
      console.error("Dữ liệu trả về không hợp lệ:", data);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách PIN:", error.message);
  }
};

const formattedData = computed(() =>
  Array.isArray(pinList.value)
    ? pinList.value.map((pin, index) => ({
      stt: index + 1,
      id: pin.id,
      maPin: pin.maPin,
      thoiLuongPin: pin.thoiLuongPin,
      dungLuongPin: pin.dungLuongPin,
      congSuatSac: pin.congSuatSac,
    }))
    : []
);
const softDeletePin = async (pin) => {
  if (!confirm('Bạn có chắc chắn muốn xóa PIN này?')) return;

  const pinToDelete = pinList.value.find((item) => item.id === pin.id);

  if (!pinToDelete) return;

  try {
    console.log(pinToDelete.id);
    await deletePin(pinToDelete.id);
    await fetchPin();
  } catch (error) {
    console.log(pinToDelete.id);
    console.error('Lỗi khi xóa PIN:', error);
  }
};

const editPin = (pin) => {
  router.push({ name: "PinCRUD", params: { id: pin.id } });
};

onMounted(async () => {
  await fetchPin();
});
</script>

<template>
  <div class="relative w-full mt-5">
    <!-- Banner -->
    <div class="w-full h-50 overflow-hidden rounded-lg mb-15">
      <img class="w-full h-full object-cover" src="../../assets/img/RamBanner.jpg" alt="Banner" />
    </div>

    <!-- Thẻ thông tin đè lên -->
    <div
      class="absolute bottom-[-40px] bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex justify-between space-x-4">
      <h1 class="text-3xl font-bold">DANH SÁCH PIN</h1>
    </div>
  </div>
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
        <router-link to="/PinCRUD">
          <button
            class="px-6 h-10 py-2 rounded-lg font-semibold text-white bg-gray-900 shadow-lg hover:scale-105 active:scale-95 transition">
            + THÊM
          </button>
        </router-link>
        <button
          class="px-6 h-10 py-2 rounded-lg font-semibold border text-black bg-white shadow-lg hover:scale-105 active:scale-95 transition">
          XUẤT
        </button>
      </div>
    </div>
  </div>
  <!-- Bảng hiển thị dữ liệu -->
  <customTable :headers="headers" :data="formattedData" :deleteFunc="softDeletePin" link="/PinCRUD"
    :editFunc="editPin" />
</template>
