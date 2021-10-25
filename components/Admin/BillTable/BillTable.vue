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
              <h2>Manager<b>Bill</b></h2>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                <span class="custom-checkbox">
                  <input type="checkbox" id="selectAll" />
                  <label for="selectAll"></label>
                </span>
              </th>
              <th style="width:10%">id Bill</th>
              <th>username</th>
              <th>email</th>
              <th>create at</th>
              <th>total</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="po in bills" :key="po.id" >
              <td>
                <span>
                  <input
                    type="checkbox"
                    name="option[]"
                    id="checkbox1"
                    value="1"
                  />
                  <label for="checkbox1"></label>
                </span>
              </td>
              <td><nuxt-link :to="{path:`/admin/billdetail/${po.id}`}">  {{po.id}}</nuxt-link></td>
              <td>{{ po.user.name }}</td>
              <td>{{ po.user.email}}</td>
              <td>{{po.created_at.getHours()}}:{{po.created_at.getMinutes()}} {{po.created_at.getDate()}}/{{po.created_at.getMonth()+1}}/{{po.created_at.getFullYear()}}</td>
              <td>{{ po.total }}</td>

            </tr>
          </tbody>
        </table>
        <!-- <paginate
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
        </paginate> -->
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/core/BaseRequest";

export default {
  props: ["pageData"],
  mounted() {
    this.getBill();
  },
  data() {
    return {
      bills: [],
      currentPage: 1,
      totalPage: 1,

        rows: 90,
      perPage: 12,
    };
  },
  watch: {
    currentPage() {
      this.getBill();
    },
  },
  methods: {
    clickCallback(page) {
      // tham số page là page hiện tại
      this.currentPage = page;
    },

    getBill() {
      BaseRequest.get("bill?page=" + this.currentPage)
        .then((result) => {
          console.log(result);
          this.bills = result.data.data;
          this.bills.forEach(element => {
            element.created_at = new Date(element.created_at);
          });
          if (this.pageData) {
            this.totalPage = this.pageData;
          } else {
            this.totalPage = result.data.last_page;
            this.perPage = result.data.per_page;
            this.rows = result.data.total;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

};
</script>