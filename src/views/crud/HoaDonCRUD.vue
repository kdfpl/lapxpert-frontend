<template>
    <div class="relative w-full mt-5">
        <!-- Banner -->
        <div class="w-full h-50 overflow-hidden rounded-lg">
            <img class="w-full h-full object-cover" src="../../assets/img/RamBanner.jpg" alt="Banner" />
        </div>

        <!-- Thẻ thông tin đè lên -->
        <div
            class="absolute bottom-[-40px] bg-white/90 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] shadow-lg rounded-xl p-5 flex justify-between items-center space-x-4">
            <h1 class="text-3xl font-bold">THÊM/SỬA HÓA ĐƠN</h1>
            <button
                class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
                <router-link to="/invoice">Danh Sách</router-link>
            </button>
        </div>
    </div>
    <div class="w-[90%] flex-none items-center mx-auto justify-center mt-20">
        <TabPanel :tabs="tabs">
            <!-- Tab 1: Mã hóa đơn, mã nhân viên, mã khách hàng -->
            <template #panel1>
                <h2 class="text-3xl font-bold mb-3">Thông tin cơ bản</h2>
                <form action="" class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
                    <!-- Mã Hóa Đơn -->
                    <div class="flex flex-col">
                        <label for="ma_hoa_don" class="text-sm font-semibold text-gray-600">Mã Hóa Đơn</label>
                        <input type="text" id="ma_hoa_don" v-model="hoaDon.maHoaDon"
                            class="border rounded-lg p-4 focus:outline-none focus:ring focus:border-blue-300 w-full" />
                    </div>

                    <!-- Mã Nhân Viên -->
                    <div class="flex flex-col">
                        <label for="ma_nhan_vien" class="text-sm font-semibold text-gray-600">Mã Nhân Viên</label>
                        <input type="text" id="ma_nhan_vien" v-model="hoaDon.maNhanVien"
                            class="border rounded-lg p-4 focus:outline-none focus:ring focus:border-blue-300 w-full" />
                    </div>

                    <!-- Mã Khách Hàng -->
                    <div class="flex flex-col">
                        <label for="ma_khach_hang" class="text-sm font-semibold text-gray-600">Mã Khách Hàng</label>
                        <input type="text" id="ma_khach_hang" v-model="hoaDon.maKhachHang"
                            class="border rounded-lg p-4 focus:outline-none focus:ring focus:border-blue-300 w-full" />
                    </div>
                </form>
            </template>

            <!-- Tab 2: Số điện thoại và địa chỉ -->
            <template #panel2>
                <h2 class="text-3xl font-bold mb-3">Thông tin liên lạc</h2>
                <form action="" class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
                    <!-- Số Điện Thoại -->
                    <div class="flex flex-col">
                        <label for="so_dien_thoai" class="text-sm font-semibold text-gray-600">Số Điện Thoại</label>
                        <input type="text" id="so_dien_thoai" v-model="hoaDon.soDienThoai"
                            class="border rounded-lg p-4 focus:outline-none focus:ring focus:border-blue-300 w-full" />
                    </div>

                    <!-- Địa Chỉ -->
                    <div class="flex flex-col">
                        <label for="dia_chi" class="text-sm font-semibold text-gray-600">Địa Chỉ</label>
                        <input type="text" id="dia_chi" v-model="hoaDon.diaChi"
                            class="border rounded-lg p-4 focus:outline-none focus:ring focus:border-blue-300 w-full" />
                    </div>
                </form>
            </template>

            <!-- Tab 3: Trạng thái và tổng tiền -->
            <template #panel3>
                <h2 class="text-3xl font-bold mb-3">Tình trạng đơn hàng</h2>
                <form action="" class="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
                    <!-- Trạng Thái -->
                    <div class="flex flex-col">
                        <label for="trang_thai" class="text-sm font-semibold text-gray-600">Trạng Thái</label>
                        <select id="trang_thai" v-model="hoaDon.trangThai"
                            class="border rounded-lg p-4 focus:outline-none focus:ring focus:border-blue-300 w-full">
                            <option value="chua_xac_nhan">Chưa Xác Nhận</option>
                            <option value="da_xac_nhan">Đã Xác Nhận</option>
                            <option value="dang_giao">Đang Giao</option>
                            <option value="da_giao">Đã Giao</option>
                        </select>
                    </div>

                    <!-- Tổng Tiền -->
                    <div class="flex flex-col">
                        <label for="tong_tien" class="text-sm font-semibold text-gray-600">Tổng Tiền</label>
                        <input type="text" id="tong_tien" v-model="hoaDon.tongTien"
                            class="border rounded-lg p-4 focus:outline-none focus:ring focus:border-blue-300 w-full" />
                    </div>
                </form>
            </template>
        </TabPanel>

        <!-- Nút Thêm -->
        <div class="mt-5 flex justify-center">
            <button @click="themHoaDon"
                class="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 shadow-xl backdrop-blur-md bg-opacity-80 border border-white/30 transition-all duration-200 ease-out hover:bg-opacity-90 hover:scale-105 active:scale-95 active:shadow-md">
                Thêm Hóa Đơn
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import TabPanel from "../../components/TabPanel.vue";

const tabs = [
    { label: "1. Thông tin cơ bản", key: "panel1" },
    { label: "2. Thông tin liên lạc", key: "panel2" },
    { label: "3. Tình trạng đơn hàng", key: "panel3" },
];

const hoaDon = ref({
    maHoaDon: "",
    maNhanVien: "",
    maKhachHang: "",
    soDienThoai: "",
    diaChi: "",
    trangThai: "chua_xac_nhan",
    tongTien: "",
});

// Phương thức thêm hóa đơn
const themHoaDon = () => {
    if (!hoaDon.value.maHoaDon || !hoaDon.value.maNhanVien || !hoaDon.value.maKhachHang) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    console.log("Thông tin hóa đơn:", hoaDon.value);
    alert("Hóa đơn đã được thêm!");
};
</script>