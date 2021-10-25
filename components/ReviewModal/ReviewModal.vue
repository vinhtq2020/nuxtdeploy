<template>
  <transition name="fade-shrink-in" appear>
    <div v-show="show">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
              <div>
                <div>
                  <button
                    type="button"
                    class="close p-2"
                    data-dismiss="modal"
                    aria-label="Close"
                    @click="close()"
                  >
                    <span aria-hidden="true" style="font-size: 20px"
                      >&times;</span
                    >
                  </button>
                </div>
                <div class="p-4">
                    <h4 class="text-center">NHẬN XÉT SẢN PHẨM</h4>
                  <form @submit.prevent="submitReview()">
                      
                    <div class=" mx-auto" style="width:50%">
                      <b-form-rating
                        no-border
                        variant="warning"
                        class="mb-2"
                        size="lg"
                        v-model="rate"
                      ></b-form-rating>
                    </div>

                    <div class="form-group">
                      <textarea
                        type="text"
                        class="form-control"
                        placeholder="Viết nhận xét"
                        v-model.trim="content"
                        minlength="1"
                        maxlength="1000"
                        required
                        rows="8"
                        cols="50"
                      >
                      </textarea>
                    </div>
                    <div class="form-group" v-if="isFail">
                      <span class="text-danger" style="font-size: 80%">{{
                        errorMessage
                      }}</span>
                    </div>
                    <div class="form-group">
                      <input
                        type="submit"
                        class="btn btn-block btn-info text-light"
                        value="Xác nhận"
                        style="font-size: 20px"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseRequest from "@/core/BaseRequest.js";

export default {
  props: ['show','userId','bookId'],
  methods: {
    close() {
      this.$emit('close')
    },
    async submitReview() {
      
      await BaseRequest.post('review',{
        user_id:this.userId,
        book_id:this.bookId,
        content:this.content,
        rate:this.rate,

      }).then((response)=>{
        console.log('review đã tạo: ',response);
      }).catch((error)=>{
        console.log(error);
      })
      await BaseRequest.put('bookrate/'+this.bookId,{
          rate_add: this.rate,
        }).then((response)=>{
          console.log(response);
                alert('thêm nhận xét thành công')

        }).catch((error)=>{
          console.log(error);
        })
      this.close();
    },
  },

  data() {
    return {
      rate:1,
      content: '',
      isFail: false,
      errorMatchedPass: '',
      errorMessage: '',
    }
  },
}
</script>

<style>
/* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
} */

/* clear hr with modal boostrap */

/* .modal-header {border-bottom: 0 none;} .modal-footer {border-top: 0 none;} */
</style>
