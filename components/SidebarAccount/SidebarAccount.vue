<template>
  <div>
    <div style="font-size:14px">
      Tài khoản của <br />
      <span style="font-size:17px;font-weight:400">{{name}}</span>
    </div>
    <div style="font-size:14px" class="mt-4">
      <div
        class="nav flex-column item"
        role="tablist"
        aria-orientation="vertical"
      >
        <nuxt-link
          style="text-decoration:none"
          class="nav-link active text-dark"
          data-toggle="pill"
          :to="{name:'account'}"
          role="tab"
          aria-selected="true"
          >Thông tin tài khoản</nuxt-link
        >
        <nuxt-link
          style="text-decoration:none"
          class="nav-link text-dark"
          data-toggle="pill"
          :to="{path:'/account/history'}"
          role="tab"
          aria-selected="false"
          >Quản lý đơn hàng</nuxt-link
        >
        <nuxt-link style="text-decoration:none"
          class="nav-link text-dark"
          data-toggle="pill"
          :to="{path:'/account/review'}"
          role="tab"
          aria-selected="false"
          >Nhận xét sản phẩm đã mua</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from '@/core/BaseRequest';
export default {
  mounted(){
      this.getInfo();
  },
  data() {
    return {
      name: null,
    };
  },
  methods: {
    getInfo() {
      BaseRequest.get("user").then((response) => {
          this.name = response.data.name;
          
      });
    },
  },
};
</script>

