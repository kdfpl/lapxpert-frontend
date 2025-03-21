<script>
import Year from "./ThongKe/Year.vue";
import Month from "./ThongKe/Month.vue";
import Week from "./ThongKe/Week.vue";
import LaptopPT from "./ThongKe/LaptopPT.vue";
import TTKH from "./ThongKe/TTKH.vue";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import GlassTable from "../components/customTable.vue";

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
    GlassTable,
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
      return ThanhViens.value.length})

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
      return SanPhams.value.length})

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
      return donHangs.value.length})

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
      fetchSoDH
    };
  },
};
</script>

<template>
  <div >
    <div class="flex flex-row  justify-center  mb-3">
      <div class=" mt-2 bg-white shadow-xl border-white p-5 flex flex basis-1/4 mr-3">
        <div class="basis-64">
          <div class="text-2xl text-[#8B658B] font-bold"> {{ formattedSoDH > 0 ? formattedSoDH : "Loading..." }}</div>
          <div class="text-sm mb-10">Tổng số đơn hàng</div>
          <div>
            <div class="text-xs text-[#7A8B8B]"><a href="/order">See more</a></div>
          </div>
        </div>
        <div class="mt-4 w-[90px]">
          <img src="/src/assets/img/shopping-cart.png" alt="" />
        </div>
      </div>

      <div class=" mt-2 bg-white shadow-xl border-white p-5 flex flex basis-1/4 mr-3">
        <div class=" basis-64">
          <div class="text-2xl text-[#CD5555] font-bold">           {{ formattedSoThanhVien > 0 ? formattedSoThanhVien : "Loading..." }}
          </div>
          <div class="text-sm mb-10">Thành viên</div>
          <div class="flex flex">
            <div class="text-xs mr-2 text-[#7A8B8B]">
              <a href="/NhanVien">See more</a>
            </div>
          </div>
        </div>
        <div class=" mt-4 w-[90px]">
          <img src="/src/assets/img/group.png" alt="" />
        </div>
      </div>

      <div class=" mt-2 bg-white shadow-xl border-white p-5 flex flex basis-1/4 mr-3">
        <div class=" basis-64">
          <div class="text-2xl text-[#FF1493] font-bold">   {{ formattedSoSP > 0 ? formattedSoSP : "Loading..." }}</div>
          <div class="text-sm mb-10">Sản phẩm</div>
          <div class="flex flex">
            <div class="text-xs mr-2 text-[#7A8B8B]">
              <a href="/san-pham">See more</a>
            </div>
          </div>
        </div>
        <div class="ml-14 mt-4 w-[90px]">
          <img src="/src/assets/img/box.png" alt="" />
        </div>
      </div>

      <div
        class=" mt-2 bg-white shadow-xl border-white p-5 flex flex basis-1/5 ">
        <div class=" basis-64">
          <div class="text-2xl text-[#FFD700] font-bold">5</div>
          <div class="text-sm mb-10">Đánh giá</div>
          <div class="flex flex">
            <div class="text-xs mr-2 text-[#7A8B8B]">
              <a href="">See more</a>
            </div>
          </div>
        </div>
        <div class=" mt-4 w-[90px]">
          <img
            src="/src/assets/img/star.png"
            alt="" />
        </div>
      </div>
    </div>

    <div class=" flex flex-row mb-3">
      <div 
      ref="containerRef"
      class="bg-white flex flex-col p-8 mr-3 transition-all duration-300 overflow-hidden"
      :class="isScrollbarVisible ? 'basis-3/4' : 'basis-2/3'">

        <h1 class="mb-12">Biểu đồ doanh thu</h1>
        <div class="flex justify-center text-[#FFFFFF]">
          <button @click="selectedComponent = 'Year' " class="px-3 py-1 rounded-l-lg bg-gray-400">
            Year
          </button>
          <button @click="selectedComponent = 'Month'" class="px-3 py-1 bg-gray-400">
            Month
          </button>
          <button @click="selectedComponent = 'Week'" class="px-3 py-1 rounded-r-lg bg-gray-400">
            Week
          </button>
        </div>
        <div class="mb-5 basis-2/3 ">
          <component  :is="selectedComponent" />
        </div>
      </div>

      <div 
      ref="containerRef"
      class="bg-white flex flex-col p-8 mr-3 transition-all duration-300 overflow-hidden"
      :class="isScrollbarVisible ? 'basis-2/3' : 'basis-1/3'">

        <h1 class="mb-12">Số Laptop:   {{ formattedSoSP > 0 ? formattedSoSP : "Loading..." }}</h1>
        <LaptopPT/>
      </div>
    </div>

    <div class=" flex flex-row ">
      <div class="bg-white basis-1/3  p-8 mr-3">
        <h1 class="mb-12">Tăng trưởng khách hàng</h1>
        <TTKH />
      </div>
      
      <div class="bg-white  p-2 basis-2/3 mr-3">
        <h1 class="mb-6 mt-2 ml-2">Đơn hàng gần đây</h1>
        <div class="p-3 flex flex-row bg-gray-100">
      <div class="bg-white p-4 rounded shadow-lg mb-4 w-full">
        <h2 class="text-lg font-semibold mb-2">Bộ lọc</h2>

        <!-- Lọc theo trạng thái đơn hàng -->
        <div class="mb-2">
          <label class="block text-gray-700">Trạng thái đơn hàng:</label>
          <select v-model="selectedStatus" class="  border p-2 rounded w-23">
            <option value="">Tất cả</option>
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Đã thanh toán">Đã thanh toán</option>
            <option value="Đã hủy">Đã Hủy</option>
          </select>
        </div>

        <!-- Lọc theo khoảng thời gian -->
        <!-- <div class="mb-2">
          <label class="block text-gray-700">Từ ngày:</label>
          <input type="date" v-model="dateRange.from" class="border p-2 rounded w-full" />
        </div>
        <div class="mb-2">
          <label class="block text-gray-700">Đến ngày:</label>
          <input type="date" v-model="dateRange.to" class="border p-2 rounded w-full" />
        </div> -->
      </div>
    </div>

        <GlassTable :headers="headers" :data="filteredHoaDon" />
      </div>
    </div>
  </div>
</template>
