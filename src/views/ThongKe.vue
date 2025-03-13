<script>
import BarChart from "./ThongKe/BarChart.vue";
import LineChart from "./ThongKe/LineChart1.vue";
import LineChart1 from "./ThongKe/LineChart.vue";

export default {
  components: {
    BarChart,
    LineChart,
    LineChart1,
  },
};


</script>
<template>
  <div class="flex flex-row p-3">
    <div
      class=" flex-none mt-2 bg-white border-white p-5 flex flex basis-1/3 mr-2">
      <div class="mr-5 basis-64">
        <div class="text-2xl text-[#8B658B]">25000</div>
        <div class="text-sm mb-10">Total sell</div>
        <div class="flex flex">
          <div class="text-xs mr-2 text-[#7A8B8B]">Total income:</div>

          <div class="text-xs text-[#7A8B8B]">222.000.000</div>
        </div>
      </div>
      <div class="ml-14 mt-4">
        ICon
        <div class="mt-12 text-xs text-[#7A8B8B]">10,25%</div>
      </div>
    </div>

    <div
      class="flex-none mt-2 bg-white border-white p-5 flex flex basis-1/3 mr-2">
      <div class="mr-5 basis-64">
        <div class="text-2xl text-[#CD5555]">25000</div>
        <div class="text-sm mb-10">Total sell</div>
        <div class="flex flex">
          <div class="text-xs mr-2 text-[#7A8B8B]">Total income:</div>

          <div class="text-xs text-[#7A8B8B]">222.000.000</div>
        </div>
      </div>
      <div class="ml-14 mt-4">
        ICon
        <div class="mt-12 text-xs text-[#7A8B8B]">10,25%</div>
      </div>
    </div>
    <div
      class="flex-none mt-2 bg-white border-white p-5 flex flex basis-1/3 mr-2">
      <div class="mr-5 basis-64">
        <div class="text-2xl text-[#FF1493]">25000</div>
        <div class="text-sm mb-10">Total sell</div>
        <div class="flex flex">
          <div class="text-xs mr-2 text-[#7A8B8B]">Total income:</div>

          <div class="text-xs text-[#7A8B8B]">222.000.000</div>
        </div>
      </div>
      <div class="ml-14 mt-4">
        ICon
        <div class="mt-12 text-xs text-[#7A8B8B]">10,25%</div>
      </div>
    </div>
  </div>

  <div class="p-3 flex flex-row">
    <div class="bg-white flex-none  p-8 basis-3/4 mr-2 ">
      <h1 class="mb-12">Biểu đồ doanh thu</h1>
      <div class="flex justify-center text-[#FFFFFF]">
        <button
       class="px-3 py-1 rounded-l-lg bg-gray-400 ">
                <a href="">Year</a>
            </button>
            <button
       class="px-3 py-1  bg-gray-400">
                <a href="">Month</a>
            </button>
            <button
       class="px-3 py-1 rounded-r-lg bg-gray-400">
                <a href="">Week</a>
            </button>
      </div>
      
      <div class="mb-5 basis-128">
        <LineChart1 />
      </div>
    </div>

    <div class="basis-1/4 bg-white">
    </div>
  </div>
</template>
