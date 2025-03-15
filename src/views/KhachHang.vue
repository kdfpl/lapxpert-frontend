<template>
  <div class="p-6 mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
    <div class="flex justify-between">
      <!-- Thanh tìm kiếm -->
      <div class="flex items-center max-w-md shadow-md bg-white/60 rounded-md">
        <input
          v-model="search"
          type="search"
          class="w-60 px-5 py-2 border-0 bg-white text-gray-900 focus:outline-none"
          placeholder="Tìm kiếm..."
        />
        <button
          class="flex items-center justify-center w-12 h-12 text-white rounded-r-lg transition"
          :class="search ? 'bg-black' : 'bg-gray-500 cursor-not-allowed'"
          :disabled="!search"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>

      <!-- Nút Thêm và Xuất -->
      <div class="flex space-x-3">
        <router-link to="/KhachHangCRUD">
          <button class="px-6 py-2 rounded-lg font-semibold text-white bg-gray-900 shadow-lg hover:scale-105 active:scale-95 transition">
            + THÊM
          </button>
        </router-link>
        <button class="px-6 py-2 rounded-lg font-semibold border text-black bg-white shadow-lg hover:scale-105 active:scale-95 transition">
          XUẤT
        </button>
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
