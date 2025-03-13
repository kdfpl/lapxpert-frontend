<script>
import { Line } from 'vue-chartjs'
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
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, PointElement, CategoryScale, LinearScale)

export default {
  components: { Line },
  data() {
    return {
      chartData: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'],
        datasets: [
          {
            type: 'bar',
            label: 'Apple',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: '#ff6384',
            data: [2000, 2500, 1800, 2200, 2800, 2300, 2600]
          },
          {
            type: 'bar',
            label: 'ASUS',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: '#36A2EB',
            data: [1500, 1900, 1300, 1700, 2100, 1800, 2000]
          },
          {
            type: 'line',
            label: 'Tổng doanh thu',
            borderColor: '#42A5F5',
            pointBackgroundColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [3500, 4400, 3100, 3900, 4900, 4100, 4600],
            fill: true,
            tension: 0.3
          }
        ]
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  }
}
</script>

<template>
  <div >
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
