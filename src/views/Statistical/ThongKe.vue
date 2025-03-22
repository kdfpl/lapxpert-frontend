<script>
import Year from "./ThongKe/Year.vue";
import Month from "./ThongKe/Month.vue";
import Week from "./ThongKe/Week.vue";
import LaptopPT from "./ThongKe/LaptopPT.vue";
import TTKH from "./ThongKe/TTKH.vue";
import axios from "axios";
import { ref, computed, onMounted } from "vue";

// Danh sách tiêu đề bảng
const headers = [
  "STT",
  "Tên Khách hàng",
  "Số điện thoại",
  "Địa chỉ",
  "Tổng tiền",
  "Ngày đặt",
  "Trạng thái",
];

export default {
  components: {
    Year,
    Month,
    Week,
    LaptopPT,
    TTKH,
  },
  setup() {
    const selectedComponent = ref(Year);
    const hoaDons = ref([]);
    const donHangs = ref([]);
    const ThanhViens = ref([]);
    const SanPhams = ref([]);
    const selectedStatus = ref(""); // Lưu trạng thái đơn hàng được chọn
    const dateRange = ref({ from: "", to: "" }); // Lưu khoảng thời gian lọc

    const fetchHoaDons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/thong-ke/hien-thi");
        hoaDons.value = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
      }
    };

    onMounted(fetchHoaDons);

    const filteredHoaDon = computed(() => {
      return hoaDons.value.filter((hoaDon) => {
        const isStatusMatch =
          !selectedStatus.value || hoaDon.trangThai === selectedStatus.value;

        const ngayDat = new Date(hoaDon.ngayDat);
        const fromDate = dateRange.value.from ? new Date(dateRange.value.from) : null;
        const toDate = dateRange.value.to ? new Date(dateRange.value.to) : null;

        const isDateMatch =
          (!fromDate || ngayDat >= fromDate) &&
          (!toDate || ngayDat <= toDate);

        return isStatusMatch && isDateMatch;
      }).map((hoaDon, index) => ({
        index: index + 1,
        tenKhachHang: hoaDon.tenKhachHang || "N/A",
        soDienThoai: hoaDon.sdt || "N/A",
        diaChi: hoaDon.diaChi || "N/A",
        tongTien: hoaDon.tongTien ? hoaDon.tongTien.toLocaleString() + " VNĐ" : "0 VNĐ",
        ngayDat: hoaDon.ngayDat ? new Date(hoaDon.ngayDat).toISOString().split("T")[0] : "N/A",
        trangThai: hoaDon.trangThai || "Chưa xác định",
      }));
    });

    const formattedSoThanhVien = computed(() => {
      return ThanhViens.value.length;
    });

    const fetchSoThanhVien = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/nhan-vien/fetch");
        ThanhViens.value = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thành viên:", error);
      }
    };
    onMounted(fetchSoThanhVien);

    const formattedSoSP = computed(() => {
      return SanPhams.value.length;
    });

    const fetchSoSP = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/san-pham/fetch");
        SanPhams.value = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu SP:", error);
      }
    };
    onMounted(fetchSoSP);

    const formattedSoDH = computed(() => {
      return donHangs.value.length;
    });

    const fetchSoDH = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/don-hang/fetch");
        donHangs.value = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu SP:", error);
      }
    };
    onMounted(fetchSoDH);

    return {
      headers,
      selectedComponent,
      filteredHoaDon,
      selectedStatus,
      fetchHoaDons,
      dateRange,
      hoaDons,
      donHangs,
      fetchSoThanhVien,
      ThanhViens,
      formattedSoThanhVien,
      formattedSoSP,
      fetchSoDH,
    };
  },
};
</script>

