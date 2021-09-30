<template>
  <div>
    <div style="font-size:19px;font-weight:350" class="mt-3 mb-3">
      Đơn hàng của tôi
    </div>
    <div>
      <div class="bg-light">
        <div class="card ">
          <table class="table table-hover table-responsive" style="font-size:13px;">
            <thead >
              <tr  style="font-size:15px">
                <th style="width:40%" scope="col" class="text-secondary font-weight-normal">
                  Mã đơn hàng
                </th>
                <th style="width:20%" scope="col" class="text-secondary font-weight-normal">
                  Ngày mua
                </th>
                <th style="width:20%" scope="col" class="text-secondary font-weight-normal">
                  Sản Phẩm
                </th>
                <th style="width:20%" scope="col" class="text-secondary font-weight-normal">
                  Tổng tiền
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bill in bills" :key="bill.id">
                <td scope="row"><nuxt-link :to="'/account/history/'+bill.id">{{bill.id}}</nuxt-link></td>
                <td>{{bill.created_at.getHours()}}:{{bill.created_at.getMinutes()}} {{bill.created_at.getDate()}}/{{bill.created_at.getMonth()+1}}/{{bill.created_at.getFullYear()}}</td>
                <td><div v-for="item in bill.billdetails" :key="item.id" class="mt-1">{{item.book_name}}</div></td>
                <td>{{bill.total}}  ₫</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/core/BaseRequest";
export default {
  mounted() {
    this.getInfo().then((response)=>{
        this.getBillByUserId(response);
    })
    
  },
  data() {
    return {
      bills: [],
      userId: null,
      
    };
  },
  methods: {
    async getInfo() {
     await BaseRequest.get("user").then((response) => {
        this.userId = response.data.id;
      });
      return this.userId;
    },
    getBillByUserId(id) {
      BaseRequest.get("bill/action/getBillByIdUser/" + id).then(
        (response) => {
          console.log(response);
          this.bills = response.data;
          this.bills.forEach(element => {
            element.created_at = new Date(element.created_at);
            
          });
        }
      );
      
    },
  },
};
</script>
