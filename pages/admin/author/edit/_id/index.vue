<template>
  
        <div class="p-4 border col-10 mx-auto">
          <div class="card ">
            <div class="card-header text-center"></div>
            <div class="card-body">
              <form @submit.prevent="action()">
                <div class="form-group mx-auto row">
                  <label for="author_name" class="col-form-label col-md-1"
                    >Tác giả:</label
                  >
                  <div class="col-md-7">
                    <input
                      type="text"
                      name="author_name"
                      v-model.trim="$v.authorName.$model"
                      :class="{
                        'is-invalid': $v.authorName.$error,
                        'is-valid': !$v.authorName.$invalid,
                        'form-control': true,
                      }"
                    />
                    <div class="valid-feedback">book name is valid</div>
                    <div
                      class="invalid-feedback"
                      v-if="!$v.authorName.required"
                    >
                      book name must be required
                    </div>
                    <div
                      class="invalid-feedback"
                      v-if="!$v.authorName.maxLength"
                    >
                      book name have most
                      {{ $v.authorName.$params.maxLength.max }} letters
                    </div>
                  </div>
                </div>

                <div class="form-group mx-auto row">
                  <label for="introduction" class="col-form-label col-md-1"
                    >giới thiệu:</label
                  >
                  <div class="col-md-7">
                    <textarea
                      type="text"
                      name="introduction"
                      v-model.trim="introduction"
                      :class="{
                        'form-control': true,
                      }"
                    >
                    </textarea>
                    <!-- <div class="valid-feedback">book name is valid</div>
            <div class="invalid-feedback" v-if="!$v.introduction.required">
              introduction must be required
            </div> -->
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
    layout:'admin',
  mounted() {
    if (this.$route.params.id) {
      this.getAuthor(this.$route.params.id);
      this.checkLoggedIn();
    }
  },
  data() {
    return {
      loading: false,
      id: this.$route.params.id,
      authorName: "",
      introduction: "",
    };
  },
  validations: {
    authorName: {
      required,
      maxLength: maxLength(100),
    },
    // introduction: {
    //   required,
    // },
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
          this.$router.push({ path:"/" });
        });
    },
    action() {
      if (this.$route.params.id) {
        console.log("có params");
        this.updateAuthor();
      } else {
        this.createAuthor();
      }
    },

    createAuthor() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("tác giả");
        this.loading = false;
      } else {
        console.log("tác giả");
        BaseRequest.post("author", {
          author_name: this.authorName,
          introduction: this.introduction,
        })
          .then((response) => {
            alert("thêm tác giả thành công");
            this.loading = false;
            console.log(response);
            this.$router.push({ name: "author" });
          })
          .catch((errors) => {
            console.log(errors);
            this.loading = false;
          });
      }
    },

    getAuthor(id) {
      BaseRequest.get("author/" + id)
        .then((response) => {
          console.log(response);
          this.authorName = response.data.author_name;
          this.introduction = response.data.introduction;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    updateAuthor() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        const author = {
          author_name: this.authorName,
          introduction: this.introduction,
        };
        BaseRequest.put("author/" + this.id, author)
          .then((response) => {
            console.log(response);
            alert("update author thành công");
            this.loading = false;
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