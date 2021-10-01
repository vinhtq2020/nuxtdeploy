<template>
  <div class="p-4 border col-10 mx-auto bg-light">
    <nxb-table />
  </div>
</template>

<script>
import BaseRequest from '@/core/BaseRequest'
import NxbTable from '@/components/admin/NxbTable/NxbTable'

export default {
  components: { NxbTable },
  layout: 'admin',
  mounted() {
    this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn() {
      BaseRequest.get('user')
        .then(function (response) {
          if (response.data.role_id === 2) {
            this.$router.push({ name: 'user/home' })
          }
        })
        .catch(() => {
          // phải dùng arrow function thì nó mới hiêu this.$router
          this.$router.push({ name: 'user/home' })
        })
    },
  },
}
</script>
