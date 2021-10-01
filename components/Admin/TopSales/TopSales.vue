<template>
  <div>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-6">
              <h2>Top 5 Sale in <b>Month</b></h2>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <!-- <th>
                <span class="custom-checkbox">
                  <input type="checkbox" id="selectAll" />
                  <label for="selectAll"></label>
                </span>
              </th> -->
              <th >id book</th>
              <th>Book name</th>
              <th>number of purchases</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="po in books" :key="po.id">
              <!-- <td>
                <span>
                  <input
                    type="checkbox"
                    name="option[]"
                    id="checkbox1"
                    value="1"
                  />
                  <label for="checkbox1"></label>
                </span>
              </td> -->
              <td>{{ po.id }}</td>
              <td>{{ po.book_name }}</td>
              <td>{{ po.bill_detail_count }}</td>
              

              
            </tr>
          </tbody>
        </table>
        <paginate
        v-if="numberColumn"
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
  </div>
</template>

<script>
import BaseRequest from "@/core/BaseRequest";

export default {
  props: ["numberColumn"],
  mounted() {
    this.getTopSaleBook(5);
  },
  data() {
    return {
      books: [],
      currentPage: 1,
      totalPage: 1,
    };
  },
  watch: {
    currentPage() {
      this.getBill();
    },
  },
  methods: {
    clickCallback(page){
      // tham số page là page hiện tại
      this.currentPage = page;
    },
    getTopSaleBook(number) {
      BaseRequest.get("book/action/getBookBestSale/" + number)
        .then((result) => {
          console.log('book sale',result.data);
          this.books = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

};
</script>
