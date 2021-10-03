<template>
  <div style="background: rgb(250, 250, 250)">
    <div class="container mt-3">
      <div class="row" style="height: 100vh">
        <side-bar class="col-3" style="background: white" />
        <content-area class="col-9" style="background: white" />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar/Sidebar'
import ContentArea from '~/components/SearchPageContent/SearchPageContent.vue'
export default {
  components: {
    SideBar,
    ContentArea,
  },
  layout: 'public',

}
</script>
