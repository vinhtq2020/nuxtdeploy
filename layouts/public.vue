<template>
  <div style="background: #E7E7FF">
    <user-navigation/>
    <nuxt/>
    <footer-page/>
  </div>
</template>

<script>
import UserNavigation from '@/components/UserNavigation/UserNavigation.vue'
import FooterPage from '@/components/FooterPage/FooterPage.vue'
export default {
  components: { UserNavigation,FooterPage },
    head:{
     
 }
}
</script>

