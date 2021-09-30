<template>
  <div>
    <div>
      <div><information-card /></div>
    </div>
    <div class="p-4 border col-10 mx-auto">
      <!-- <bill-table :page-data=2 /> -->
      <bill-table/>
    </div>
    <div class="p-4 border col-10 mx-auto my-4">
          <chart-month
            :chart-data="billInDateOfMonth"
            :labels="dateInMonth"
            chart-title="Revenue in Month"
          />
        </div>
  </div>
</template>

<script>
import BaseRequest from "~/core/BaseRequest";
import BillTable from '~/components/Admin/BillTable/BillTable.vue'
import ChartMonth from '~/components/Admin/ChartMonth/ChartMonth.vue'
import InformationCard from '~/components/Admin/InformationCard/InformationCard.vue'
export default {
  components: { InformationCard, BillTable, ChartMonth },
  layout: 'admin',
  mounted() {
    this.checkLoggedIn();
    this.getBillInDate();
    // this.getRevenueEveryMonthInYear();
  },
  data() {
    return {
      billInDateOfMonth: [],
      dateInMonth: [],

      MonthInYear: [],
      revenueInYear: [],
    };
  },
  methods: {
    checkLoggedIn() {
      BaseRequest.get("user")
        .then(function(response) {
          if (response.data.role_id === 2) {
            this.$router.push({ name: "user/home" });
          }
        })
        .catch(() => {
          //phải dùng arrow function thì nó mới hiêu this.$router
          this.$router.push({ name: "user/home" });
        });
    },
    getBillInDate() {
      BaseRequest.get("bill/action/getBillInDate")
        .then((result) => {
          console.log("bill of month", result);
          this.billInDateOfMonth = result.data.bill_in_date_of_month;
          this.dateInMonth = result.data.date_array;
          console.log("bill in date of month", this.billInDateOfMonth);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getRevenueEveryMonthInYear() {
      const date = new Date();
      BaseRequest.get(
        "revenue-month/action/getRevenueEveryMonthInYear/" + date.getFullYear()
      )
        .then((result) => {
          console.log("month in year", result.data);
          this.RevenueInYear = [0,0,0,0,0,0,0,0,0,0,0,0];
          result.data.forEach(element => {
            this.revenueInYear[element.month-1]= element.sale;
          });
          
          console.log(this.RevenueInYear);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}
</script>
