<template>
  <section class="flex h-full w-full flex-col max-h-[500px] overflow-y-auto">
    <section class="mb-4 flex h-[650px] w-full items-center">
      <div class="rounded-box flex-1 border px-4 pb-4">
        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend">Thêm Phiếu Giảm Giá</legend>

          <label class="fieldset-label">Mã Voucher:</label>
          <input v-model="voucher.maPhieuGiamGia" type="text" class="input w-full" placeholder="Mã voucher..." />

          <label class="fieldset-label">Loại Giảm Giá:</label>
          <select v-model="voucher.loaiGiamGia" class="input w-full">
            <option :value="true">Theo tiền</option>
            <option :value="false">Theo %</option>
          </select>

          <label class="fieldset-label">Giá Trị:</label>
          <input v-model="voucher.giaTriGiam" type="number" class="input w-full" placeholder="100.000..." />

          <label class="fieldset-label">Điều Kiện:</label>
          <input v-model="voucher.giaTriDonHangToiThieu" type="number" class="input w-full" placeholder="100.000..." />

          <div class="flex gap-4">
            <fieldset class="fieldset flex-1">
              <label class="fieldset-label">Ngày Bắt Đầu</label>
              <input v-model="voucher.thoiGianBatDau" type="date" class="input w-full" />
            </fieldset>

            <fieldset class="fieldset flex-1">
              <label class="fieldset-label">Ngày Kết Thúc</label>
              <input v-model="voucher.thoiGianKetThuc" type="date" class="input w-full" />
            </fieldset>
          </div>

          <label v-if="!isCustomerSelectionEnabled" class="fieldset-label">Số Lượng:</label>
          <input v-if="!isCustomerSelectionEnabled" v-model="voucher.soLuong" type="number" class="input w-full" placeholder="Số lượng..." />

          <label class="fieldset-label flex items-center gap-2">
            <input type="checkbox" v-model="isCustomerSelectionEnabled" @change="handlePrivateSelection" />
            Riêng tư (Chỉ dành cho khách hàng được chọn)
          </label>

          <button @click="submitVoucher" class="btn btn-primary btn-soft mt-4">Thêm</button>
          <button @click="cancel" class="btn btn-error btn-soft mt-4">Hủy</button>
        </fieldset>
      </div>

      <div class="divider divider-primary divider-horizontal"></div>

      <div v-if="isCustomerSelectionEnabled" class="rounded-box bg-base-200 border-base-300 flex h-full flex-1 flex-col border p-4">
        <span class="text-base-content mb-2 text-2xl font-bold">Chọn Khách Hàng</span>
        <div class="mb-2 max-h-[600px] w-full overflow-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th class="w-[20px]">
                  <input type="checkbox" class="checkbox" @change="toggleAllCustomers" />
                </th>
                <th class="w-[20px]">STT</th>
                <th>Tên Khách Hàng</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(customer, index) in customerList" :key="customer.id">
                <td>
                  <input type="checkbox" class="checkbox" :checked="selectedCustomers.includes(customer.id)"
                    @change="toggleCustomerSelection(customer.id)" />
                </td>
                <td>{{ index + 1 }}</td>
                <td>{{ customer.hoTen }}</td>
                <td>{{ customer.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useKhachHangStore } from "@/stores/khachhangstore";

const route = useRoute();
const router = useRouter();
const khachHangStore = useKhachHangStore();

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

const customerList = ref([]);
const selectedCustomers = ref([]);
const isCustomerSelectionEnabled = ref(false);

const cancel = async () => {
  router.push('/admin/giam-gia');
};

onMounted(() => {
  khachHangStore.initialize();
  customerList.value = khachHangStore.khachHangList;
});

watch(
  () => khachHangStore.khachHangList,
  (newList) => {
    customerList.value = newList;
  }
);

watch(selectedCustomers, (newList) => {
  if (isCustomerSelectionEnabled.value) {
    voucher.value.soLuong = newList.length;
  }
});
const handlePrivateSelection = () => {
  if (isCustomerSelectionEnabled.value) {
    voucher.value.soLuong = selectedCustomers.value.length;
  } else {
    voucher.value.soLuong = "";
  }
};

const toggleCustomerSelection = (customerId) => {
  const index = selectedCustomers.value.indexOf(customerId);
  if (index === -1) {
    selectedCustomers.value.push(customerId);
  } else {
    selectedCustomers.value.splice(index, 1);
  }
  if (isCustomerSelectionEnabled.value) {
    voucher.value.soLuong = selectedCustomers.value.length; // Cập nhật số lượng
  }
};

const toggleAllCustomers = (event) => {
  if (event.target.checked) {
    selectedCustomers.value = customerList.value.map((c) => c.id);
  } else {
    selectedCustomers.value = [];
  }

  if (isCustomerSelectionEnabled.value) {
    voucher.value.soLuong = selectedCustomers.value.length;
  }
};

// async function submitVoucher() {
//     console.log("Dữ liệu gửi lên:", voucher.value);
//     try {
//         await axios.post("http://localhost:8080/api/phieu-giam-gia/add", voucher.value);
//         console.log("Thêm phiếu giảm giá thành công!");
//     } catch (error) {
//         console.error("Lỗi khi thêm phiếu giảm giá:", error);
//     }
// };
const fetchCustomersForVoucher = async (voucherId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/phieu-giam-gia/${voucherId}/khach-hang`);
    customerList.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
  }
};

const submitVoucher = async () => {
  try {
    const requestData = { ...voucher.value };

    if (isCustomerSelectionEnabled.value) {
      // Chuyển đổi customerIds sang Long
      requestData.customerIds = selectedCustomers.value.map(id => Number(id));
    } else {
      requestData.customerIds = [];
    }

    const response = await axios.post("http://localhost:8080/api/phieu-giam-gia/add", requestData);
    alert("Thêm phiếu giảm giá thành công!");
    router.push("/admin/giam-gia");
  } catch (error) {
    console.error("Lỗi khi thêm/gán phiếu giảm giá:", error);
    alert("Thêm thất bại!");
  }
};

const applyVoucher = async (voucherId, customerId) => {
  try {
    const response = await axios.post("http://localhost:8080/api/phieu-giam-gia/apply-voucher", {
      voucherId,
      customerId
    });

    alert(response.data); // Hiển thị kết quả
  } catch (error) {
    alert("Bạn không có quyền sử dụng voucher này!");
  }
};

</script>