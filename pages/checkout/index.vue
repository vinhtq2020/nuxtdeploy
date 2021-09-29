<template>
  <div class="container mt-3" style="height:100vh">
    <div>
      <div style="font-size:18px">
        GIỎ HÀNG
        <span style="font-size:14px;text-transform: none;font-weight:300px"
          >({{ value.count }} sản phẩm)</span
        >
      </div>
      <div class="row mt-2">
        <div class="col-8">
          <div v-if="value.count == 0" class="text-center">
            Giỏ hàng của bạn đang trống
          </div>
          <div v-else>
            <div v-for="item in value.booksInCart" :key="item.bookId">
              <cart-item :data-book="item" />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="bg-white">
            <div class="d-flex border-bottom border-light p-2 pb-3">
              <div class="p-2 mr-auto" style="font-size:14px">Tạm tính</div>
              <div class="p-2" style="font-size:14px;font-weight:500">
                {{ value.totalMoney }} đ
              </div>
            </div>
            <div class="d-flex p-2">
              <div class="p-2 mr-auto" style="font-size:14px">Thành tiền</div>
              <div class="p-2" style="color:rgb(254, 56, 52);font-size:22px">
                {{ value.totalMoney }} đ
              </div>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div
              class="btn d-flex p-2 text-white mt-2 justify-content-center"
              style="background:rgb(255, 66, 78)"
              @click="showPayOptions"
            >
              Tiến hành đặt hàng
            </div>
            <pay-pal class="mt-2" v-if="show" />
            <mo-mo v-if="show" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseRequest from "@/core/BaseRequest";
import MoMo from "@/components/MoMo/MoMo.vue";
import PayPal from "~/components/PayPal/PayPal.vue";
import CartItem from "~/components/CartItem/CartItem.vue";

export default {
     layout:'public',
  data() {
    return {
      userId: null,
      show: false,
      errorCode: null,
    };
  },
  async mounted() {
    await this.setStateFromLocal();
    await this.getInfoUser();

    if (this.$route.query.errorCode != null) {
      this.errorCode = this.$route.query.errorCode;
      console.log("errorCode: ", this.$route.query.errorCode);
      if (this.errorCode === 0) {
        this.checkOut();
      }
    }
  },
  methods: {
    ...mapActions(["setStateFromLocal"]),
    async getInfoUser() {
      await BaseRequest.get("user")
        .then((response) => {
          this.userId = response.data.id;
          console.log("userId", this.userId);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkOut() {
      console.log("khi checkout ", {
        user_id: this.userId,
        total: this.value.totalMoney,
        books_array: this.value.booksInCart,
      });
      BaseRequest.post("bill", {
        user_id: this.userId,
        total: this.value.totalMoney,
        books_array: this.value.booksInCart, 
        status: "thành công",
      })
        .then((response) => {
          if (response.data.message) {
            window.localStorage.removeItem("demo");
            this.setStateFromLocal();
            alert("thanh toán thành công");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showPayOptions() {
      const token = window.localStorage.getItem("token");
      if (token == null) {
        alert("bạn cần đăng nhập để tiếp tục");
      } else {
        if (this.value.count === 0) {
          alert("giỏ hàng đang trống không thể thanh toán");
        } else {
          this.show = true;
        }
      }
    },
  },
  components: {
    CartItem,
    PayPal,
    MoMo,
  },
  computed: {
    ...mapGetters(["value"]),
  },
};
</script>


