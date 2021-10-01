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
              <h2>Manager<b>book</b></h2>
            </div>
            <div class="col-sm-6">
              <nuxt-link
                :to="{ path: '/admin/book/create' }"
                class="btn btn-success"
                data-toggle="modal"
                ><i class="material-icons">&#xE147;</i>Add New Book</nuxt-link
              >
              <!-- <nuxt-link to="#" class="btn btn-danger" data-toggle="modal"
                ><i class="material-icons">&#xE15c;</i>Delete</nuxt-link
              > -->
            </div>
          </div>
        </div>
        <div class="table-responsive">
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
                <th width="200px">book name</th>
                <th>image</th>
                <th>category</th>
                <th>price</th>
                <th>quantity</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="po in books" :key="po.id">
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
                <td>{{ po.book_name }}</td>
                <td>
                  <img
                    :src="apiUrl+po.image.url"
                    alt=""
                    width="50px"
                  />
                </td>
                <td>{{ po.category.category_name }}</td>
                <td>{{ parseInt(po.price) }}</td>
                <td>{{ po.quatity }}</td>

                <td>
                  <nuxt-link
                    :to="`/admin/book/edit/${po.id}`"
                    class="edit"
                    :id="po.id"
                    ><i class="material-icons">&#xE254;</i></nuxt-link
                  >
                  <a href="#" class="delete" @click="deleteBook(po.id)"
                    ><i class="material-icons">&#xE872;</i></a
                  >
                  <nuxt-link :to="`/admin/book/bookadded/${po.id}`" class="add-quatity"
                    ><i class="material-icons">&#xE148;</i></nuxt-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
import BaseRequest from "@/core/BaseRequest.js";

export default {
  mounted() {
    this.getBooks();
  },
  data() {
    return {
      bookImage: [],
      books: [],
      currentPage: 1,
      totalPage: 1,
      apiUrl:process.env.VUE_APP_DATABASE_URL
    };
  },
  watch: {
    currentPage() {
      this.getBooks();
    },
  },
  methods: {
    clickCallback(page) {
      // tham số page là page hiện tại
      this.currentPage = page;
    },
    getBooks() {
      BaseRequest.get("book?page=" + this.currentPage).then((response) => {
        console.log("getBooks:", response.data);
        this.books = response.data.data;
        this.totalPage = response.data.last_page;
      });
    },
    deleteBook(id){
      console.log('delete '+id);
      BaseRequest.delete("book/"+id).then((result) => {
        console.log("book delete",result);
        BaseRequest.delete("image/"+id).then((response) => {
          console.log("image delete", response);
          this.getBooks();
        }).catch((error) => {
          console.log(error);          
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  },

};
</script>