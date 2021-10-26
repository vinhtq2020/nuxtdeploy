<template>
  <div style="background: rgb(250,250,250)">
   
    <div class="container mt-4">
      <div class="row">
        <div class="col-2" style="height:100vh">
          <sidebar-account />
        </div>
        <div class="col">
            <view-history-content/>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>


import SidebarAccount from "~/components/SidebarAccount/SidebarAccount";
import ViewHistoryContent from '~/components/ViewHistoryContent/ViewHistoryContent.vue';
export default {
  components: { SidebarAccount,ViewHistoryContent  },
  layout:'public'
};
</script>
<style>
.item a:hover {
  background: rgb(239, 239, 239);
}
</style>
