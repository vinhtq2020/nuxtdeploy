<template>
  <div class="border">
    <div class="search-summary">
      <div class="title d-flex justify-content-start mt-2 border-bottom">
        <h1 class="mr-2">{{ keyWord }}:</h1>
        <h4>
          <span>{{ searchResult }} </span>kết quả
        </h4>
      </div>
    </div>
    <div class="row mt-2">
      <card-product
        class="col-3"
        v-for="book in books"
        :key="book.id"
        :data="book"
      />
    </div>
    <div class="mt-2">
      <paginate
      :page-range="1"
        :page-count="totalPage"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :next-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-link-class="'page-link'"
        :active-class="'active'"
      >
      </paginate>
    </div>
  </div>
</template>

<script>

import queryString from 'query-string'
import BaseRequest from "@/core/BaseRequest";
import CardProduct from "@/components/CardProduct/CardProduct.vue";
export default {
  mounted() {
    if (this.$route.query['authorSelect[]'] !== null) {
        this.authorSelect = this.authorSelect.concat(this.$route.query['authorSelect[]']);
    }
     if (this.$route.query['nxbSelect[]']) {
        this.authorSelect=this.authorSelect.concat(this.$route.query['nxbSelect[]']);
    }
    if (this.$route.query.min) {
      this.min = this.$route.query.min;
    }
    if (this.$route.query.max) {
      this.max = this.$route.query.max;
    }
    if (this.$route.params.categoryId) {
      this.categoryId = this.$route.params.categoryId;
    }
    if (this.$route.query.q) {
      this.q = this.$route.query.q;
    }
    setTimeout(this.getBookToSearch(),0);
    if (this.q !== "") {
      this.keyWord = this.q;
    } else if (this.$route.params.categoryId) {
      BaseRequest.get("category/" + this.$route.params.categoryId).then(
        (response) => {
          this.keyWord = response.data.category_name;
        }
      );
    }
  },
  components: {
    CardProduct,
    
  },
  data() {
    return {
      books: [],
      authorSelect: [],
      nxbSelect: [],
      min: null,
      max: null,
      categoryId: null,
      q: "",

      searchResult: 0,
      keyWord: "",
      currentPage: 1,
      totalPage: 1,
    };
  },
  watch: {
    currentPage() {
      this.getBookToSearch();
    },
  },
  methods: {
    clickCallback(page) {
      // tham số page là page hiện tại
      this.currentPage = page;
    },
    getBookToSearch() {
      let query = {};
      if (this.authorSelect.length !== 0) {
        query = { ...query, author_ids: this.authorSelect };
      }
      if (this.nxbSelect.length !== 0) {
        query = { ...query, nxb_ids: this.nxbSelect };
      }
      if (this.min) {
        query = { ...query, min: this.min };
      }
      if (this.max) {
        query = { ...query, max: this.max };
      }
      if (this.categoryId) {
        query = { ...query, category_id: this.categoryId };
      }
      if (this.q) {
        query = { ...query, book_name: this.q };
      }

      const stringified = queryString.  stringify(query, {
        arrayFormat: "bracket",
      });
      console.log("query before:", query);
      console.log("query: ", stringified);
      BaseRequest.get(
        "book/action/getBookToSearch?" + stringified + "&page=" + this.currentPage
      ).then((response) => {
        console.log("books to search", response.data);
        this.books = response.data.bookData.data;
        this.searchResult = response.data.bookData.total;
        this.totalPage = response.data.bookData.last_page;
        console.log('totalPage',this.totalPage);
      });
    },
  },
};
</script>

<style>
.title h1 {
  font-weight: 300;
  font-size: 24px !important;
  display: inline;
}
.title h4 {
  font-weight: 300;
  font-size: 22px !important;
  color: rgb(137, 137, 137);
  display: inline;
  margin-top: 1px;
}
</style>
