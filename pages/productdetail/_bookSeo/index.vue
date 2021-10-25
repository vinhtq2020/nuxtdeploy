<template>
  <div style="background: rgb(250, 250, 250)">
    <script type="application/ld+json" v-html="jsonld"></script>
    <div class="container mt-3">
      <h1 style="font-size: 32px">CHI TIẾT SẢN PHẨM</h1>
      <div class="border rounded pb-4" style="background: white">
        <div class="row">
          <div class="col-5">
            <div class="group-image">
              <div style="width: 400px; height: 400px; background: white">
                <img
                  :src="urlImage"
                  :alt="bookName"
                  srcset=""
                  style="width: 400px; height: 400px"
                />
              </div>
            </div>
          </div>
          <div class="col-7">
            <div>
              <h4 style="font-size: 13px" class="mt-2">
                Tác giả:
                <span
                  ><router-link
                    :to="{
                      name: 'search-page',
                      query: { authorSelect: [authorId] },
                    }"
                    >{{ authorName }}</router-link
                  ></span
                >
              </h4>
              <h5 style="font-size: 24px">
                {{ bookName }}
              </h5>
              <div>
                <div class="d-inline">
                  <b-form-rating
                    style="height: 50%"
                    size="sm"
                    no-border
                    variant="warning"
                    class="mb-2"
                    readonly
                    inline
                    :value="bookRate != null ? bookRate.rate : 0"
                  />
                </div>
                <div class="font-weight-light d-inline">
                  ({{ bookRate != null ? bookRate.vote_number : 0 }} đánh giá)
                </div>
                <div v-if="bookView!=0" class="d-inline font-weight-light"><span class="ml-2 material-icons align-top"> visibility </span> {{bookView}} lượt xem</div>
              </div>
            </div>
            <div class="col-9">
              <div class="border-bottom">
                <div
                  style="background: linear-gradient(100deg,rgb(255, 66, 78),rgb(253, 130, 10));height: 70px;"
                  class="rounded mb-4 p-2 text-light"
                >
                  <h2>{{ parseInt(price) + ' ₫' }}</h2>
                </div>
              </div>
              <div class="m-2">
                <div>Số lượng</div>
                <div v-if="quatity > 0">
                  <button
                    class="btn disabled border"
                    type="button"
                    style="width: 40px; height: 40px; font-weight: bold"
                    @click="decreaseQuatity"
                  >
                    -
                  </button>
                  <input
                    type="tel"
                    class="border text-center"
                    style="
                      height: 40px;
                      padding-bottom: 7px;
                      width: 60px;
                      font-weight: bold;
                    "
                    :value="quatityToBuy"
                    min="1"
                    :max="quatity"
                    readonly
                  />
                  <button
                    class="btn disabled border plus -btn"
                    type="button"
                    style="width: 40px; height: 40px; font-weight: bold"
                    @click="increaseQuatity"
                  >
                    +
                  </button>
                  <div>chỉ còn lại {{ quatity }} sản phẩm</div>
                </div>
                <div v-if="quatity > 0">
                  <div
                    class="btn mt-2 p-3 text-light"
                    style="width: 300px; background: rgb(255, 57, 69)"
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
      </div>
      <div>
        <h3 class="mt-4" style="font-size: 18px">SẢN PHẨM TƯƠNG TỰ</h3>
        <div class="border rounded bg-white">
          <slider :itemShow="4" :parentData="booksRelate" />
        </div>
      </div>
      <div>
        <h3 class="mt-4" style="font-size: 18px">THÔNG TIN CHI TIẾT</h3>
        <div class="rounded">
          <div class="col-8 border" style="background: white">
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
        <h3 class="mt-4" style="font-size: 18px">MÔ TẢ SẢN PHẨM</h3>
        <div>
          <p
            class="col-8 border rounded"
            style="background: white; white-space: pre-wrap"
          >
            {{ content }}
          </p>
        </div>
      </div>
      <div class="mb-4">
        <review-product-detail :data="bookId" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ReviewProductDetail from '~/components/ReviewProductDetail/ReviewProductDetail.vue'
