<template>
  <div v-if="reviews != null" class="bg-white">
    <div class="pt-2 pl-2">
      <h3 style="font-size: 18px">Đánh Giá - Nhận Xét Từ Khách Hàng</h3>
    </div>
    <div class="rounded">
      <div class="border-bottom">
        <div class="row">
            <div class="col-1 text-right font-weight-bold p-0 " style="font-size:40px">
                {{rate}}
            </div>
          <div class="col-2 p-0">
            <div style="height:50%">
                <b-form-rating
              size="lg"
              no-border
              variant="warning"
              class="mb-2"
              readonly
              inline
              :value="rate"
            /></div>
            <div class="font-weight-light pl-4">{{voteNumber}} nhận xét</div>
          </div>
          <div class="col-8"></div>
        </div>
      </div>
      <div v-for="item in reviews" :key="item.id">
        <div class="border-bottom">
          <div class="row my-4">
            <div class="col-4 text-center" style="font-weight: 500">
              {{ item.user.name }}
            </div>
            <div class="col-8">
              <div>
                <div>
                  <b-form-rating
                    size="sm"
                    no-border
                    variant="warning"
                    class="mb-2"
                    readonly
                    inline
                    :value="item.rate"
                  />
                  <b style="font-weight: 500"
                    >{{
                      item.rate == 3
                        ? 'Bình thường'
                        : item.rate == 2
                        ? 'Không hài lòng'
                        : item.rate == 1
                        ? 'Cực kì không hài lòng'
                        : item.rate == 4
                        ? 'Hài lòng'
                        : 'Cực kì hài lòng'
                    }}
                  </b>
                </div>
                <div class="text-success ml-2" style="font-size: 13px; font-weight:500">
                  <div>
                    <i class="material-icons" style="font-size: 15px; font-weight:400"
                      >check_circle</i
                    >
                    Đã mua hàng
                  </div>
                </div>
                 <div class="ml-2 mt-3" style="font-size:15px;font-weight:400">{{item.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from '~/core/BaseRequest'

export default {
  props: ['data'],
    mounted() {
    this.getReviewsByBookId(this.data);
    this.getBookRate(this.data);
  },
  data() {
    return {
      reviews: null,
      currentPage: 1,
      rate:0,
      voteNumber:0,
    }
  },
  methods: {
    async getReviewsByBookId(id) {
      await BaseRequest.get(
        `review/action/getReviewBookPaginateById/${id}?page=${this.currentPage}`
      )
        .then((response) => {
          this.reviews = response.data.data
          console.log(this.reviews)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getBookRate(id){
        await BaseRequest.get(`bookrate/${id}`).then((res)=>{
            this.rate = res.data.rate;
            this.voteNumber = res.data.vote_number;
        }).catch((err)=>{
            console.log(err);
        })
    }
  },
}
</script>
