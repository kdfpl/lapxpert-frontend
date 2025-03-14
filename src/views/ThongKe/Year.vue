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
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
        {
            type: 'bar',
            label: 'Apple',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: '#ff6384',
            data: [1262, 2912, 2165, 2335, 2943, 1765, 1734, 1525, 2421, 1150, 2664, 1174],
          },
          {
            type: 'bar',
            label: 'ASUS',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: '#36A2EB',
            data: [1500, 1900, 1300, 1700, 2100, 1800, 2000, 4400, 3100, 3900, 4900, 4100],
          },
          {
            type: 'bar',
            label: 'Dell',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: '#4BC0C0',
            data: [1400, 1600, 1800, 2200, 2500, 2000, 2300, 2100, 2600, 2400, 2700, 2900],
          },
          {
            type: 'bar',
            label: 'Lenovo',
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: '#9966FF',
            data: [1200, 1400, 1600, 1900, 2100, 1800, 2000, 2200, 2500, 2300, 2600, 2800],
          },
          {
            type: 'bar',
            label: 'MSI',
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: '#FF9F40',
            data: [1000, 1300, 1500, 1700, 2000, 1800, 1900, 2100, 2300, 2500, 2600, 2800],
          },
          {
            type: 'bar',
            label: 'HP',
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: '#FFCE56',
            data: [900, 1100, 1300, 1600, 1900, 1700, 1800, 2000, 2200, 2400, 2500, 2700],
          },
          {
            type: 'line',
            label: 'Tổng doanh thu',
            borderColor: '#42A5F5',
            pointBackgroundColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [3500, 4400, 3100, 3900, 4900, 4100, 4600, 1900, 1300, 1700, 2100, 1800, 2000],
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
