<template>
  
        <div class="p-4 border col-10 mx-auto">
          <div class="card">
            <div class="card-header text-center">
              {{ this.$route.params.id }}
            </div>
            <div class="card-body">
              <form action="" @submit.prevent="action()">
                <div class="form-group mx-auto">
                  <label for="NxbName" class="">Tên Nhà xuất bản:</label>
                  <input
                    type="text"
                    name="NxbName"
                    v-model.trim="$v.NxbName.$model"
                    :class="{
                      'is-invalid': $v.NxbName.$error,
                      'is-valid': !$v.NxbName.$invalid,
                      'form-control': true,
                    }"
                  />
                  <div class="valid-feedback">NXB name is valid</div>
                  <div
                    class="invalid-feedback"
                    v-if="!$v.NxbName.required"
                  >
                    NXB name must be required
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="!$v.NxbName.maxLength"
                  >
                    NXB name have most
                    {{ $v.NxbName.$params.maxLength.max }} letters
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
    this.checkLoggedIn();
    if (this.$route.params.id) {
      this.getNxb(this.$route.params.id);
    } else {
      // this.$router.push({ name: "category" });
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      NxbName: "",

      loading: false,

      nxbId: null,
    };
  },
  validations: {
    NxbName: {
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
        this.updateNxb();
      } else {
        this.createNxb();
      }
    },
    createNxb() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        BaseRequest.post("nxb", { nxb_name: this.NxbName })
          .then((response) => {
            alert("tạo nxb thành công");
            this.loading = false;
            console.log(response);
            this.$router.push({ name: "nxb" });
          })
          .catch((errors) => {
            console.log(errors);
            this.loading = false;
          });
      }
    },

    getNxb(id) {
      BaseRequest.get("nxb/" + id)
        .then((response) => {
          console.log(response);
          this.NxbName = response.data.nxb_name;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    updateNxb() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        const nxb = {
          nxb_name: this.NxbName,
        };
        BaseRequest.put("nxb/" + this.id, nxb)
          .then((response) => {
            console.log(response);
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
