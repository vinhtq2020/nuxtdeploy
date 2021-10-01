<template>
<div style=" background: rgb(250,250,250);">
    <script type="application/ld+json" v-html="jsonld"></script>
    <navigation />
    <div class="container mt-3">
      <h1 style="font-size:32px">CHI TIẾT SẢN PHẨM</h1>
      <div class="row rounded" style="background: white">
        <div class="col-5">
          <div class="group-image">
            <div style="width:400px;height:400px;background:white">
              <img
                :src="urlImage"
                :alt="bookName"
                srcset=""
                style="width:400px;height:400px"
              />
            </div>
          </div>
        </div>
        <div class="col-7">
          <div>
            <h4 style="font-size:13px" class="mt-2">
              Tác giả:
              <span
                ><router-link
                  :to="{
                    name: 'search-page',
                    query: { authorSelect: [this.authorId] },
                  }"
                  >{{ this.authorName }}</router-link
                ></span
              >
            </h4>
            <h5 style="font-size:24px">
              {{ this.bookName }}
            </h5>
          </div>
          <div class="col-9">
            <div class="border-bottom">
              <div
                style="background:rgb(250,250,250); height:100px"
                class="rounded mb-4 p-2"
              >
                <h2>{{ parseInt(this.price) + " ₫" }}</h2>
              </div>
            </div>
            <div class="m-2">
              <div>Số lượng</div>
              <div v-if="quatity > 0">
                <button
                  class="btn disabled border"
                  type="button"
                  style="width:40px;height:40px;font-weight:bold"
                  @click="decreaseQuatity"
                >
                  -
                </button>
                <input
                  type="tel"
                  class="border text-center"
                  style="height:40px;padding-bottom:7px;width:60px;font-weight:bold"
                  :value="quatityToBuy"
                  min="1"
                  :max="quatity"
                  readonly
                />
                <button
                  class="btn disabled border plus -btn"
                  type="button"
                  style="width:40px;height:40px;font-weight:bold"
                  @click="increaseQuatity"
                >
                  +
                </button>
                <div>chỉ còn lại {{ quatity }} sản phẩm</div>
              </div>
              <div v-if="quatity > 0">
                <div
                  class="btn mt-2 p-3 text-light"
                  style="width:300px;background:rgb(255, 57, 69)"
                  @click="addBookToCart"
                >
                  Thêm vào giỏ hàng
                </div>
              </div>
              <div v-if="quatity == 0" class="text-danger">Hết hàng</div>
            </div>
            <div class="sharethis-inline-share-buttons"></div>
          </div>
        </div>
      </div>
      <div>
        <!-- <div class="mt-4" style="font-size:18px">SẢN PHẨM TƯƠNG TỰ</div> -->
        <h3 class="mt-4" style="font-size:18px">SẢN PHẨM TƯƠNG TỰ</h3>
        <div class="row rounded p-4">
          <slider :itemShow="4" :parentData="booksRelate" />
        </div>
      </div>
      <div>
        <h3 class="mt-4" style="font-size:18px">THÔNG TIN CHI TIẾT</h3>
        <div class="row rounded p-4">
          <div class="col-8" style="background: white">
            <table>
              <tbody>
                <tr>
                  <td>Nhà xuất bản</td>
                  <td>{{ NXB }}</td>
                </tr>
                <tr>
                  <td>Năm xuất bản</td>
                  <td>{{ year }}</td>
                </tr>
                <tr>
                  <td>Tác giả</td>
                  <td>{{ authorName }}</td>
                </tr>
                <tr>
                  <td>Tái bản lần thứ</td>
                  <td>{{ republic }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h3 class="mt-4" style="font-size:18px">MÔ TẢ SẢN PHẨM</h3>
        <div class="row">
          <p
            class="col-8 rounded p-4"
            style="background: white; white-space: pre-wrap;"
          >
            {{ content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import BaseRequest from '~/core/BaseRequest'  
export default {
    layout:'public',
  data() {
    return {
      booksRelate: [],
      book: [],

      bookName: "",
      bookId: null,
      price: 0,
      categoryId: null,
      content: "",
      NXB: "",
      year: null,
      authorName: "",
      republic: null,
      urlImage: "",
      quatity: null,
      authorId: [],
      quatityToBuy: 1,
      amount: 0,
      contentDescription: "",
      baseUrl: process.env.VUE_APP_BASE_URL,

      jsonld: {
      },
    };
  },
  head(){
    return{
      title:"chi tiết sản phẩm",
      meta: [
        {
          property:"og:url",
          content:window.location.href
        },
        {
          property: "og:locale",
          content: "vi_VN",
        },
        {
          property: "og:site_name",
          content: process.env.VUE_APP_BASE_URL,
        },
        {
          property: "og:type",
          content: "website",
        },
        {vmid:"og:title", property: "og:title", content: this.bookName },
        {
          name: "description",
          content: this.contentDescription,
        },
        {
          property: "og:description",
          content: this.contentDescription,
        },
        {
          property: "og:image",
          content: this.urlImage,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:site",
          content: "@",
        },
        {
          name: "twitter:title",
          content: this.bookName,
        },
        {
          name: "twitter:description",
          content: this.contentDescription,
        },
        {
          name: "twitter:img",
          content: this.urlImage,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(["getBookQuatityInCartById"]),
  },
  watch: {
    content() {
      return (this.contentDescription = this.content.slice(0, 197) + "...");
    },
  },
  async mounted() {
    console.log("process.env.VUE_APP_DATABASE_URL: ",process.env.VUE_APP_DATABASE_URL);
    // ShareThis provides javascript embed code for HTML which doesn't work directly for Single Page Applications like the one created with Vue.js/Nuxt.js. 
    // Re-initializing ShareThis on page mount will fix it for Vue.js apps.
    const st = window.__sharethis__;
    if (!st) {
      const script = document.createElement("script");
      
      script.src =
        "https://platform-api.sharethis.com/js/sharethis.js#property=613c94ae46199d00191777b4&product=inline-share-buttons";
      script.async="async"
      document.body.appendChild(script);
    } else if (typeof st.initialize === "function") {
      st.href = window.location.href;
      st.initialize();
    }
    if (this.$route.params.id) {
      await this.getBookById(this.$route.params.id);
      await this.setStateFromLocal();
      this.jsonld={
        "@context": this.baseUrl,
        "@type": "Product",
        name:this.bookName,
        image: this.urlImage,
        description: this.contentDescription,

        offers: {
          "@type": "Offer",
          url: this.baseUrl,
          priceCurrency: "VND",
          price: this.price,
        },
      }
    }
  },
  methods: {
    ...mapActions(["addToCart", "setStateFromLocal"]),

    async getBookById(id) {
      await BaseRequest.get("book/" + id)
        .then((response) => {
          console.log(response);
          // this.book = response.data;
          this.bookId = response.data.id;
          this.price = response.data.price;
          this.authorName = response.data.author.author_name;
          this.republic = response.data.republic;
          this.year = response.data.year;
          this.categoryId = response.data.category_id;
          this.content = response.data.content;
          this.NXB = response.data.nxb.nxb_name;
          this.bookName = response.data.book_name;
          this.urlImage =
            process.env.VUE_APP_DATABASE_URL + response.data.image.url;
          this.quatity = response.data.quatity;
          this.authorId = response.data.author_id;
          // console.log(
          //   this.bookId,
          //   this.price,
          //   this.author,
          //   this.republic,
          //   this.year,
          //   this.categoryId,
          //   this.content,
          //   this.NXB,
          //   this.bookName,
          //   this.urlImage
          // );
          this.getBookByCategoryId(this.categoryId);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getBookByCategoryId(id) {
      BaseRequest.get("book/action/getBookByCategoryId/" + id + "/" + 4).then(
        (response) => {
          console.log(response);
          this.booksRelate = response.data;
        }
      );
    },
    addBookToCart() {
      const NumberBooksInCartById = this.getBookQuatityInCartById(this.bookId);
      console.log("số sách có trong giỏ: ", NumberBooksInCartById);
      if (NumberBooksInCartById + this.quatityToBuy <= this.quatity) {
        this.addToCart({
          bookId: this.bookId,
          quatity: this.quatityToBuy,
          bookName: this.bookName,
          unitPrice: this.price,
          amount: this.price * this.quatityToBuy,
        });
      } else {
        alert("số sách loại này được phép mua là " + this.quatity);
      }
    },
    increaseQuatity() {
      if (this.quatityToBuy < this.quatity) {
        this.quatityToBuy++;
      }
    },
    decreaseQuatity() {
      if (this.quatityToBuy > 1) {
        this.quatityToBuy--;
      }
    },
  },
}
</script>

