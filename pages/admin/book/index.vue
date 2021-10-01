<template>
  <div>
         <book-table/>
    </div>
</template>

<script>
import BaseRequest from '@/core/BaseRequest';
import BookTable from '@/components/Admin/BookTable/BookTable.vue';

export default {
  components: {BookTable,},
  layout:'admin',
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
};
</script>
