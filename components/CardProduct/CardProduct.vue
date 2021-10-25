<template>
  <div>
    <nuxt-link
      :to="{
        path: `/productdetail/${data.book_seo}`,
       
      }"
      class="text-decoration-none"
    >
      <div class="card product-book" style="border:none;">
        <img
          :src="apiUrl + data.image.url"
          :alt="data.book_name"
          class="card-img-top"
        />

        <div class="card-body">
          <div
            class="text-dark text-center"
            style="font-size:14px;font-weight:300; overflow: hidden;height:40px;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2; 
                  -webkit-box-orient: vertical;
                  "
          >
            {{ data.book_name }}
          </div>
          <div class="text-center">
            <b-form-rating
                style="height:50%"
                size="sm"
                no-border
                variant="warning"
                class="mb-2"
                readonly
                inline
                :value="data.book_rate!=null?data.book_rate.rate:0"
              />
          </div>
          <p class="card-text text-dark text-center" style="font-size:16px">
            <b>{{ parseInt(data.price) }} đ</b>
          </p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["data"],

  data() {
    return {
      apiUrl: process.env.VUE_APP_DATABASE_URL,
    };
  },
};
</script>
