<template>
 
        <div class="p-4 border col-10 mx-auto bg-light">
          <author-table />
        </div>
    
</template>

<script>
import BaseRequest from "@/core/BaseRequest";
import AuthorTable from "@/components/admin/AuthorTable/AuthorTable";
export default {
  components: { AuthorTable },
  layout:'admin',
  mounted() {
    this.checkLoggedIn();
  },
  methods: {
    checkLoggedIn() {
      BaseRequest.get("user")
        .then(function(response) {
          if (response.data.role_id === 2) {
            this.$router.push({ path:"/"  });
          }
        })
        .catch(() => {
          // phải dùng arrow function thì nó mới hiêu this.$router
          this.$router.push({ name: "user/home" });
        });
    },
  },
};
</script>
