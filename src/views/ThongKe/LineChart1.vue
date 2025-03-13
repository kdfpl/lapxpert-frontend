<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'


ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

export default {
  components: { Line },
  data() {
    return {
      chartData: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
          {
            label: 'Doanh thu',
            backgroundColor: 'rgba(66, 165, 245, 0.2)', // Màu nền
            borderColor: '#42A5F5', // Màu đường line
            pointBackgroundColor: '#42A5F5', // Màu của điểm
            data: [1700, 600,1100 , 900, 1000 ,800 , 1200, 1300, 1400, 1500, 1000],
            fill: true, // Có tô màu vùng dưới đường không
            tension: 0.3 // Độ cong của đường (0 -> đường gấp khúc, 1 -> đường cong mềm mại)
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
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
