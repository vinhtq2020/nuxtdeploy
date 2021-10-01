<template>
  <div>
    <div class="row">
      <sidebar-admin class="col-2" />
      <div class="ml-auto col-10">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '@/components/Admin/SidebarAdmin/SidebarAdmin'
import BaseRequest from "@/core/BaseRequest";
export default {
  components: { SidebarAdmin },
  mounted(){
      this.checkLoggedIn();
  },
  methods: {
    checkLoggedIn() {
      BaseRequest.get('user')
        .then(function (response) {
          if (response.data.role_id === 2) {
            this.$router.push({ path: '/' })
          }
        })
        .catch(() => {
          // phải dùng arrow function thì nó mới hiêu this.$router
          this.$router.push({ path: '/' })
        })
    },
  },
}
</script>
