<template>
  <div class="card-deck p-4">
    <div class="card" style="min-width:12rem">
      <!-- <img class="card-img-top" src="..." alt="Card image cap" /> -->
      <div class="card-body">
        <h5 class="card-title">Customer</h5>
        <p class="card-text display-4 text-warning font-weight-normal" >{{customer}}</p>
      </div>
    </div>
    <div class="card" style="min-width:12rem">
      <!-- <img class="card-img-top" src="..." alt="Card image cap" /> -->
      <div class="card-body">
        <h5 class="card-title">Order</h5>
        <p class="card-text display-4 text-info font-weight-normal">
          {{order}}
        </p>
      </div>
    </div>
    <div class="card" style="min-width:12rem">
      <!-- <img class="card-img-top" src="..." alt="Card image cap" /> -->
      <div class="card-body">
        <h5 class="card-title">Revenue</h5>
        <p class="card-text display-4 text-info font-weight-normal">
         {{revenue}} đ
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from '@/core/BaseRequest';
export default {
  data() {
    return {
      customer: 0,
      order:0,
      revenue:0
    };
  },
  mounted(){
    this.getNumberUsers();
    this.getNumberBills();
    this.getRevenue();
  },
  methods: {
    getNumberUsers(){
      BaseRequest.get('user-count').then((result) => {
        console.log(result.data);
        this.customer = result.data.user_number;
      }).catch((err) => {
        console.log(err);
      });
    },
    getNumberBills(){
      BaseRequest.get('bill/action/count').then((result) => {
        this.order = result.data.bill_number;
        console.log(result);
      }).catch((err) => {
      console.log(err);
      });
    },
    getRevenue(){
      BaseRequest.get('revenue-month/action/getRevenue').then((result) => {
        this.revenue = result.data;
      }).catch((err) => {
        console.log(err);
      });
    }
  },
};
</script>