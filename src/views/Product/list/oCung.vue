<script setup>
import ElementListLayout from "@/layout/ElementListLayout.vue";
import customTable from "@/components/customTable.vue";
import bannerImage from "@/assets/img/OCBanner.jpg";
import { ref, onMounted, computed } from "vue";
import { getAllOCung, deleteOCung } from "@/api/service/SPCTService.js";
const headers = [
  "#",
  "Id",
  "Mã ổ cứng",
  "Loại ổ cứng",
  "Dung lượng",
  "Chuẩn kết nối",
  "Tốc độ đọc",
  "Tốc độ ghi",
  "Hỗ trợ nâng cấp",
];

const isEditing = ref(false);
const selectedOCung = ref({});
const oCungList = ref([]);

const fetchOCung = async () => {
  try {
    const data = await getAllOCung();
    if (Array.isArray(data)) {
      oCungList.value = data;
    } else {
      console.error("Dữ liệu trả về không hợp lệ:", data);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Drive:", error.message);
  }
};

const formattedData = computed(() =>
  Array.isArray(oCungList.value)
    ? oCungList.value.map((oCung, index) => ({
      stt: index + 1,
      id: oCung.id,
      maOCung: oCung.maOCung,
      loaiOCung: oCung.loaiOCung,
      dungLuong: oCung.dungLuong,
      chuanKetNoi: oCung.chuanKetNoi,
      tocDoDoc: oCung.tocDoDoc,
      tocDoGhi: oCung.tocDoGhi,
      hoTroNangCap: oCung.hoTroNangCap ? "Có" : "Không",
    }))
    : []
);
const softDeleteOCung = async (oCung) => {
  if (!confirm('Bạn có chắc chắn muốn xóa Drive này?')) return;

  const oCungToDelete = oCungList.value.find((item) => item.id === oCung.id);

  if (!oCungToDelete) return;

  try {
    console.log(oCungToDelete.id);
    await deleteOCung(oCungToDelete.id);
    await fetchOCung();
  } catch (error) {
    console.log(oCungToDelete.id);
    console.error('Lỗi khi xóa Drive:', error);
  }
};

const editOCung = (oCung) => {
  router.push({ name: "OCungCRUD", params: { id: oCung.id } });
};

onMounted(async () => {
  await fetchOCung();
});
</script>

<template>
  <div class="relative w-full mt-5">
    <!-- Banner -->
    <div class="w-full h-50 overflow-hidden rounded-lg mb-15">
      <img class="w-full h-full object-cover" src="@/assets/img/RamBanner.jpg" alt="Banner" />
    </div>

    <!-- Thẻ thông tin đè lên -->
    <div
      class="absolute bottom-[-40px] bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex justify-between space-x-4">
      <h1 class="text-3xl font-bold">DANH SÁCH Ổ CỨNG</h1>
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
        <router-link to="/admin/o-cung-crud">
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
  <customTable :headers="headers" :data="formattedData" :deleteFunc="softDeleteOCung" link="/admin/o-cung-crud"
    :editFunc="editOCung" />
</template>
