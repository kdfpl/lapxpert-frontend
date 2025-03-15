<template>
    <div class="main-container">
        <!-- Phần thống kê trạng thái -->
        <div class="trang-thai-container">
            <div class="trang-thai-group">
                <span v-for="(soLuong, trangThai) in thongKeTrangThai" :key="trangThai" class="trang-thai-item"
                    :class="getTrangThaiClass(trangThai)">
                    {{ trangThai }}: <span class="so-luong">{{ soLuong }}</span> đơn
                </span>
            </div>
        </div>

        <!-- Phần bảng danh sách hóa đơn -->
        <!-- <ElementListLayout title="DANH SÁCH HÓA ĐƠN" :image="bannerImage" :headers="headers" :data="hoaDons"
            :link="'/hoa-don-crud'" :detailLink="'/chi-tiet-hoa-don'">


        </ElementListLayout> -->
        <CustomTable :data="hoaDons" :headers="headers" :deleteFunc="deleteHoaDonSanPham"
            :detailLink="'/chi-tiet-hoa-don'" />
    </div>
</template>


<script setup>

import { ref, onMounted } from "vue";
import HoaDonService from "../service/HoaDonService.js";
import ElementListLayout from "../layout/ElementListLayout.vue";
import CustomTable from "../components/CustomTable.vue"; // Import CustomTable
import bannerImage from "../assets/img/GPUBanner.jpg";

// Các biến header và hoaDons vẫn như trước
const headers = ref([
    "ID", "Mã Hóa Đơn", "Mã Nhân Viên", "Mã Khách Hàng",
    "Số Điện Thoại", "Địa Chỉ", "Tổng Tiền", "Trạng Thái", "Ngày Đặt",
]);

const hoaDons = ref([]);

// Biến lưu trữ thống kê trạng thái đơn
const thongKeTrangThai = ref({
    "Chờ xác nhận": 0,
    "Đang giao": 0,
    "Đã thanh toán": 0,
    "Chờ thanh toán": 0,
    "Đã hủy": 0,
    "Hoàn thành": 0,
});

// Hàm fetch danh sách hóa đơn
const fetchHoaDons = async () => {
    try {
        const response = await HoaDonService.getAllHoaDons();

        hoaDons.value = response.data.map(hoaDon => ({
            id: hoaDon.id,
            maHoaDon: hoaDon.maHoaDon,
            maNhanVien: hoaDon.nhanVien ? hoaDon.nhanVien.maNhanVien : "N/A",
            maKhachHang: hoaDon.khachHang ? hoaDon.khachHang.maKhachHang : "N/A",
            sdt: hoaDon.sdt,
            diaChi: hoaDon.diaChi,
            tongTien: hoaDon.tongTien.toLocaleString() + " đ",
            trangThai: hoaDon.trangThai,
            ngayDat: hoaDon.ngayDat
        }));

        // Tính toán tổng số đơn theo trạng thái
        thongKeTrangThai.value = {
            "Chờ xác nhận": 0,
            "Đã thanh toán": 0,
            "Chờ thanh toán": 0,
            "Đã hủy": 0,
            "Hoàn thành": 0,
        };

        response.data.forEach(hoaDon => {
            if (hoaDon.trangThai === "Chờ xác nhận") {
                thongKeTrangThai.value["Chờ xác nhận"]++;
            } else if (hoaDon.trangThai === "Đã thanh toán") {
                thongKeTrangThai.value["Đã thanh toán"]++;
            } else if (hoaDon.trangThai === "Chờ thanh toán") {
                thongKeTrangThai.value["Chờ thanh toán"]++;
            } else if (hoaDon.trangThai === "Đã hủy") {
                thongKeTrangThai.value["Đã hủy"]++;
            } else if (hoaDon.trangThai === "Hoàn thành") {
                thongKeTrangThai.value["Hoàn thành"]++;
            }
        });
    } catch (error) {
        console.error("Lỗi khi lấy hóa đơn:", error);
    }
};


