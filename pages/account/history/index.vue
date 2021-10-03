<template>
  <div style="background: rgb(250,250,250)">
  
    <div class="container mt-4">
      <div class="row">
        <div class="col-2" style="height:100vh">
          <sidebar-account />
        </div>
        <div class="col">
          <history-content />
        </div>
      </div>
    </div>
    <footer-page/>
  </div>
</template>

<script>

import HistoryContent from "~/components/HistoryContent/HistoryContent.vue";
import SidebarAccount from "~/components/SidebarAccount/SidebarAccount.vue";
export default {
  components: { SidebarAccount, HistoryContent, },
  layout:'public',
};
</script>

