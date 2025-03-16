<script setup>
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
import GlassTable from "../components/customTable.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activePanel = ref("right");

const headers = ["STT","id", "Mã Voucher", "Loại", "Giá Trị", "Điều kiện", "Ngày BĐ", "Ngày KT", "Số Lượng", "Trạng Thái", "Thao Tác"];
const vouchers = ref([]);
const searchQuery = ref("");
const selectedStatus = ref("all");
const startDate = ref("");
const endDate = ref("");
const sortOrder = ref("latest")

const formattedVouchers = computed(() => {
  return vouchers.value.map((voucher, index) => ({
    index: index + 1,
    id: voucher.id,
    maVoucher: voucher.maPhieuGiamGia,
    loai: voucher.loaiGiamGia ? "Theo tiền" : "Theo %",
    giaTri: voucher.giaTriGiam.toLocaleString("vi-VN"),
    dieuKien: voucher.giaTriDonHangToiThieu.toLocaleString("vi-VN"),
    ngayBD: new Date(voucher.thoiGianBatDau).toISOString().split("T")[0],
    ngayKT: new Date(voucher.thoiGianKetThuc).toISOString().split("T")[0],
    soLuong: voucher.soLuong,
    trangThai: voucher.trangThai ? "Còn hiệu lực" : "Hết hạn",
    thaoTac: "actions",

  }));
});

const getStatusClass = (trangThai) => {
  return trangThai === "Còn hiệu lực"
    ? "bg-green-200 text-green-700 px-3 py-1 rounded-full"
    : "bg-red-200 text-red-700 px-3 py-1 rounded-full";
};

const filteredVouchers = computed(() => {
  let result = formattedVouchers.value.filter((voucher) => {
    const matchesSearch = searchQuery.value
      ? voucher.maVoucher.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;

    const matchesStatus =
      selectedStatus.value === "all" ||
      (selectedStatus.value === "active" && voucher.trangThai === "Còn hiệu lực") ||
      (selectedStatus.value === "expired" && voucher.trangThai === "Hết hạn");

    const matchesDate =
      (!startDate.value || new Date(voucher.ngayBD) >= new Date(startDate.value)) &&
      (!endDate.value || new Date(voucher.ngayKT) <= new Date(endDate.value));

    return matchesSearch && matchesStatus && matchesDate;
  });
  result.sort((a, b) => {
    const dateA = new Date(a.ngayKT);
    const dateB = new Date(b.ngayKT);
    return sortOrder.value === "latest" ? dateB - dateA : dateA - dateB;
  });
  // Cập nhật lại STT
  return result.map((voucher, index) => ({
    ...voucher,
    index: index + 1, // Giữ STT đúng
  }));
});

const fetchVouchers = async () => {
  try {
    const response = await axios.get("http://localhost:8080/phieu-giam-gia/hien-thi");
    vouchers.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu voucher:", error);
  }
};

const selectedVoucher = ref(null);
onMounted(() => {
  fetchVouchers();
});

const editVoucher = (voucher) => {
  if (voucher && voucher.id) {
    router.push(`/crud-giam-gia/${voucher.id}`);
  } else {
    alert("Không thể xác định voucher để chỉnh sửa!");
  }
};
const addVoucher = (voucher) => {
    router.push(`/crud-giam-gia`);
};

const deleteVoucher = async (voucher) => {
  if (confirm("Bạn có chắc chắn muốn xóa không?")) {
    try {
      await axios.delete(`http://localhost:8080/phieu-giam-gia/delete/${voucher.id}`);
      alert("Xóa thành công!");
      vouchers.value = vouchers.value.filter(v => v.id !== voucher.id);
    } catch (error) {
      alert("Xóa thất bại!");
    }
  }
};

const viewVoucher = (voucher) => {
  selectedVoucher.value = voucher;
  activePanel.value = "details";
};

