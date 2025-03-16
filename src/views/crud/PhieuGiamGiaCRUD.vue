<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const voucherId = ref(route.params.id); // Lấy ID voucher từ URL

// Dữ liệu mặc định cho form voucher (dùng chung cho cả tạo & cập nhật)
const voucher = ref({
  maPhieuGiamGia: "",
  loaiGiamGia: true, 
  giaTriGiam: "",
  giaTriDonHangToiThieu: "",
  thoiGianBatDau: "",
  thoiGianKetThuc: "",
  soLuong: "",
  trangThai: true
});

// Nếu có ID, lấy thông tin voucher để chỉnh sửa
const fetchVoucherDetails = async () => {
  if (!voucherId.value) return; // Không có ID thì bỏ qua (tránh lỗi khi thêm mới)
  try {
    const response = await axios.get(`http://localhost:8080/phieu-giam-gia/${voucherId.value}`);
    if (response.data) {
      console.log("Dữ liệu voucher nhận được:", response.data);
      voucher.value = response.data;
    } else {
      console.warn("Không tìm thấy voucher!");
      alert("Không tìm thấy voucher!");
    }
  } catch (error) {
    console.error("Lỗi khi lấy voucher:", error);
    alert("Lỗi khi lấy dữ liệu!");
  }
};

// Hàm cập nhật voucher
const updateVoucher = async () => {
  try {
    await axios.put(`http://localhost:8080/phieu-giam-gia/update`, voucher.value);
    alert("Cập nhật thành công!");
    router.push("/giam-gia");
  } catch (error) {
    console.error("Lỗi khi cập nhật voucher:", error);
    alert("Cập nhật thất bại!");
  }
};

// Hàm thêm mới voucher
const addVoucher = async () => {
  try {
    await axios.post("http://localhost:8080/phieu-giam-gia/add", voucher.value);
    alert("Thêm mới thành công!");
    router.push("/giam-gia");
  } catch (error) {
    console.error("Lỗi khi thêm voucher:", error);
    alert("Thêm mới thất bại!");
  }
};

onMounted(fetchVoucherDetails);

// Theo dõi khi route thay đổi (trường hợp chuyển giữa các voucher)
watch(() => route.params.id, (newId) => {
  voucherId.value = newId;
  if (newId) {
    fetchVoucherDetails();
  } else {
    // Nếu không có ID, reset form (để tạo mới)
    voucher.value = {
      maPhieuGiamGia: "",
      loaiGiamGia: true,
      giaTriGiam: "",
      dieuKien: "",
      thoiGianBatDau: "",
      thoiGianKetThuc: "",
      soLuong: "",
      trangThai: true
    };
  }
});
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-4">
      {{ voucherId ? "Chỉnh Sửa" : "Thêm Mới" }} Phiếu Giảm Giá
    </h2>

    <label>Mã Voucher:</label>
    <input v-model="voucher.maPhieuGiamGia" type="text" class="border p-2 rounded w-full mb-2">

    <label>Loại Giảm Giá:</label>
    <select v-model="voucher.loaiGiamGia" class="border p-2 rounded w-full mb-2">
      <option :value="true">Theo tiền</option>
      <option :value="false">Theo %</option>
    </select>

    <label>Giá Trị:</label>
    <input v-model="voucher.giaTriGiam" type="number" class="border p-2 rounded w-full mb-2">

    <label>Điều Kiện:</label>
    <input v-model="voucher.giaTriDonHangToiThieu" type="number" class="border p-2 rounded w-full mb-2">

    <label>Ngày Bắt Đầu:</label>
    <input v-model="voucher.thoiGianBatDau" type="date" class="border p-2 rounded w-full mb-2">

    <label>Ngày Kết Thúc:</label>
    <input v-model="voucher.thoiGianKetThuc" type="date" class="border p-2 rounded w-full mb-2">

    <label>Số Lượng:</label>
    <input v-model="voucher.soLuong" type="number" class="border p-2 rounded w-full mb-2">

    <label>Trạng Thái:</label>
    <select v-model="voucher.trangThai" class="border p-2 rounded w-full mb-2" disabled>
      <option :value="true">Còn hiệu lực</option>
      <option :value="false">Hết hạn</option>
    </select>

    <div class="flex gap-2">
      <button v-if="voucherId" @click="updateVoucher" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 hover:scale-105">
        Cập Nhật
      </button>
      <button v-else @click="addVoucher" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 hover:scale-105">
        Thêm Mới
      </button>
      <button @click="router.push('/giam-gia')" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 hover:scale-105">
        Hủy
      </button>
    </div>
  </div>
</template>