<template>
  <div class="p-4 flex flex-col h-full">
    <!-- Thống kê nhanh -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <div class="card bg-base-100 shadow-xl p-5 flex flex-col items-center min-w-0">
        <div class="flex-1">
          <div class="text-2xl text-primary font-bold">{{ formattedSoDH > 0 ? formattedSoDH : "Loading..." }}</div>
          <div class="text-sm mb-2">Tổng số đơn hàng</div>
          <div class="text-xs text-secondary"><a href="/order">See more</a></div>
        </div>
        <div class="w-16 md:w-20">
          <img src="/src/assets/img/shopping-cart.png" alt="Shopping Cart" />
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl p-5 flex flex-col items-center min-w-0">
        <div class="flex-1">
          <div class="text-2xl text-primary font-bold">{{ formattedSoThanhVien > 0 ? formattedSoThanhVien : "Loading..." }}</div>
          <div class="text-sm mb-2">Thành viên</div>
          <div class="text-xs text-secondary"><a href="/NhanVien">See more</a></div>
        </div>
        <div class="w-16 md:w-20">
          <img src="/src/assets/img/group.png" alt="Group" />
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl p-5 flex flex-col items-center min-w-0">
        <div class="flex-1">
          <div class="text-2xl text-primary font-bold">{{ formattedSoSP > 0 ? formattedSoSP : "Loading..." }}</div>
          <div class="text-sm mb-2">Sản phẩm</div>
          <div class="text-xs text-secondary"><a href="/san-pham">See more</a></div>
        </div>
        <div class="w-16 md:w-20">
          <img src="/src/assets/img/box.png" alt="Box" />
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl p-5 flex flex-col items-center min-w-0">
        <div class="flex-1">
          <div class="text-2xl text-primary font-bold">5</div>
          <div class="text-sm mb-2">Đánh giá</div>
          <div class="text-xs text-secondary"><a href="">See more</a></div>
        </div>
        <div class="w-16 md:w-20">
          <img src="/src/assets/img/star.png" alt="Star" />
        </div>
      </div>
    </div>

    <!-- Biểu đồ và thống kê -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card bg-base-100 shadow-xl p-6 flex-1 min-w-0">
        <h1 class="mb-6 text-xl font-bold">Biểu đồ doanh thu</h1>
        <div class="flex justify-center gap-2">
          <button @click="selectedComponent = 'Year'" class="btn btn-primary">Year</button>
          <button @click="selectedComponent = 'Month'" class="btn btn-primary">Month</button>
          <button @click="selectedComponent = 'Week'" class="btn btn-primary">Week</button>
        </div>
        <div class="mt-4">
          <component :is="selectedComponent" />
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl p-6 flex-1 min-w-0">
        <h1 class="mb-6 text-xl font-bold">Số Laptop: {{ formattedSoSP > 0 ? formattedSoSP : "Loading..." }}</h1>
        <LaptopPT />
      </div>
    </div>

    <!-- Tăng trưởng khách hàng và đơn hàng gần đây -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      <div class="card bg-base-100 shadow-xl p-6 flex-1 min-w-0">
        <h1 class="mb-6 text-xl font-bold">Tăng trưởng khách hàng</h1>
        <TTKH />
      </div>

      <div class="card bg-base-100 shadow-xl p-6 flex-1 min-w-0">
        <h1 class="mb-6 text-xl font-bold">Đơn hàng gần đây</h1>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Trạng thái đơn hàng:</label>
          <select v-model="selectedStatus" class="select select-bordered w-full">
            <option value="">Tất cả</option>
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Đã thanh toán">Đã thanh toán</option>
            <option value="Đã hủy">Đã Hủy</option>
          </select>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-auto w-full">
            <thead>
              <tr>
                <th v-for="header in headers" :key="header">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in filteredHoaDon" :key="index">
                <td>{{ row.index }}</td>
                <td>{{ row.tenKhachHang }}</td>
                <td>{{ row.soDienThoai }}</td>
                <td>{{ row.diaChi }}</td>
                <td>{{ row.tongTien }}</td>
                <td>{{ row.ngayDat }}</td>
                <td>{{ row.trangThai }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


