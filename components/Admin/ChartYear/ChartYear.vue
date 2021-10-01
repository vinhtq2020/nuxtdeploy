<script>
import { Bar } from "vue-chartjs";
import BaseRequest from "@/core/BaseRequest";

export default {
  extends: Bar,
  mounted() {
    this.getRevenueEveryMonthInYear();
  },
  methods: {
    getRevenueEveryMonthInYear() {
      const date = new Date();
     BaseRequest.get(
        "revenue-month/action/getRevenueEveryMonthInYear/" + date.getFullYear()
      )
        .then((result) => {
          console.log("month in year", result.data);
          this.revenueSaleInYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.revenuePurchaseInYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          result.data.forEach((element) => {
            this.revenueSaleInYear[element.month - 1] = element.sale;
            this.revenuePurchaseInYear[element.month - 1] = element.purchase;
          });

          this.renderChart(
            {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "sale",
                  backgroundColor: "#f87979",
                  data: this.revenueSaleInYear,
                },
                {
                  label: "purchase",
                  backgroundColor: "#3e95cd",
                  data: this.revenuePurchaseInYear,
                },
              ],
            },
            { responsive: true, maintainAspectRatio: false }
          );
        })
       
    },
  },
  data() {
    return {
      revenueSaleInYear: [],
      revenuePurchaseInYear:[]
    };
  },
};
</script>
