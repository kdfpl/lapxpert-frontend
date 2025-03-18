<script>
import axios from "axios";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, PointElement, CategoryScale, LinearScale);

export default {
  components: { Line },
  data() {
    return {
      chartData: { labels: [], datasets: [] },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:8080/thong-ke/week");
        this.chartData = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    },
  },
};
</script>

<template>
  <div class="flex basic-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