import BaseRequest from '~/core/BaseRequest'
export default {
  components: { ReviewProductDetail },
  layout: 'public',
  async asyncData(context) {
    const response = await new Promise((resolve) => {
      resolve(
        context.$axios.get(
          process.env.VUE_APP_DATABASE_URL +
            'api/book/action/getBookBySeo/' +
            context.params.bookSeo
        )
      )
    })
    return {
      bookId: response.data[0].id,
      price: response.data[0].price,
      authorName: response.data[0].author.author_name,
      republic: response.data[0].republic,
      year: response.data[0].year,
      categoryId: response.data[0].category_id,
      content: response.data[0].content,
      NXB: response.data[0].nxb.nxb_name,
      bookName: response.data[0].book_name,
      urlImage: process.env.VUE_APP_DATABASE_URL + response.data[0].image.url,
      authorId: response.data[0].author_id,
      quatity: response.data[0].quatity,
      urlCurrent:
        process.env.VUE_APP_BASE_URL.slice(0, -1) + context.route.path,
      contentDescription: response.data[0].content.slice(0, 197) + '...',
      bookRate: response.data[0].book_rate,
    }
  },
  data() {
    return {
      booksRelate: [],
      book: [],
      quatityToBuy: 1,
      baseUrl: process.env.VUE_APP_BASE_URL,
      bookView:0,
      jsonld: {},
    }
  },
  head() {
    return {
      title: 'chi tiết sản phẩm',
      meta: [
        {
          property: 'og:url',
          content: this.urlCurrent,
        },
        {
          property: 'og:locale',
          content: 'vi_VN',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: process.env.VUE_APP_BASE_URL,
        },
        {
          property: 'og:type',
          content: 'website',
        },

        { hid: 'og:title', property: 'og:title', content: this.bookName },
        {
          name: 'description',
          content: this.contentDescription,
        },
        {
          property: 'og:description',
          content: this.contentDescription,
        },
        {
          property: 'og:image',
          content: this.urlImage,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:site',
          content: '@',
        },
        {
          name: 'twitter:title',
          content: this.bookName,
        },
        {
          name: 'twitter:description',
          content: this.contentDescription,
        },
        {
          name: 'twitter:img',
          content: this.urlImage,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getBookQuatityInCartById']),
  },

  async mounted() {
    // console.log("process.env.VUE_APP_DATABASE_URL: ",process.env.VUE_APP_DATABASE_URL);
    // ShareThis provides javascript embed code for HTML which doesn't work directly for Single Page Applications like the one created with Vue.js/Nuxt.js.
    // Re-initializing ShareThis on page mount will fix it for Vue.js apps.
    const st = window.__sharethis__
    if (!st) {
      const script = document.createElement('script')

      script.src =
        'https://platform-api.sharethis.com/js/sharethis.js#property=613c94ae46199d00191777b4&product=inline-share-buttons'
      script.async = 'async'
      document.body.appendChild(script)
    } else if (typeof st.initialize === 'function') {
      st.href = window.location.href
      st.initialize()
    }
    if (this.$route.params.bookSeo) {
      // await this.getBookById(this.$route.params.id);
      await this.setStateFromLocal()
      this.jsonld = {
        '@context': this.baseUrl,
        '@type': 'Product',
        name: this.bookName,
        image: this.urlImage,
        description: this.contentDescription,

        offers: {
          '@type': 'Offer',
          url: this.baseUrl,
          priceCurrency: 'VND',
          price: this.price,
        },
      }

      this.getBookByCategoryId(this.categoryId)
    }

    this.updateBookViewByBookId(this.bookId)
  },
  methods: {
    ...mapActions(['addToCart', 'setStateFromLocal']),

    getBookByCategoryId(id) {
      BaseRequest.get('book/action/getBookByCategoryId/' + id + '/' + 4).then(
        (response) => {
          this.booksRelate = response.data
        }
      )
    },
    addBookToCart() {
      const NumberBooksInCartById = this.getBookQuatityInCartById(this.bookId)
      console.log('số sách có trong giỏ: ', NumberBooksInCartById)
      if (NumberBooksInCartById + this.quatityToBuy <= this.quatity) {
        this.addToCart({
          bookId: this.bookId,
          quatity: this.quatityToBuy,
          bookName: this.bookName,
          unitPrice: this.price,
          amount: this.price * this.quatityToBuy,
        })
      } else {
        alert('số sách loại này được phép mua là ' + this.quatity)
      }
    },
    increaseQuatity() {
      if (this.quatityToBuy < this.quatity) {
        this.quatityToBuy++
      }
    },
    decreaseQuatity() {
      if (this.quatityToBuy > 1) {
        this.quatityToBuy--
      }
    },
    getBookViewByBookId(bookId){
      BaseRequest.get(`bookview/action/getBookViewById/${bookId}`).then((response)=>{
        this.bookView = response.data;
        console.log(response);
      })
    },
    updateBookViewByBookId(bookId){
      BaseRequest.put(`bookview/${bookId}`).then((response)=>{
        console.log(response);
        this.getBookViewByBookId(bookId);
      }).catch((error)=>{
        console.log(error);
      })
    }
  },
}
</script>
