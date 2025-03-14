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
        labels: ['ngày 1', 'ngày 2', 'ngày 3', 'ngày 4', 'ngày 5', 'ngày 6', 'ngày 7', 'ngày 8', 'ngày 9', 'ngày 10', 'ngày 11', 'ngày 12', 'ngày 13', 'ngày 14', 'ngày 15', 'ngày 16', 'ngày 17', 'ngày 18', 'ngày 19', 'ngày 20', 'ngày 21', 'ngày 22', 'ngày 23', 'ngày 24', 'ngày 25', 'ngày 26', 'ngày 27', 'ngày 28', 'ngày 29', 'ngày 30'],
        datasets: [
        {
            type: 'bar',
            label: 'Apple',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: '#ff6384',
            data: [1262, 2912, 2165, 2335, 2943, 1765, 1734, 1525, 2421, 1150, 2664, 1174, 2262, 2226, 2775, 1535, 1425, 1459, 1088, 1764, 2827, 2431, 1472, 2016, 2097, 1662, 1961, 2448, 1647, 1296],
          },
          {
            type: 'bar',
            label: 'ASUS',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: '#36A2EB',
            data: [1500, 1900, 1300, 1700, 2100, 1800, 2000, 4400, 3100, 3900, 4900, 4100, 4600,1765, 1734, 1525, 2421, 1150, 2664, 1174, 2262, 2226, 2775, 1535, 1425, 1459, 1088, 1765, 1734, 1525 ],
          },
          {
            type: 'bar',
            label: 'Dell',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: '#4BC0C0',
            data: [1400, 1600, 1800, 2200, 2500, 2000, 2300, 2100, 2600, 2400, 2700, 2900, 3000, 2800, 3100, 3200, 3300, 3500, 3400, 3600, 3700, 3800, 4000, 4100, 4200, 4300, 4500, 4600, 4700, 4900],
          },
          {
            type: 'bar',
            label: 'Lenovo',
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: '#9966FF',
            data: [1200, 1400, 1600, 1900, 2100, 1800, 2000, 2200, 2500, 2300, 2600, 2800, 2900, 2700, 3000, 3100, 3200, 3400, 3300, 3500, 3600, 3700, 3900, 4000, 4100, 4200, 4400, 4500, 4600, 4800],
          },
          {
            type: 'bar',
            label: 'MSI',
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: '#FF9F40',
            data: [1000, 1300, 1500, 1700, 2000, 1800, 1900, 2100, 2300, 2500, 2600, 2800, 2900, 3100, 3200, 3400, 3500, 3600, 3700, 3900, 4000, 4200, 4300, 4500, 4600, 4700, 4900, 5000, 5100, 5300],
          },
          {
            type: 'bar',
            label: 'HP',
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: '#FFCE56',
            data: [900, 1100, 1300, 1600, 1900, 1700, 1800, 2000, 2200, 2400, 2500, 2700, 2800, 2900, 3100, 3200, 3300, 3500, 3600, 3700, 3800, 4000, 4100, 4200, 4300, 4500, 4600, 4700, 4900, 5000],
          },
          {
            type: 'line',
            label: 'Tổng doanh thu',
            borderColor: '#42A5F5',
            pointBackgroundColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: [3500, 4400, 3100, 3900, 4900, 4100, 4600, 1900, 1300, 1700, 2100, 1800, 2000, 1700, 2100, 1800, 2000, 4400, 3100, 3900, 4900, 4100, 4600,1765, 1734, 1525, 2421, 1150, 2664, 3100],
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
