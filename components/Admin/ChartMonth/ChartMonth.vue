<script>
import { Line } from "vue-chartjs";

export default {
  props:['labels','chartData','chartTitle'],
  extends: Line,
  mounted() {
    
    setTimeout(()=>{
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "sales",
            data: this.chartData,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: this.chartTitle,
        },
      }
    );
    },4000)
  },
  
  
};
</script>
