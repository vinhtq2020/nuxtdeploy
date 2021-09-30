<template>
  <div style="background: rgb(250,250,250)">
  
    <div class="container mt-4">
      <div class="row">
        <div class="col-2" style="height:100vh">
          <sidebar-account />
        </div>
        <div class="col">
          <order-detail-content/>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import BaseRequest from '@/core/BaseRequest'

import OrderDetailContent from '@/components/OrderDetailContent/OrderDetailContent.vue'
import SidebarAccount from '@/components/SidebarAccount/SidebarAccount.vue'

export default {
  components: { SidebarAccount, OrderDetailContent,  },
  layout:'public',
  mounted(){
    this.checkLoggedIn();
  },
  methods:{
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
  }
}
</script>

