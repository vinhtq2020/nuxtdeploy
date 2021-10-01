<template>
  <div class="border">
    <div class="border-bottom p-4 ">
      <h4 style="font-size:13px">DANH MỤC SẢN PHẨM</h4>
      <ul class="d-flex flex-column">
        <li v-for="cate in categories" :key="cate.id" style="list-style:none">
          <router-link
            :to="{ path:'/searchpage', params: { categoryId: cate.id } }"
            class="text-decoration-none text-dark"
            style="font-size:14px"
          >
            {{ cate.category_name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="border-bottom p-4">
      <h4 style="font-size:13px" class="mt-2">GIÁ</h4>
      <ul class="d-flex flex-column" style="list-style:none; ">
        <li>
          <div
            class="badge px-2 m-1"
            style="background: rgb(238, 238, 238);font-weight:500; line-height:20px;cursor:pointer;border-radius:100px"
            @click="setPrice(0, 60000)"
          >
            Dưới 60000
          </div>
        </li>
        <li>
          <div
            class="badge px-2 m-1"
            style="background: rgb(238, 238, 238);font-weight:500; line-height:20px;cursor:pointer;border-radius:100px"
            @click="setPrice(60000, 140000)"
          >
            Từ 60000 đến 140000
          </div>
        </li>
        <li>
          <div
            class="badge px-2 m-1"
            style="background: rgb(238, 238, 238);font-weight:500; line-height:20px;cursor:pointer;border-radius:100px"
            @click="setPrice(140000, 320000)"
          >
            Từ 140000 đến 320000
          </div>
        </li>
        <li>
          <div
            class="badge px-2 m-1"
            style="background: rgb(238, 238, 238);font-weight:500; line-height:20px;cursor:pointer;border-radius:100px"
            @click="setPrice(320000)"
          >
            Trên 320000
          </div>
        </li>
      </ul>
    </div>
    <div class="border-bottom p-4">
      <h4 style="font-size:13px" class="mt-2">TÁC GIẢ</h4>
      <ul class="d-flex flex-column" style="list-style:none; ">
        <li
          v-for="author in authors"
          :key="author.id"
          style="font-size:13px;line-height:20px;font-weight:400"
        >
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :value="author.id"
              v-model="authorSelect"
              :id="author.id"
              @change="search"
            />
            <label class="form-check-label" :for="author.author_name">
              {{ author.author_name }}
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div class="border-bottom p-4">
      <h4 style="font-size:13px" class="mt-2">NHÀ XUẤT BẢN</h4>
      <ul class="d-flex flex-column" style="list-style:none;">
        <li
          v-for="nxb in nxbs"
          :key="nxb.id"
          style="font-size:13px;line-height:20px;font-weight:400"
        >
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="nxbSelect"
              :id="nxb.nxb_name"
              :value="nxb.id"
              @change="search"
            />
            <label class="form-check-label" :for="nxb.nxb_name">
              {{ nxb.nxb_name }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import BaseRequest from "@/core/BaseRequest";

export default {
  mounted() {
    console.log("route: ",this.$route)
    if(this.$route.params.categoryId === null && this.$route.name ==="searchpage" && Object.keys(this.$route.query).length===0){
      this.$router.push({name:'user/home'})
    }else{
    this.getCategories();
    this.getAuthors();
    this.getNxbs();

    setInterval(() => {
      // this.authorSelect = this.authorSelectSearch;
      // this.nxbSelect = this.nxbSelectSearch;
      if (this.$route.query.authorSelect) {
        this.authorSelect = this.$route.query.authorSelect;
      }
      if (this.$route.query.nxbSelect) {
        this.nxbSelect = this.$route.query.nxbSelect;
        
      }
      if (this.$route.query.min) {
        this.min = this.$route.query.min;
      }
      if (this.$route.query.max) {
        this.max = this.$route.query.max;
      }
    }, 2000);
    }
  },
  data() {
    return {
      categories: [],
      authors: [],
      nxbs: [],
      authorSelect: [],
      nxbSelect: [],

      min: null,
      max: null,
    };
  },
  methods: {
    getCategories() {
      // this.loading = true;
      BaseRequest.get("category/action/getcategories").then((response) => {
        console.log("getCategories:", response.data);
        this.categories = response.data;
        // this.loading = false;
      });
    },

    getAuthors() {
      BaseRequest.get("author/action/getAuthorsByNumber/10").then((result) => {
        this.authors = result.data;
        console.log(result);
      });
    },
    getNxbs() {
      BaseRequest.get("nxb/action/getNxbs")
        .then((result) => {
          this.nxbs = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    search() {
      let queryTmp = {};
      if(this.authorSelect.length!==0)queryTmp = {...queryTmp,authorSelect: this.authorSelect}
      if(this.nxbSelect.length!==0)queryTmp={...queryTmp,nxbSelect:this.nxbSelect}
      if(this.min!=null){
        queryTmp={...queryTmp,min: this.min}
      }
      if(this.max!=null){
        queryTmp={...queryTmp,max: this.max}
      }
        
      
      if (this.$route.query.q){
        queryTmp = { ...queryTmp, q: this.$route.query.q };
        }
        console.log('tmp',queryTmp);
      let url = {
        path: "/searchpage",
        query: queryTmp,
      };
    
      if (this.$route.params.categoryId) {
        url = { ...url, params: { categoryId: this.$route.params.categoryId } };
      }
        this.$router.push(url);
       

    },
    setPrice(min, max) {
      this.min = min;
      this.max = max;
      this.search();
    },
  },
  computed: {
    // ...mapGetters(['authorSelectSearch','nxbSelectSearch']),
  },
};
</script>

