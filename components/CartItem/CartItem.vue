<template>
  <div class="bg-white">
    <div>
      <div class="row p-4 ">
        <div class="col-8 row">
          <div style="width:130px;height:130px;" class="col-4">
            <img :src="apiUrl + urlImage" alt="" style="width:130px;height:130px;"/>
          </div>
          <div class="col-8" style="font-size:14px">
            <nuxt-link to="#">{{ bookName }}</nuxt-link>
            <br />
            <br />
            <div>
              -Tác giả:
              <span><nuxt-link to="#">{{authorName}}</nuxt-link></span>
            </div>
            <br />
            <a href="#" @click="removeBook()">Xóa</a>
          </div>
        </div>

        <div class="col row">
          <div class="col-5">{{ parseInt(price) }} đ</div>
          <div class="col-7">
            <button class="border" style="width:28px" @click="decreaseBook()">-</button>
            <input
              type="tel"
              style="width:40px"
              readonly
              class="border text-center"
              :value="dataBook.quatity"
            />
            <button class="border" style="width:28px" @click="increaseBook">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseRequest from "@/core/BaseRequest";
export default {
  props: ["dataBook"],
  mounted() {
    this.getBookById(this.dataBook.bookId);
  },
  data() {
    return {
      bookName: "",
      bookId: null,
      price: 0,
      authorName: "",
        urlImage:"",
      // quatity nay la của số lượng sách đó, ko phải sách có trong giỏ
      quatity: null,

       apiUrl: process.env.VUE_APP_DATABASE_URL
    };
  },
  methods: {
    ...mapActions(['increaseBookInCart',"decreaseBookInCart","removeBookInCart"]),
    getBookById(id) {
      BaseRequest.get("book/" + id)
        .then((response) => {
          console.log(response);
          // this.book = response.data;
          this.bookId = response.data.id;
          this.price = response.data.price;
          this.authorName = response.data.author.author_name;
          this.quatity = response.data.quatity;
          this.urlImage = response.data.image.url;
          this.bookName = response.data.book_name;
            console.log(
              this.bookId,
              this.price,
              this.authorName,
              this.bookName,
              this.urlImage,
              this.quatity
            );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    increaseBook() {
      console.log('click thêm 1');
      if(this.dataBook.quatity<this.quatity){
      this.increaseBookInCart(this.dataBook.bookId);
      }
      else{
        alert("sách này chỉ còn có thể mua "+this.quatity);
      }
    },
    decreaseBook(){
      if(this.dataBook.quatity>1){
      console.log('click trừ 1');
      this.decreaseBookInCart(this.dataBook.bookId);
      }
    },
    removeBook(){
      this.removeBookInCart(this.dataBook.bookId);
    }
  },
  computed:{
  }
};
</script>

