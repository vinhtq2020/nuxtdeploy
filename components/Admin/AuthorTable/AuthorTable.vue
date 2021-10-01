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
            <div class="col-sm-6">
              <h2>Manager<b>Author</b></h2>
            </div>
            <div class="col-sm-6">
              <nuxt-link
                :to="{ path: '/admin/author/create' }"
                class="btn btn-success"
                data-toggle="modal"
                ><i class="material-icons">&#xE147;</i>Add New
                Author</nuxt-link
              >
              <!-- <nuxt-link to="#" class="btn btn-danger" data-toggle="modal"
                ><i class="material-icons">&#xE15c;</i>Delete</nuxt-link
              > -->
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
              <th>id</th>
              <th>author name</th>
              <th>book quatity</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="po in authors" :key="po.id">
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
              <td>{{ po.id }}</td>
              <td>{{ po.author_name }}</td>
              <td>{{ po.book_count }}</td>

              <td>
                <nuxt-link
                  :to="`/admin/author/edit/${po.id}`"
                  class="edit"
                  :id="po.id"
                  ><i class="material-icons">&#xE254;</i></nuxt-link
                >
                <a href="#" class="delete" @click="deleteAuthor(po.id)"
                  ><i class="material-icons">&#xE872;</i></a
                >
              </td>
            </tr>
          </tbody>
        </table>
        <paginate
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
  data() {
    return {
      authors: [],
      currentPage: 1,
      totalPage: 1,
    };
  },
  mounted() {
    this.getAuthors();
  },
  watch: {
    currentPage() {
      this.getAuthors();
    },
  },
  methods: {
    clickCallback(page) {
      // tham số page là page hiện tại
      this.currentPage = page;
    },
    getAuthors() {
      // this.loading = true;
      BaseRequest.get("author?page=" + this.currentPage).then((response) => {
        console.log("getAuthor:", response.data);
        this.authors = response.data.data;
        this.totalPage = response.data.last_page;
        // this.loading = false;
      });
    },
    deleteAuthor(id) {
      BaseRequest.delete("author/" + id)
        .then((response) => {
          console.log(response);
          this.getCategories();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  
};
</script>

<style>

html,
body {
  padding: 0;
  margin: 0;
}
.content {
  padding: 20px;
}
</style>
