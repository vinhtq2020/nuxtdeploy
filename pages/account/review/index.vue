<template>
  <div style="background: rgb(250,250,250)">
  
    <div class="container mt-4">
      <div class="row">
        <div class="col-2" style="height:100vh">
          <sidebar-account />
        </div>
        <div class="col">
          <review-content/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SidebarAccount from "~/components/SidebarAccount/SidebarAccount.vue";
import ReviewContent from "~/components/ReviewContent/ReviewContent.vue"
export default {
  components: { SidebarAccount,ReviewContent},
  layout:'public',
};
</script>

