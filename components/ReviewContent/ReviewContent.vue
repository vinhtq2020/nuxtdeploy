<template>
  <div>
    <div v-if="data != null" class="row">
      <div class="col-3" v-for="item in data" :key="item.book_id">
      <div class="bg-light m-2">
        <div class="card row text-center">
          <div>
            <div class="card product-book" style="border: none">
              <nuxt-link
                :to="{
                  path: `/productdetail/${item.book_seo}`,
                }"
                class="text-decoration-none"
              >
                <img
                  :src="apiUrl + item.url"
                  :alt="data.book_name"
                  class="card-img-top"
                />
              </nuxt-link>

              <div class="card-body">
                <div
                  class="card-title text-dark"
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
                  {{ item.book_name }}
                </div>
                <div class="btn btn-warning btn-block" style="font-size: 14px" @click="openModal(item.book_id)">
                  Nhận xét
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
    <review-modal :show="show" @close="closeModal" :user-id="userId" :book-id="bookId"/>
  </div>
</template>
<script>
import BaseRequest from '@/core/BaseRequest'
import ReviewModal from '@/components/ReviewModal/ReviewModal.vue'
export default {
  components:{ReviewModal},
  async mounted() {
    await this.getInfoUser()
    await this.getBookNeedReview()
  },
  data() {
    return {
      data: null,
      userId: null,
      bookId:null,

      apiUrl: process.env.VUE_APP_DATABASE_URL,
      show:false,
    }
  },

  methods: {
    openModal(bookId){
      this.show = true
      this.bookId = bookId
    },
    closeModal(){
      this.show = false
      this.getBookNeedReview()
      
    },
    async getInfoUser() {
      await BaseRequest.get('user')
        .then((response) => {
          this.userId = response.data.id
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getBookNeedReview() {
      await BaseRequest.get('book/action/getBookBoughtByIdUser/' + this.userId)
        .then((response) => {
          console.log(response)
          this.data = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
