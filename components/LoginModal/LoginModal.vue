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
                    <h4>Đăng nhập bằng email</h4>
                    <p>Nhập email và mật khẩu</p>
                    <form @submit.prevent="submitLogin()">
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="abc@gmail.com"
                          v-model="email"
                          required
                          autocomplete="on"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control shadow-none"
                          placeholder="Mật khẩu"
                          v-model="password"
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
                          value="Đăng nhập"
                          style="font-size:20px"
                        />
                      </div> 
                      <!-- <div class="form-group">
                        <a href="#" class="ForgetPwd">Forget Password?</a>
                      </div> -->
                    
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
                        <span aria-hidden="true" style="font-size:20px"
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
    submitLogin() {
      BaseRequest.post("login", { email: this.email, password: this.password })
        .then((response) => {
          console.log(response);
          window.localStorage.setItem("token", response.data.token);
          this.close();
          // this.$router.push({ name: "user/home" });
          this.$router.go();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.isFail = true;
            this.errorMessage =
              "Sai tên đăng nhập hoặc mật khẩu, vui lòng đăng nhập lại";
          } else if (error.response.status === 422) {
            this.errorMessage = "Tên đăng nhập hoặc mật khẩu không hợp lệ";
            this.isFail = true;
          }
        });
    },
  },
  data() {
    return {
      isFail: false,
      email: "",
      password: "",
      errorMessage: "",
    };
  },
};
</script>

<style>
.modal-mask {
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
}
</style>
