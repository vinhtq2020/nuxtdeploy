<template>
 
        <div class="p-4 border col-10 mx-auto bg-light">
         <category-table/>
        </div>
   
</template>

<script>
import BaseRequest from '@/core/BaseRequest';
import CategoryTable from '@/components/Admin/CategoryTable/CategoryTable.vue'
export default {
  components: { CategoryTable },
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
          // phải dùng arrow function thì nó mới hiêu this.$router
          this.$router.push({ name: "user/home" });
        });
    },
  }
}
</script>
