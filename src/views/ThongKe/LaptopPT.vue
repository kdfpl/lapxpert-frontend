<script>
import axios from "axios";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Số Laptop (%)",
            data: [],
            backgroundColor: [
              "#FF6384", // Dell
              "#36A2EB", // HP
              "#FFCE56", // Apple
              "#4BC0C0", // Lenovo
              "#9966FF", // Asus
            ],
            hoverOffset: 10,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    };
  },

  mounted() {
    this.fetchChartData();
  },

  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/thong-ke/laptop"
        );
        const { labels, data } = response.data;

        // Cập nhật biểu đồ
        this.updateChartData(labels, data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    },

    updateChartData(labels, data) {
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: "Số Laptop (%)",
            data: data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#CD661D",
              "#CD0000"
            ],
            hoverOffset: 10,
          },
        ],
      };
    },
  },
};
</script>

<template>
  <div>
    <Pie
      :data="chartData"
      :options="chartOptions" />
  </div>
</template>
