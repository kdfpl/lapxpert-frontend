<template>
    <div class="order-detail">
        <!-- Header -->
        <div class="header">
            <span class="breadcrumb">Quản lý hóa đơn</span>
            <span class="current-page">/ <strong>Chi tiết đơn hàng</strong></span>
            <!-- Nút quay về danh sách -->
            <a href="/invoice" class="btn-back-to-list">
                <button class="btn-back">Quay lại danh sách</button>
            </a>
        </div>

        <!-- Thanh Tiến Trình -->
        <div class="order-progress">
            <div class="progress-container">
                <div v-for="(step, index) in steps" :key="index" class="step">
                    <div class="icon">
                        <i :class="step.icon"></i>
                    </div>
                    <div class="step-info">
                        <span class="step-title">{{ step.title }}</span>
                        <span class="step-time">{{ step.time }}</span>
                    </div>
                </div>
            </div>

            <!-- Khu vực nút thao tác -->
            <div class="order-actions">
                <div class="left-actions">
                    <button class="btn btn-print" @click="printInvoice">In hóa đơn</button>
                    <button class="btn btn-detail" @click="viewDetail">Chi tiết</button>
                </div>
                <div class="right-actions">
                    <button class="btn btn-confirm" @click="confirmOrder">Xác nhận</button>
                    <button class="btn btn-ship" @click="shipOrder">Giao hàng</button>
                    <button class="btn btn-cancel" @click="cancelOrder">Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <div class="table-container">
        <h3>Thông Tin Đơn Hàng</h3>
        <div class="order-info">
            <!-- Cột bên trái -->
            <div class="order-info-left">
                <div class="order-info-row">
                    <span class="order-info-label">Mã đơn hàng:</span>
                    <span class="order-info-value badge order-id">{{ hoaDon?.maHoaDon || 'Đang tải...' }}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-info-label">Trạng thái:</span>
                    <span class="order-info-value badge completed">{{ hoaDon?.trangThai || 'Đang tải...' }}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-info-label">Phiếu giảm giá:</span>
                    <span class="order-info-value badge discount">{{ hoaDon?.discountCode || 'Không có' }}</span>
                </div>
            </div>

            <!-- Cột bên phải -->
            <div class="order-info-right">
                <div class="order-info-row">
                    <span class="order-info-label">Ngày đặt hàng:</span>
                    <span class="order-info-value">{{ hoaDon?.ngayDat || 'Đang tải...' }}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-info-label">Mã người nhận:</span>
                    <span class="order-info-value">{{ hoaDon?.khachHang?.maKhachHang || 'Đang tải...' }}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-info-label">Số điện thoại:</span>
                    <span class="order-info-value">{{ hoaDon?.sdt || 'Đang tải...' }}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-info-label">Địa chỉ người nhận:</span>
                    <span class="order-info-value">{{ hoaDon?.diaChi || 'Đang tải...' }}</span>
                </div>
            </div>
        </div>
    </div>


    <!-- Lịch sử thanh toán -->
    <div class="table-container">
        <h3>Lịch sử thanh toán</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Phương thức thanh toán</th>
                    <th>Số tiền</th>
                    <th>Thời gian</th>
                    <th>Người xác nhận</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><span class="payment-method">Ví điện tử</span></td>
                    <td class="price">21,000,000</td>
                    <td>20:59:55 09-09-2024</td>
                    <td>Vũ Thanh Mai</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Danh sách sản phẩm đã mua -->
    <div class="table-container">
        <div class="product-header">
            <h3>Danh sách sản phẩm đã mua</h3>

            <!-- Bọc hai nút trong div để căn chỉnh đúng -->
            <div class="product-buttons">
                <button class="btn1 btn-scan" @click="scanQR">Quét QR</button>
                <button class="btn1 btn-add" @click="addProduct">Thêm sản phẩm</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td class="product-name">Laptop ASUS ROG</td>
                    <td>1</td>
                    <td class="price">20,000,000</td>
                    <td class="price">20,000,000</td>
                    <td class="icon">
                        <button class="delete-btn">🗑️</button>
                    </td>

                </tr>
                <tr>
                    <td>2</td>
                    <td class="product-name">Laptop ASUS TUF</td>
                    <td>1</td>
                    <td class="price">18,000,000</td>
                    <td class="price">18,000,000</td>
                    <td class="icon">
                        <button class="delete-btn">🗑️</button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HoaDonService from '@/api/service/HoaDonService.js';

export default {
    setup() {
        // Khai báo các biến
        const route = useRoute();
        const hoaDon = ref(null);
        const steps = ref([
            { title: "Chờ xác nhận", time: "09-09-2024 20:58:28", icon: "fa-solid fa-circle-check" },
            { title: "Cập Nhật Đơn Hàng", time: "09-09-2024 20:59:00" },
            { title: "Chờ giao hàng", time: "09-09-2024 20:59:29", icon: "fa-regular fa-clock" },
            { title: "Đã giao cho đơn vị vận chuyển", time: "09-09-2024 20:59:49", icon: "fa-solid fa-truck" },
            { title: "Giao hàng thành công", time: "09-09-2024 20:59:55", icon: "fa-solid fa-house-circle-check" }
        ]);

        // Lấy chi tiết hóa đơn từ API
        const fetchChiTietHoaDon = async () => {
            try {
                console.log("ID từ URL:", route.params.id); // Kiểm tra ID
                const response = await HoaDonService.getHoaDonById(route.params.id);
                hoaDon.value = response.data; // Lưu kết quả vào hoaDon
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết hóa đơn:', error);
            }
        };

        // Gọi hàm khi component được mounted
        onMounted(fetchChiTietHoaDon);

        // Trả về dữ liệu để sử dụng trong template
        return {
            hoaDon,
            steps,
        };
    }
};
</script>
<style scoped>
.order-detail-container {
    width: 100%;
    max-width: none;
    /* Đảm bảo không bị giới hạn */
    margin: auto;
}

