<template>
  <hooper
    :infiniteScroll="true"
    :itemsToShow="itemShow"
    :autoPlay="true"
    :playSpeed="2000"
    style="height: 400px"
    class="mt-4"
  >
    <slide v-for="data in parentData" :key="data.id">
      <div>
        <nuxt-link
          :to="{
            path: `/productdetail/${data.book_seo}`,
          }"
          class="text-decoration-none"
        >
          <div class="card product-book" style="border: none">
            <img :src="apiUrl + data.image.url" :alt="data.book_name" class="card-img-top"/>
            <div class="card-body">
              <div class="text-dark text-center" style="font-size:14px;font-weight:300;overflow:hidden;height: 40px;text-overflow: ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;">
                {{ data.book_name }}
              </div>
               <div class="text-center">
                <b-form-rating style="height: 50%" size="sm" no-border variant="warning" class="mb-2" readonly inline :value="data.book_rate != null ? data.book_rate.rate : 0"/>
              </div>
              <p class="text-dark text-center" style="font-size: 16px"><b>{{ parseInt(data.price) }} đ</b></p>
             
            </div>
          </div>
        </nuxt-link>
      </div>
    </slide>

    <hooper-navigation slot="hooper-addons" />
  </hooper>
</template>

<script>
import { Hooper, Slide, Navigation } from 'hooper'
import 'hooper/dist/hooper.css'
export default {
  props: ['parentData', 'itemShow'],
  data() {
    return { apiUrl: process.env.VUE_APP_DATABASE_URL }
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation: Navigation,
  },
}
</script>

<style>
.product-book:hover {
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>
