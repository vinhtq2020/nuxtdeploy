<template>
  <div v-if="userId">
    <div style="font-size:19px;font-weight:350" class="mt-3 mb-3">
      Thông tin tài khoản
    </div>
    <div>
      <div class="bg-light">
        <div class="card ">
          <div class="card-body">
            <form @submit.prevent="updateInfoUser()">
              <div class="form-group row">
                <label for="staticEmail" class="col-2 col-form-label"
                  >Họ tên</label
                >
                <div class="col-6">
                  <input
                    type="text"
                    class="form-control"
                    id="staticEmail"
                    v-model="name"
                    placeholder="Nhập họ tên"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputSdt" class="col-2 col-form-label"
                  >Số điện thoại</label
                >
                <div class="col-6">
                  <input
                    type="tel"
                    class="form-control"
                    id="inputSdt"
                    placeholder="Nhập số điện thoại"
                    v-model="phone"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputEmail" class="col-2 col-form-label"
                  >Email</label
                >
                <div class="col-6">
                  <input
                    type="email"
                    class="form-control"
                    :class="{
                      'is-invalid': $v.email.$error,
                      'is-invalid': isEmailExist,
                    }"
                    id="inputEmail"
                    placeholder="Nhập email"
                    v-model.trim="$v.email.$model"
                    required
                  />
                  <div class="invalid-feedback" v-if="!$v.email.required">
                    email không được bỏ trống
                  </div>
                  <div class="invalid-feedback" v-if="!$v.email.email">
                    email không hợp lệ
                  </div>
                  <div class="invalid-feedback" v-if="isEmailExist">
                    email đã tồn tại
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputGender" class="col-2 col-form-label"
                  >Giới tính:</label
                >
                <div class="col-6 mt-2">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="0"
                      v-model="gender"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >Nam</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="1"
                      v-model="gender"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >Nữ</label
                    >
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-2"></div>
                <div class="col-6">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      id="checkboxPassword"
                      class="form-check-input"
                      v-model="isChangePass"
                    />
                    <label for="checkboxPassword">Thay đổi mật khẩu</label>
                  </div>
                </div>
              </div>
              <div v-if="isChangePass">
                <div class="form-group row">
                  <label for="inputPasswordOld" class="col-2 col-form-label"
                    >Mật khẩu cũ</label
                  >
                  <div class="col-6">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPasswordOld"
                      placeholder="Nhập mật khẩu cũ"
                      v-model.trim="$v.oldPass.$model"
                      :class="{
                        'is-invalid': $v.oldPass.$error || isOldPassFail,
                      }"
                    />
                    <div class="invalid-feedback" v-if="!$v.oldPass.required">
                      Mật khẩu củ không được bỏ trống
                    </div>
                    <div class="invalid-feedback" v-if="isOldPassFail">
                      Mật khẩu củ không chính xác
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPasswordNew" class="col-2 col-form-label"
                    >Mật khẩu mới</label
                  >
                  <div class="col-6">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPasswordNew"
                      placeholder="Nhập mật khẩu mới"
                      v-model.trim="$v.newPass.$model"
                      :class="{ 'is-invalid': $v.newPass.$error }"
                    />
                    <div class="invalid-feedback" v-if="!$v.newPass.required">
                      Mật khẩu mới không được bỏ trống
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="reInputPasswordNew" class="col-2 col-form-label"
                    >Nhập lại:</label
                  >
                  <div class="col-6">
                    <input
                      type="password"
                      class="form-control"
                      id="reInputPasswordNew"
                      placeholder="Nhập lại mật khẩu mới"
                      v-model.trim="$v.reNewPass.$model"
                      :class="{ 'is-invalid': $v.reNewPass.$error }"
                    />
                    <div class="invalid-feedback" v-if="!$v.reNewPass.required">
                      Nhập lại mật khẩu mới không được bỏ trống
                    </div>
                    <div class="invalid-feedback" v-if="!$v.reNewPass.sameAs">
                      Chưa trùng khớp
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-2"></div>
                <div class="col-6">
                  <button
                    class="btn btn-warning"
                    style="width:170px;font-size:14px"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from "vuelidate/lib/validators";

import BaseRequest from "@/core/BaseRequest";
export default {
  mounted() {
    this.getInfoUser();
  },
  data() {
    return {
      userId: null,
      name: null,
      email: null,
      phone: null,
      gender: null,
      isChangePass: false,
      isEmailExist: false,
      isOldPassFail: false,
      oldPass: "",
      newPass: "",
      reNewPass: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    reNewPass: {
      required,
      sameAs: sameAs("newPass"),
    },
    newPass: {
      required,
    },
    oldPass: {
      required,
    },
  },
  methods: {
    getInfoUser() {
      BaseRequest.get("user")
        .then((response) => {
          this.userId = response.data.id;
          this.name = response.data.name;
          this.email = response.data.email;
          this.phone = response.data.phone_number;
          this.password = response.data.password;
          this.gender = response.data.gender;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateInfoUser() {
      let updateInfo = {
        name: this.name,
        email: this.email,
        phone_number: this.phone,
        gender: this.gender,
        is_change_pass: this.isChangePass,
      };
      if (this.isChangePass) {
        updateInfo = {
          ...updateInfo,
          old_password: this.oldPass,
          new_password: this.newPass,
        };
        this.$v.$touch();
        if (!this.$v.$invalid) {
          BaseRequest.post("user/action/updateInfo/" + this.userId, updateInfo)
            .then((response) => {
              this.isEmailExist = false;
              this.isOldPassFail = false;
              const errorEmail = response.data.message.filter(function(item) {
                return item === "email đã tồn tại";
              });
              const errorPassword = response.data.message.filter(function(item) {
                return item === "password không chính xác";
              });
              const success = response.data.message.filter(function(item){
                return item === "thay đổi thông tin thành công"
              });
              console.log(errorPassword, errorEmail);
              if(success[0]!=null){
                alert("cập nhật thành công");
              }else{
              if (errorEmail[0] != null) {
                this.isEmailExist = true;
              }
              if (errorPassword[0] != null) {
                this.isOldPassFail = true;
              }}
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        console.log(updateInfo);
        if (!this.$v.email.$error) {
          BaseRequest.post("user/action/updateInfo/" + this.userId, updateInfo)
            .then((response) => {
              this.isEmailExist = false;
              const success = response.data.message.filter(function(item){
                return item === "thay đổi thông tin thành công"
              });
              const errorEmail = response.data.message.filter(function(item) {
                return item === "email đã tồn tại";
              });
              if(success[0]!=null){
                alert("cập nhật thành công");
              }else{
              if (errorEmail[0] != null) {
                this.isEmailExist = true;
              }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  },
};
</script>