.header {

    font-size: 20px;
    font-weight: 500;
    padding: 15px 20px;
    background: #f8f8f8;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
}

/* Đảm bảo bảng tiêu đề rộng bằng hóa đơn */
.header-table {
    width: 100%;
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0px 2px 5px rgba(252, 252, 252, 0.1);
}

.breadcrumb {
    color: #6e6e6e;
}

.current-page {
    color: #000;
}

.order-progress {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    background: white;
}

.progress-container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
}

.step {
    text-align: center;
    flex: 1;
}

.icon i {
    font-size: 24px;
}

.order-progress {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    background: white;
}

.progress-container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
}

.step {
    text-align: center;
    flex: 1;
}

.icon i {
    font-size: 24px;
}

/* Khu vực chứa nút */
.order-actions {
    display: flex;
    justify-content: space-between;
    /* Tạo khoảng cách giữa hai nhóm nút */
    margin-top: 10px;
}

/* Nút bên trái (In hóa đơn, Chi tiết) */
.left-actions {
    display: flex;
    gap: 10px;
}

/* Nút bên phải (Xác nhận, Giao hàng, Hủy) */
.right-actions {
    display: flex;
    gap: 10px;
}

/* Style chung cho nút */
.btn {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
}

/* Định dạng container chứa hai nút */
.product-buttons {
    display: flex;
    /* Căn các nút trên cùng một hàng */
    gap: 10px;
    /* Khoảng cách giữa các nút */
    margin-left: auto;
    /* Đẩy nút sang phải */
}

/* Style chung cho nút */
.btn1 {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
}

/* Màu sắc từng nút */
.btn-print {
    background-color: #007bff;
    color: white;
}

.btn-detail {
    background-color: #dc3545;
    color: white;
}

.btn-confirm {
    background-color: #28a745;
    color: white;
}

.btn-ship {
    background-color: #ffc107;
    color: black;
}

.btn-cancel {
    background-color: #6c757d;
    color: white;
}

.btn:hover {
    opacity: 0.8;
}

.btn-scan {
    background-color: #17a2b8;
    color: white;
}

.btn-add {
    background-color: #28a745;
    color: white;
}



.header-title {
    font-size: 20px;
    font-weight: 600;
    padding: 10px;
}

.gray-text {
    color: #999;
}

.black-text {
    color: #000;
    font-weight: bold;
}

.header-avatar {
    text-align: right;
    padding: 10px;
}

.avatar {
    border-radius: 50%;
}

.product-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
    margin-bottom: 10px;
}

/* Tiến trình đơn hàng */
.order-progress {
    display: flex;
    justify-content: space-between;
    background: white;
    padding: 15px;
    border: 2px solid #d1d1d1;
    margin-top: 20px;
    border-radius: 8px;
    width: 100%;
}

.step {
    text-align: center;
    flex: 1;
    padding: 10px;
    border-right: 1px solid #d1d1d1;
}

.step:last-child {
    border-right: none;
}

.icon {
    font-size: 26px;
    color: #008000;
}

.step-title {
    display: block;
    font-weight: 600;
    color: #333;
    margin-top: 5px;
}

.step-time {
    display: block;
    color: #e6005c;
    font-size: 15px;
    font-weight: 600;
    margin-top: 3px;
}

/* Khung thông tin đơn hàng */
.order-info {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 20px;
    margin-top: 20px;
    width: 100%;
}

/* Đảm bảo khung trái/phải đều nhau */
.order-info-left,
.order-info-right {
    width: 48%;
}

/* Hàng thông tin */
.order-info-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

/* Label bên trái */
.order-info-label {
    font-weight: bold;
    width: 150px;
    color: #555;
}

/* Giá trị bên phải */
.order-info-value {
    font-weight: 500;
    color: #222;
}

/* Badge màu sắc */
.badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
}

/* Màu sắc badge */
.order-id {
    background: #f8d7da;
    color: #c82333;
}

.delivery {
    background: #d1ecf1;
    color: #0c5460;
}

.completed {
    background: #d4edda;
    color: #155724;
}

.discount {
    background: #fff3cd;
    color: #856404;
}

/* ====== Bảng & Lịch sử thanh toán ====== */
.table-container {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    width: 100%;
    max-width: none;
    color: #000;
}

/* Bảng mở rộng hết cỡ */
.table {
    width: 100%;
    max-width: none;
    border-collapse: collapse;
    margin-top: 10px;
    min-width: 960px;
    border-collapse: collapse;
}

/* Định dạng bảng */
.table th,
.table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
}

.table th {
    background: #f5f5f5;
    font-weight: bold;
    color: #333;
}

.table td {
    background: #fff;
    color: #444;
}

/* Badge trạng thái */
.payment-method {
    background: #d1ecf1;
    color: #0c5460;
    padding: 4px 8px;
    border-radius: 4px;
}

.product-name {
    font-weight: bold;
    color: #333;
}

.price {
    font-weight: bold;
    color: #d9534f;
}


.breadcrumb {
    font-size: 16px;
    color: #333;
}

.current-page {
    font-size: 16px;
    color: #555;
}

.btn-back-to-list {
    text-decoration: none;
    /* Màu nền gradient */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    display: inline-block;
    /* Giữ nút trong cùng một dòng */
}

.btn-back {
    padding: 10px 20px;
    background: linear-gradient(90deg, #000000, #434343);
    /* Gradient đen */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.btn-back:hover {
    background-color: #797b7e;
}
</style>