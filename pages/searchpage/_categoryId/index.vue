<template>
  <div>
    <div class="container mt-3">
      <div class="row" style="min-height: 100vh">
        <side-bar class="col-3" />
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
