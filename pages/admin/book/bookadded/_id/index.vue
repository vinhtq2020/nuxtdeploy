<template>
  <div class="card mx-auto ">
    <div class="card-header text-center"></div>
    <div class="card-body">
      <form @submit.prevent="addQuatityBook">
        <div class="form-group mx-auto row">
          <label for="book_id" class="col-form-label col-1 ">Mã sách</label>
          <div class="col-7">
            <input
              type="text"
              name="book_id"
              v-model="bookId"
              readonly
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group mx-auto row">
          <label for="book_name" class="col-form-label col-1">Tên sách</label>
          <div class="col-7">
            <input
              type="text"
              name="book_name"
              v-model="bookName"
              readonly
              class="form-control"
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-2">
            <label for="quatity" class="col-form-label">Số lượng nhập</label>
            <div>
              <input
                type="number"
                name="quatity"
                v-model.number="quatity"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group col-2">
            <label for="unit_price" class="col-form-label">Đơn giá (VNĐ)</label>
            <div>
              <input
                type="number"
                name="unit_price"
                v-model.number="unitPrice"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group col-2">
            <label for="amount" class="col-form-label">Thành tiền (VNĐ)</label>
            <div class="col-7">
              <input
                type="number"
                name="amount"
                v-model.number="amount"
                readonly
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="mx-auto" style="width:400px">
          <input
            type="submit"
            name=""
            id=""
            class="btn btn-primary"
            value="Thêm hàng"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/core/BaseRequest";
export default {
  layout:"admin",
  mounted() {
    if (this.$route.params.id) {
      this.getBook(this.$route.params.id);
    }
  },
  data() {
    return {
      bookId: null,
      bookName: null,
      quatity: 0,
      unitPrice: 0,
      amount: 0,
    };
  },
  watch: {
    quatity() {
      this.amount = this.quatity * this.unitPrice;
    },
    unitPrice() {
      this.amount = this.quatity * this.unitPrice;
    },
  },
  methods: {
    getBook(id) {
      BaseRequest.get("book/" + id)
        .then((response) => {
          console.log(response);
          this.bookName = response.data.book_name;
          this.bookId = response.data.id;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    addQuatityBook() {
      BaseRequest.post("book-received", {
        book_id: this.bookId,
        book_name: this.bookName,
        quatity: this.quatity,
        unit_price: this.unitPrice,
        amount: this.amount,
      })
        .then((response) => {
          console.log(response);
          alert("Thêm hàng thành công");
          this.$router.push({ name: "book" });
        })
        .catch((error) => {
          console.log(error);
          alert("có lỗi xãy ra");
        });
    },
  },
};
</script>