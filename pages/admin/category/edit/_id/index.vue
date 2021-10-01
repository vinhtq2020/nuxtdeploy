<template>
        <div class="p-4 border col-10 mx-auto">
          <div class="card">
            <div class="card-header text-center">
              {{ this.$route.params.id }}
            </div>
            <div class="card-body">
              <form action="" @submit.prevent="action()">
                <div class="form-group mx-auto">
                  <label for="categoryName" class="">Tên danh mục:</label>
                  <input
                    type="text"
                    name="categoryName"
                    v-model.trim="$v.categoryName.$model"
                    :class="{
                      'is-invalid': $v.categoryName.$error,
                      'is-valid': !$v.categoryName.$invalid,
                      'form-control': true,
                    }"
                  />
                  <div class="valid-feedback">category name is valid</div>
                  <div
                    class="invalid-feedback"
                    v-if="!$v.categoryName.required"
                  >
                    category name must be required
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="!$v.categoryName.maxLength"
                  >
                    category name have most
                    {{ $v.categoryName.$params.maxLength.max }} letters
                  </div>
                </div>
                <button class="btn btn-primary" type="submit">
                  <span class="spinner-border" v-if="loading"></span>Submit
                </button>
              </form>
            </div>
          </div>
        </div>
    
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import BaseRequest from "@/core/BaseRequest";

export default {
 
  mounted() {
    this.checkLoggedIn();
    if (this.$route.params.id) {
      this.getCategory(this.$route.params.id);
    } else {
      // this.$router.push({ name: "category" });
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      categoryName: "",

      loading: false,

      categoryId: null,
    };
  },
  validations: {
    categoryName: {
      required,
      maxLength: maxLength(50),
    },
  },
  methods: {
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
    action() {
      if (this.id) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    },
    createCategory() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        BaseRequest.post("category", { category_name: this.categoryName })
          .then((response) => {
            alert("tạo category thành công");
            this.loading = false;
            console.log(response);
            // this.$router.push({ name: "category" });
          })
          .catch((errors) => {
            console.log(errors);
            this.loading = false;
          });
      }
    },

    getCategory(id) {
      BaseRequest.get("category/" + id)
        .then((response) => {
          console.log(response);
          this.categoryName = response.data.category_name;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    updateCategory() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        const category = {
          category_name: this.categoryName,
        };
        BaseRequest.put("category/" + this.id, category)
          .then((response) => {
            console.log(response);
            this.loading = false;
            alert('cập nhật thành công')
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      }
    },
  },
};
</script>