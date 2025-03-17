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
    const ThanhViens = ref([]); 

    const formattedHoaDon = computed(() => {
      return hoaDons.value.map((hoaDon, index) => ({
        index: index + 1,
        tenKhachHang: hoaDon.tenKhachHang || "N/A",
        soDienThoai: hoaDon.sdt || "N/A",
        diaChi: hoaDon.diaChi || "N/A",
        tongTien: hoaDon.tongTien ? hoaDon.tongTien.toLocaleString() + " VNĐ" : "0 VNĐ",
        ngayDat: hoaDon.ngayDat ? new Date(hoaDon.ngayDat).toISOString().split("T")[0] : "N/A",
        trangThai: hoaDon.trangThai || "Chưa xác định",
      }));
    });

    const fetchHoaDons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/thong-ke/hien-thi");
        hoaDons.value = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
      }
    };

    onMounted(fetchHoaDons);



    const formattedSoThanhVien = computed(() => {
      return ThanhViens.value.length})

    const fetchSoThanhVien = async () => {
      try {
        const response = await axios.get("http://localhost:8080/thong-ke/thanh-vien");
        ThanhViens.value = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thành viên:", error);
      }
    };

    onMounted(fetchSoThanhVien);

    return {
      headers,
      selectedComponent,
      formattedHoaDon,
      fetchHoaDons,
      hoaDons,
      fetchSoThanhVien,
      ThanhViens,
      formattedSoThanhVien
    };
  },
};
</script>

<template>
  <div >
    <div class="flex flex-row p-3  bg-gray-100">
      <div class="flex-none mt-2 bg-white shadow-xl border-white p-5 flex flex basis-1/4 mr-2">
        <div class="basis-64">
          <div class="text-2xl text-[#8B658B] font-bold">1200</div>
          <div class="text-sm mb-10">Tổng số đơn hàng</div>
          <div>
            <div class="text-xs text-[#7A8B8B]"><a href="/order">See more</a></div>
          </div>
        </div>
        <div class="mt-4 w-[90px]">
          <img src="/src/assets/img/shopping-cart.png" alt="" />
        </div>
      </div>

      <div class="flex-none mt-2 bg-white shadow-xl border-white p-5 flex flex basis-1/5 mr-2">
        <div class="mr-2 basis-64">
          <!-- {{ formattedSoThanhVien > 0 ? formattedSoThanhVien : "Loading..." }} -->
          <div class="text-2xl text-[#CD5555] font-bold"> 6</div>
          <div class="text-sm mb-10">Thành viên</div>
          <div class="flex flex">
            <div class="text-xs mr-2 text-[#7A8B8B]">
              <a href="/NhanVien">See more</a>
            </div>
          </div>
        </div>
        <div class="ml-10 mt-4 w-[90px]">
          <img src="/src/assets/img/group.png" alt="" />
        </div>
      </div>

      <div class="flex-none mt-2 bg-white shadow-xl border-white p-5 flex flex basis-1/4 mr-2">
        <div class="mr-5 basis-64">
          <div class="text-2xl text-[#FF1493] font-bold">123</div>
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
        class="flex-none mt-2 bg-white shadow-xl border-white p-5 flex flex basis-1/4 mr-2">
        <div class="mr-5 basis-64">
          <div class="text-2xl text-[#FFD700] font-bold">5</div>
          <div class="text-sm mb-10">Đánh giá</div>
          <div class="flex flex">
            <div class="text-xs mr-2 text-[#7A8B8B]">
              <a href="">See more</a>
            </div>
          </div>
        </div>
        <div class="ml-14 mt-4 w-[90px]">
          <img
            src="/src/assets/img/star.png"
            alt="" />
        </div>
      </div>
    </div>

    <div class="p-3 flex flex-row bg-gray-100">
      <div class="bg-white flex-none p-8 basis-2/3 mr-3">
        <h1 class="mb-12">Biểu đồ doanh thu</h1>
        <div class="flex justify-center text-[#FFFFFF]">
          <button @click="selectedComponent = 'Year'" class="px-3 py-1 rounded-l-lg bg-gray-400">
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
          <component class="flex basis-full" :is="selectedComponent" />
        </div>
      </div>

      <div class="bg-white basis-1/4 flex-none p-8 mr-3">
        <h1 class="mb-12">Số Laptop: </h1>
        <LaptopPT/>
      </div>
    </div>

    <div class="p-3 flex flex-row bg-gray-100">
      <div class="bg-white basis-1/4 flex-none p-8 mr-3">
        <h1 class="mb-12">Tăng trưởng khách hàng</h1>
        <TTKH />
      </div>
      <div class="bg-white flex-none p-2 basis-2/3 mr-3">
        <h1 class="mb-6 mt-2 ml-2">Đơn hàng gần đây</h1>
        <GlassTable :headers="headers" :data="formattedHoaDon" />
      </div>
    </div>
  </div>
</template>
