<template>
  <div class="p-6 mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
    <div class="flex justify-between">
      <div
        class="flex items-center align-top max-w-md shadow-md bg-white/60 rounded-md"
      >
        <div class="w-60">
          <input
            v-model="search"
            type="search"
            class="w-full px-5 py-1 border-0 bg-white text-gray-900 focus:outline-none"
            placeholder="search"
          />
        </div>
        <div>
          <button
            type="submit"
            class="flex items-center justify-center w-12 h-12 text-white rounded-r-lg"
            :class="
              searchLength > 0 ? 'bg-black' : 'bg-gray-500 cursor-not-allowed'
            "
            :disabled="searchLength === 0"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="flex space-x-3">
        <button
          class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md"
        >
          <router-link to="/NhanVienCRUD">+ THÊM</router-link>
        </button>

        <button
          class="px-6 py-2 rounded-lg font-semibold border text-black bg-white/20 backdrop-blur-lg shadow-lg transition-all duration-200 ease-out hover:bg-white/30 hover:border-white/60 hover:scale-105 active:scale-95 active:shadow-md"
        >
          XUẤT
        </button>
      </div>
    </div>
  </div>

  <CustomTable
    :headers="headers"
    :data="formattedData"
    :deleteFunc="deleteNhanVien"
    link="/NhanVienCRUD"
  />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CustomTable from "../components/CustomTable.vue";
import NhanVienService from "../api/service/NhanVienService.js";

const headers = ["STT","ID", "Họ Tên", "Email", "SĐT", "Chức Vụ"];
const NhanVienList = ref([]);

// Xử lý dữ liệu
const formattedData = computed(() =>
  Array.isArray(NhanVienList.value)
    ? NhanVienList.value.map((nv, index) => ({
        stt: index + 1,
        id: nv.id,
        hoTen: nv.hoTen,
        email: nv.email,
        sdt: nv.sdt,
        chucVu: nv.chucVu.tenChucVu , 
      }))
    : []
);

// Hàm fetch dữ liệu từ API
const fetchNhanVien = async () => {
  try {
    const data = await NhanVienService.getAllStaff();
    if (Array.isArray(data)) {
      NhanVienList.value = data;
    } else {
      console.error("Dữ liệu trả về không hợp lệ:", data);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhân viên:", error.message);
  }
};

const deleteNhanVien = async (nv) => {
  if (!confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) return;

  const nvToDelete = NhanVienList.value.find((item) => item.id === nv.id);
  if (!nvToDelete) return;

  try {
    await NhanVienService.deleteStaff(nvToDelete.id);
    NhanVienList.value = NhanVienList.value.filter((item) => item.id !== nv.id);
    alert("Xóa nhân viên thành công!");
    await fetchNhanVien();
  } catch (error) {
    console.error("Lỗi khi xóa nhân viên:", error);
    alert("Có lỗi xảy ra khi xóa nhân viên!");
  }
};

// Gọi hàm fetch khi component được mounted
onMounted(() => {
  fetchNhanVien();
});
</script>