// Phương thức để thêm class tùy chỉnh cho từng trạng thái
const getTrangThaiClass = (trangThai) => {
    const classes = {
        "Chờ xác nhận": "trang-thai-cho-xac-nhan",
        "Đang giao": "trang-thai-dang-giao",
        "Đã thanh toán": "trang-thai-da-thanh-toan",
        "Chờ thanh toán": "trang-thai-cho-thanh-toan",
        "Đã hủy": "trang-thai-da-huy",
        "Hoàn thành": "trang-thai-hoan-thanh"
    };
    return classes[trangThai] || "";
};

const deleteHoaDonSanPham = async (hoaDon) => {
    try {
        await HoaDonService.softDeleteHoaDon(hoaDon.id);  // Gọi API để xóa hóa đơn

        // Sau khi xóa thành công, gọi lại API để lấy danh sách hóa đơn mới
        await fetchHoaDons();

        alert("Hóa đơn đã được xóa thành công!");
    } catch (error) {
        console.error("Lỗi khi xóa hóa đơn:", error);
        alert("Đã có lỗi xảy ra khi xóa hóa đơn.");
    }
};




// Gọi hàm lấy danh sách hóa đơn khi component được tải
onMounted(fetchHoaDons);
</script>


<style scoped>
/* Container chính của thống kê trạng thái */
.trang-thai-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* Căn giữa các phần tử dọc theo trục ngang */
    margin-top: 20px;
    /* Thêm khoảng cách phía trên để phần này không dính vào bảng */
}

/* Các nhóm trạng thái đơn */
.trang-thai-group {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    /* Đảm bảo không bị đẩy xuống hàng mới */
}

.trang-thai-item {
    padding: 8px 12px;
    background: #f1f1f1;
    border-radius: 5px;
    font-size: 14px;
    color: black;
}

/* Màu trạng thái */
.trang-thai-cho-xac-nhan {
    background-color: #ffebe6;
    color: #e74c3c;
}

.trang-thai-dang-giao {
    background-color: #e6f0ff;
    color: #3498db;
}

.trang-thai-da-thanh-toan {
    background-color: #e6ffe6;
    color: #2ecc71;
}

.trang-thai-cho-thanh-toan {
    background-color: #fff3e6;
    color: #f39c12;
}

.trang-thai-da-huy {
    background-color: #f58b8b;
    color: #ffffff;
}

.trang-thai-hoan-thanh {
    background-color: #b7eef3;
    color: #00d7fd;

}

/* Nút tạo hóa đơn */
.create-invoice-btn {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.create-invoice-btn:hover {
    background-color: #2980b9;
}

/* Sửa lại một chút cho bảng và phần thống kê luôn nằm cạnh nhau */
.element-list-layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Tối ưu cho các phần tử bên trong bảng */
.custom-table-wrapper {
    flex-grow: 1;
}

/* Style riêng cho trạng thái trong bảng hóa đơn */
.trang-thai-table {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    min-width: 140px;
    /* Giữ kích thước đồng đều */
    font-size: 14px;
}

/* Màu sắc mới để không trùng với phần tổng */
.trang-thai-cho-xac-nhan-table {
    background-color: #ffeb99;
    /* Vàng nhạt */
    color: #856404;
    border: 2px solid #ffcc00;
}

.trang-thai-dang-giao-table {
    background-color: #cce5ff;
    /* Xanh dương nhạt */
    color: #004085;
    border: 2px solid #66b3ff;
}

.trang-thai-da-thanh-toan-table {
    background-color: #d4edda;
    /* Xanh lá nhạt */
    color: #155724;
    border: 2px solid #28a745;
}

.trang-thai-cho-thanh-toan-table {
    background-color: #fff3cd;
    /* Vàng cam nhạt */
    color: #856404;
    border: 2px solid #ffb400;
}

.trang-thai-da-huy-table {
    background-color: #f8d7da;
    /* Đỏ nhạt */
    color: #721c24;
    border: 2px solid #dc3545;
}

.trang-thai-hoan-thanh-table {
    background-color: #e2e3e5;
    /* Xám nhạt */
    color: #383d41;
    border: 2px solid #6c757d;
}
</style>
