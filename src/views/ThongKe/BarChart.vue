<script>
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Đăng ký các thành phần cần thiết
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
          {
            label: 'Doanh thu',
            backgroundColor: '#42A5F5',
            data: [500, 600, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1700, 1600]
          }
        ]
      },

      
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    }
  }
}
</script>

<template>
  <div class="flex flex">
    <Bar :data="chartData"   :options="chartOptions" />
  </div>
</template>
