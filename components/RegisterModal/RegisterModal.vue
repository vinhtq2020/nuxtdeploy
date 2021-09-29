<template>
  <transition name="fade-shrink-in" appear>
    <div v-show="show">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-lg" role="document">
            <div
              class="modal-content"
              style="border-radius:20px;background: linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%)"
            >
              <div>
                <div class="row">
                  <div class="col-md-7 p-4">
                    <h4>Đăng ký tài khoản</h4>
                    <p>Nhập họ tên, email và mật khẩu</p>
                    <form @submit.prevent="submitRegister()">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nguyễn Văn A"
                          v-model.trim="name"
                          
                          title="họ tên chỉ bao gồm ký tự thường và in hoa"
                          minlength="5"
                          maxlength="100"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="abc@gmail.com"
                          v-model.trim="email"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          id="password"
                          type="password"
                          class="form-control"
                          placeholder="Mật khẩu"
                          v-model.trim="password"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          ref="el"
                          id="confirm_password"
                          type="password"
                          class="form-control"
                          placeholder="nhập lại mật khẩu"
                          v-model.trim="confirmPass"
                          required
                        />
                      </div>
                      <div class="form-group" v-if="isFail">
                        <span class="text-danger" style="font-size:80%">{{
                          errorMessage
                        }}</span>
                      </div>
                      <div class="form-group">
                        <input
                          type="submit"
                          class="btn btn-block btn-info text-light"
                          value="Đăng ký"
                          style="font-size:20px"
                        />
                      </div>
                    
                    </form>
                  </div>
                  <div class="col-md-5 pr-4">
                    <div>
                      <button
                        type="button"
                        class="close p-2"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="close()"
                      >
                        <span
                          aria-hidden="true"
                          
                          style="font-size:20px"
                          >&times;</span
                        >
                      </button>
                    </div>
                    <div>
                      <img
                        src="@/static/assets/25b2ccba8f33a5157f161b6a50f64a60.png"
                        class="img-fluid"
                        alt="hình ảnh chân thật"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseRequest from "@/core/BaseRequest.js";

export default {
  props: ["show"],
  methods: {
    close() {
      this.$emit("close");
    },
    updateCustomValidity(errorMatchedPass) {
      const el = this.$refs.el;
      el.oninvalid = el.setCustomValidity(errorMatchedPass);
    },

    submitRegister() {
      BaseRequest.post("register", {
        email: this.email,
        name: this.name,
        password: this.password,
        role_id: this.idRole,
      })
        .then((response) => {
          console.log(response);
          alert("đăng ký thành công");
          this.close();
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = "email đã tồn tại";
          this.isFail = true;
        });
    },
  },
  mounted() {
    this.updateCustomValidity("");
  },
  watch: {
    confirmPass() {
      if (this.password !== this.confirmPass) {
        this.updateCustomValidity("phải trùng khớp với mật khẩu");
      } else {
        this.updateCustomValidity("");
      }
    },
    password() {
      if (this.password !== this.confirmPass) {
        this.updateCustomValidity("phải trùng khớp với mật khẩu");
      } else {
        this.updateCustomValidity("");
      }
    },
  },
  data() {
    return {
      name: "",
      isFail: false,
      email: "",
      password: "",

      confirmPass: "",
      idRole: 1,

      errorMatchedPass: "",
      errorMessage: "",
    };
  },
};
</script>

<style>
/* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
} */
</style>
