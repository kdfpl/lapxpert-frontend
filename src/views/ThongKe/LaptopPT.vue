<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: ['Dell', 'HP', 'Apple', 'Lenovo', 'Asus'],
        datasets: [
          {
            label: 'Số Laptop (%)',
            data: [25, 20, 15, 25, 15], // Giả định thị phần
            backgroundColor: [
              '#FF6384', // Dell
              '#36A2EB', // HP
              '#FFCE56', // Apple
              '#4BC0C0', // Lenovo
              '#9966FF'  // Asus
            ],
            hoverOffset: 10 // Hiệu ứng khi di chuột
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
