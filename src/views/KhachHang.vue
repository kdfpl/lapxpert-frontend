<template>
  <div class="p-6 mx-auto bg-white rounded-xl shadow-lg mb-5 border border-gray-200">

    <div class="flex justify-between ">
      <h1 class="items-center text-center  font-bold text-4xl ">
        DANH SÁCH KHÁCH HÀNG
      </h1>
      <div class="flex space-x-3">
        <button
          class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md"
        >
          <router-link to="/KhachHangCRUD">+ THÊM</router-link>
        </button>

        <button
          class="px-6 py-2 rounded-lg font-semibold border text-black bg-white/20 backdrop-blur-lg shadow-lg transition-all duration-200 ease-out hover:bg-white/30 hover:border-white/60 hover:scale-105 active:scale-95 active:shadow-md"
        >
          XUẤT
        </button>
      </div>
    </div>
  </div>

  <div
    class="p-6 mx-auto bg-white rounded-t-xl border border-gray-200"
  >
    <div class="flex justify-between">
      <div
        class="flex items-center align-top max-w-md shadow-lg bg-white/60 rounded-md"
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


    </div>
  </div>

  <!-- Bảng hiển thị dữ liệu -->
  <CustomTable
    :headers="headers"
    :data="formattedData"
    :deleteFunc="deleteKhachHang"
    link="/KhachHangCRUD"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import KhachHangService from '../api/service/KhachHangService';
import CustomTable from '../components/CustomTable.vue';

// State
const khachHangList = ref([]);
const search = ref('');
const headers = ["STT","Id" ,"Mã KH", "Họ tên", "Email", "SĐT"];

// Fetch dữ liệu
const fetchKhachHang = async () => {
  try {
    const data = await KhachHangService.getAllCustomers();
    if (Array.isArray(data)) {
      khachHangList.value = data;
    } else {
      console.error("Dữ liệu trả về không hợp lệ:", data);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error.message);
  }
};

// Xử lý dữ liệu
const formattedData = computed(() => 
  Array.isArray(khachHangList.value) 
    ? khachHangList.value.map((kh, index) => ({
        stt: index + 1,
        id: kh.id,
        maKhachHang: kh.maKhachHang,
        hoTen: kh.hoTen,
        email: kh.email,
        sdt: kh.sdt
      }))
    : []
);

// Xóa khách hàng
const deleteKhachHang = async (kh) => {
  if (!confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) return;

  const khToDelete = khachHangList.value.find(item => item.maKhachHang === kh.maKhachHang);
  if (!khToDelete) return;

  try {
    await KhachHangService.deleteCustomer(khToDelete.id);
    await fetchKhachHang(); 
  } catch (error) {
    console.error('Lỗi khi xóa khách hàng:', error);
  }
};



// Khởi động component
onMounted(fetchKhachHang);
</script>
