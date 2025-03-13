<script>
import Year from "./ThongKe/Year.vue";
import Month from "./ThongKe/Month.vue";
import Week from "./ThongKe/Week.vue";
import PieChart from "./ThongKe/PieChart.vue";
import { ref } from "vue";

export default {
  components: {
    Year,
    Month,
    Week,
    PieChart
  },

  data() {
    return {
      components: [Year, Month, Week],
      selectedComponent: "Year",
    };
  },
};
</script>
<template>
  <div class="flex flex-row p-3">
    <div
      class="flex-none mt-2 bg-white border-white p-5 flex flex basis-1/4 mr-2">
      <div class=" basis-64">
        <div class="text-2xl text-[#8B658B] font-bold">1200</div>
        <div class="text-sm mb-10">Tổng số đơn hàng</div>
        <div >
          <div class="text-xs  text-[#7A8B8B]"><a href="">See more</a></div>
        </div>
      </div>

      <div class="mt-4 w-[90px]">
        <img src="/src/assets/img/shopping-cart.png" alt="">
      </div>
    </div>

    <div
      class="flex-none mt-2 bg-white border-white p-5 flex flex basis-1/4 mr-2">
      <div class="mr-2 basis-64">
        <div class="text-2xl text-[#CD5555] font-bold">6</div>
        <div class="text-sm mb-10">Thành viên</div>
        <div class="flex flex">
          <div class="text-xs mr-2 text-[#7A8B8B]"><a href="">See more</a></div>

        </div>
      </div>
      <div class="ml-10 mt-4 w-[90px]">
        <img src="/src/assets/img/group.png" alt="">

      </div>
    </div>
    <div
      class="flex-none mt-2 bg-white border-white p-5 flex flex basis-1/4 mr-2">
      <div class="mr-5 basis-64">
        <div class="text-2xl text-[#FF1493] font-bold">123</div>
        <div class="text-sm mb-10 ">Sản phẩm</div>
        <div class="flex flex">
          <div class="text-xs mr-2 text-[#7A8B8B] "><a href="">See more</a></div>
        </div>
      </div>
      <div class="ml-14 mt-4 w-[90px]">
        <img src="/src/assets/img/box.png" alt="">
      </div>
    </div>
    <div
      class="flex-none mt-2 bg-white border-white p-5 flex flex basis-1/4 mr-2">
      <div class="mr-5 basis-64">
        <div class="text-2xl text-[#FFD700] font-bold">5</div>
        <div class="text-sm mb-10 ">Đánh giá</div>
        <div class="flex flex">
          <div class="text-xs mr-2 text-[#7A8B8B] "><a href="">See more</a></div>
        </div>
      </div>
      <div class="ml-14 mt-4 w-[90px]">
        <img src="/src/assets/img/star.png" alt="">
      </div>
    </div>
  </div>

  <div class="p-3 flex flex-row">
    <div class="bg-white flex-none p-8 basis-2/3  mr-3">
      <h1 class="mb-12">Biểu đồ doanh thu</h1>
      <div class="flex justify-center text-[#FFFFFF]">
        <button
          @click="selectedComponent = 'Year'"
          class="px-3 py-1 rounded-l-lg bg-gray-400">
          Year
        </button>
        <button
          @click="selectedComponent = 'Month'"
          class="px-3 py-1 bg-gray-400">
          Month
        </button>
        <button
          @click="selectedComponent = 'Week'"
          class="px-3 py-1 rounded-r-lg bg-gray-400">
          Week
        </button>
      </div>

      <div class="mb-5 basis-2/3">
        <component :is="selectedComponent" />
        <PolarChart/>
      </div>
    </div>

    <div class=" bg-white basis-1/3  flex-none p-8  mr-3"> 

      <h1 class="mb-12">Biểu đồ doanh thu</h1>

        <PieChart/>
    </div>
  </div>

</template>
