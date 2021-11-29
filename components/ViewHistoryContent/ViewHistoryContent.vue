<template>
  <div>
    <div>
      <div class="bg-light">
        <div class="card" style="min-height: 100vh">
          <div
            class="font-weight-bold"
            style="font-size: 30px; border-bottom: 3px solid #6060a9"
          >
            Sách đã xem
          </div>
          <div v-if="books != null">
            <div class="row">
              <div class="col-3" v-for="item in books" :key="item.id">
                <nuxt-link
                  :to="{
                    path: `/productdetail/${item.book.book_seo}`,
                  }"
                  class="text-decoration-none"
                >
                  <div class="card product-book m-2" style="border: none">
                    <img
                      :src="apiUrl + item.image.url"
                      :alt="item.book.book_name"
                      class="card-img-top"
                    />

                    <div class="card-body">
                      <div
                        class="text-dark text-center"
                        style="
                          font-size: 14px;
                          font-weight: 300;
                          overflow: hidden;
                          height: 40px;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                          -webkit-line-clamp: 2;
                          -webkit-box-orient: vertical;
                        "
                      >
                        {{ item.book.book_name }}
                      </div>

                      <p
                        class="card-text text-dark text-center"
                        style="font-size: 16px"
                      >
                        <b>{{ parseInt(item.book.price) }} đ</b>
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div v-else class="text-center">Bạn chưa xem sản phẩm nào</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from '@/core/BaseRequest'
export default {
  async mounted() {
    await this.getInfo()
    await this.getBookUserViewByUserId(this.userId)
  },
  data() {
    return {
      userId: null,
      books: null,
      apiUrl: process.env.VUE_APP_DATABASE_URL,
    }
  },
  methods: {
    async getInfo() {
      await BaseRequest.get('user').then((response) => {
        this.userId = response.data.id
      })
    },
    async getBookUserViewByUserId(id) {
      await BaseRequest.get(
        `bookuserview/action/getBookUserViewByUserId/${id}`
      ).then((response) => {
        this.books = response.data
      })
    },
  },
}
</script>