const closeDetailsPanel = () => {
  selectedVoucher.value = null;
  activePanel.value = "right";
};
</script>
<template>
  <div class="h-screen flex flex-col">
    <div v-if="activePanel === 'right'" class="w-full bg-gray-200 p-4 z-10">
      <h2 class="text-xl font-bold">Danh Sách Voucher</h2>

      <!-- Tìm kiếm và lọc -->
      <div class="flex items-center justify-between mt-5">
        <!-- Ô tìm kiếm -->
        <div class="flex items-center gap-3 mb-4 ml-2">
          <input v-model="searchQuery" type="text" placeholder="Tìm kiếm phiếu giảm giá"
            class="border border-black rounded-lg p-2 w-64 outline-none pl-2" />
        </div>

        <!-- Bộ lọc ngày -->
        <div class="flex items-center gap-x-5">
          <label class="font-medium mb-1">Ngày bắt đầu</label>
          <input v-model="startDate" type="date" class="border border-gray-400 rounded-lg p-2 w-50 outline-none" />

          <label class="font-medium mb-1">Ngày kết thúc</label>
          <input v-model="endDate" type="date"
            class="border border-gray-400 rounded-lg p-2 w-50 outline-none mr-[10px]" />
        </div>
      </div>

      <!-- Bộ lọc trạng thái -->
      <div class="flex items-center gap-4 mb-4 ml-12">
        <span class="text-black-600 font-semibold">Trạng thái:</span>
        <label class="flex items-center">
          <input v-model="selectedStatus" type="radio" value="all" class="mr-2" />
          Tất cả
        </label>
        <label class="flex items-center">
          <input v-model="selectedStatus" type="radio" value="active" class="mr-2" />
          Còn hiệu lực
        </label>
        <label class="flex items-center">
          <input v-model="selectedStatus" type="radio" value="expired" class="mr-2" />
          Hết hạn
        </label>
      </div>
      <!-- Sắp xếp -->
      <div class="flex items-center gap-4 mb-4 ml-12">
        <span class="text-black-600 font-semibold">Sắp xếp theo:</span>
        <label class="flex items-center">
          <input v-model="sortOrder" type="radio" value="latest" class="mr-2" />
          Kết thúc muộn nhất
        </label>
        <label class="flex items-center">
          <input v-model="sortOrder" type="radio" value="oldest" class="mr-2" />
          Kết thúc sớm nhất
        </label>
      </div>
      <!-- Nút thêm phiếu giảm giá -->
      <div class="flex justify-end mt-5">
        <button class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-opacity-90 hover:scale-105" @click="addVoucher()">
          THÊM PHIẾU GIẢM GIÁ
        </button>
      </div>

      <!-- Bảng hiển thị danh sách -->
      <div class="mt-5 border-black-400">
        <GlassTable :headers="headers" :data="filteredVouchers" rowHeight="h-20">
          <!-- Custom slot cho trạng thái -->
          <template #cell-trangThai="{ item }">
            <div :class="getStatusClass(item.trangThai)"
              class="px-3 py-1 rounded-full text-sm font-semibold text-center">
              {{ item.trangThai }}
            </div>
          </template>

          <!-- Slot cho cột Thao Tác -->
          <template #cell-thaoTac="{ item }">
            <div class="flex space-x-2">
              <Icon icon="line-md:pencil" width="24" height="24" @click="editVoucher(item)" />
              <Icon icon="mdi:delete" width="24" height="24" @click="deleteVoucher(item)" />
              <Icon icon="mdi-eye" width="20" height="24" @click="viewVoucher(item)" />
            </div>
          </template>

        </GlassTable>
      </div>
    </div>
    <div v-if="activePanel === 'details'"
      class="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto shadow-lg">
        <h3 class="text-xl font-bold mb-4">Chi Tiết Voucher</h3>
        <p><strong>Mã Voucher:</strong> {{ selectedVoucher?.maVoucher }}</p>
        <p><strong>Loại:</strong> {{ selectedVoucher?.loai }}</p>
        <p><strong>Giá Trị:</strong> {{ selectedVoucher?.giaTri }}</p>
        <p><strong>Điều Kiện:</strong> {{ selectedVoucher?.dieuKien }}</p>
        <p><strong>Ngày BĐ:</strong> {{ selectedVoucher?.ngayBD }}</p>
        <p><strong>Ngày KT:</strong> {{ selectedVoucher?.ngayKT }}</p>
        <p><strong>Số Lượng:</strong> {{ selectedVoucher?.soLuong }}</p>
        <p><strong>Trạng Thái:</strong> {{ selectedVoucher?.trangThai }}</p>
        <div class="flex justify-end mt-4">
          <button class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700" @click="closeDetailsPanel">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>