<template>
 <div class="p-4 col-10 mx-auto">
          <div class="card ">
            <div class="card-header text-center"></div>
            <div class="card-body">
              <form @submit.prevent="action()">
                <div class="form-group mx-auto row">
                  <label for="book_name" class="col-form-label col-2"
                    >Tên sách (<span class="text-danger">*</span>)</label
                  >
                  <div class="col-md-7">
                    <input
                      type="text"
                      name="book_name"
                      v-model.trim="$v.bookName.$model"
                      :class="{
                        'is-invalid': $v.bookName.$error,
                        'is-valid': !$v.bookName.$invalid,
                        'form-control': true,
                      }"
                    />
                    <div class="valid-feedback">book name is valid</div>
                    <div class="invalid-feedback" v-if="!$v.bookName.required">
                      book name must be required
                    </div>
                    <div class="invalid-feedback" v-if="!$v.bookName.maxLength">
                      book name have most
                      {{ $v.bookName.$params.maxLength.max }} letters
                    </div>
                  </div>
                </div>
                <div class="form-group mx-auto row">
                  <label for="author" class="col-form-label col-2"
                    >Mô tả sản phẩm:</label
                  >
                  <div class="col-md-7">
                    <textarea
                      type="text"
                      name="content"
                      v-model.trim="content"
                      :class="{
                        'form-control': true,
                      }"
                    >
                    </textarea>
                  </div>
                </div>
                <div class="form-group mx-auto row">
                  <label for="categories" class="col-form-label col-2"
                    >Danh mục (<span class="text-danger">*</span>):
                  </label>
                  <div class="col-md-7">
                    <select
                      v-model="$v.categorySelect.$model"
                      name="categories"
                      class="form-control"
                      :class="{
                        'is-invalid': $v.categorySelect.$error,
                        'is-valid': !$v.categorySelect.$invalid,
                      }"
                    >
                      <option value="" disabled> please select one </option>
                      <option
                        v-for="option in categoryList"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.category_name }}
                      </option>
                    </select>
                    <div class="valid-feedback">category is valid</div>
                    <div
                      class="invalid-feedback"
                      v-if="!$v.categorySelect.required"
                    >
                      category must be required
                    </div>
                  </div>
                </div>
                <div class="form-group mx-auto row">
                  <label for="authors" class="col-form-label col-2"
                    >Tác giả (<span class="text-danger">*</span>):
                  </label>
                  <div class="col-md-7">
                    <select
                      v-model="$v.authorSelect.$model"
                      name="authors"
                      class="form-control"
                      :class="{
                        'is-invalid': $v.authorSelect.$error,
                        'is-valid': !$v.authorSelect.$invalid,
                      }"
                    >
                      <option value="" disabled> please select one </option>
                      <option
                        v-for="option in authorList"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.author_name }}
                      </option>
                    </select>
                    <div class="valid-feedback">author is valid</div>
                    <div
                      class="invalid-feedback"
                      v-if="!$v.authorSelect.required"
                    >
                      category must be required
                    </div>
                  </div>

                  <!-- <button
            type="button"
            data-target="#myModal"
            data-toggle="modal"
            @click="showModal = true"
            class="btn btn-outline-primary btn-sm"
          >
            thêm tác giả
          </button> -->
                </div>
                <div class="form-group mx-auto row">
                  <label for="author" class="col-form-label col-2"
                    >Nhà xuất bản:</label
                  >
                  <div class="col-md-7">
                    <!-- <input
                      type="text"
                      name="NXB"
                      v-model.trim="NXB"
                      :class="{
                        'form-control': true,
                      }"
                    /> -->
                  <select
                      v-model="NXB"
                      name="authors"
                      class="form-control"
                      
                    >
                      <option value="" disabled> please select one </option>
                      <option
                        v-for="option in nxbList"
                        :value="option.id"
                        :key="option.id"
                      >
                        {{ option.nxb_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group mx-auto row">
                  <label for="republic" class="col-form-label col-2"
                    >Tái bản lần thứ:</label
                  >
                  <div class="col-md-7">
                    <input
                      type="text"
                      name="republic"
                      v-model.trim="$v.republic.$model"
                      :class="{
                        'is-invalid': $v.republic.$error,
                        'form-control': true,
                      }"
                    />
                    <div class="invalid-feedback" v-if="!$v.republic.minValue">
                      republic have minimum value is 1
                    </div>
                    <div class="invalid-feedback" v-if="!$v.republic.integer">
                      republic must be integer
                    </div>
                  </div>
                </div>

                <div class="form-group mx-auto row">
                  <label for="year" class="col-form-label col-2"
                    >năm xuất bản:</label
                  >
                  <div class="col-md-7">
                    <input
                      type="number"
                      name="year"
                      v-model.trim="$v.year.$model"
                      :class="{
                        'is-invalid': $v.year.$error,
                        'form-control': true,
                      }"
                    />

                    <div class="invalid-feedback" v-if="!$v.year.integer">
                      year must be integer
                    </div>
                    <div class="invalid-feedback" v-if="!$v.republic.minValue">
                      year have minimum value is 1
                    </div>
                  </div>
                </div>

                <div class="form-group mx-auto row">
                  <label for="price" class="col-form-label col-2"
                    >giá (VNĐ) (<span class="text-danger">*</span>):
                  </label>
                  <div class="col-md-7">
                    <input
                      type="number"
                      name="price"
                      v-model.trim="$v.price.$model"
                      :class="{
                        'is-invalid': $v.price.$error,
                        'is-valid': !$v.price.$invalid,
                        'form-control': true,
                      }"
                    />
                    <div class="valid-feedback">price is valid</div>
                    <div class="invalid-feedback" v-if="!$v.price.required">
                      price must be required
                    </div>
                    <div class="invalid-feedback" v-if="!$v.price.decimal">
                      price must be integer
                    </div>
                    <div class="invalid-feedback" v-if="!$v.price.minValue">
                      price have minimum value is 1
                    </div>
                  </div>
                </div>
                <div class="form-group mx-auto row">
                  <label for="price" class="col-form-label col-2"
                    >Hình sách (<span class="text-danger">*</span>):</label
                  >
                  <div class="col-md-7">
                    <input
                      type="file"
                      name="price"
                      id="file"
                      ref="file"
                      @change="handleChangeFileInput"
                    />
                    <div class="valid-feedback">price is valid</div>
                  </div>
                </div>
                <button class="btn btn-danger btn-block" type="submit">
                  <span class="spinner-border" v-if="loading"></span>CREATE
                </button>
              </form>
            </div>
          </div>
        </div>
</template>

<script>
import {
  required,
  maxLength,
  minValue,
  integer,
  decimal,
} from "vuelidate/lib/validators";
import BaseRequest from "@/core/BaseRequest";
// import $ from "jquery";
export default {
  mounted() {
    this.checkLoggedIn();

    this.getAuthors();

    this.getCategories();

    this.getNxbList();
    if (this.$route.params.id) {
      this.getBook(this.$route.params.id);
    } else {
      // this.$router.push({ name: "category" });
    }
  },
  layout:'admin',
  data() {
    return {
      id: this.$route.params.id,
      bookName: "",
      content: "",

      loading: false,

      bookId: 0,

      categoryList: [],
      authorList: [],
      nxbList: [],
      showModal: false,
      authorName: "",

      categorySelect: "",
      authorSelect: "",
      NXB: "",
      republic: null,
      year: null,
      price: null,

      file: null,
    };
  },
  validations: {
    bookName: {
      required,
      maxLength: maxLength(100),
    },

    categorySelect: {
      required,
    },
    authorSelect: {
      required,
    },

    republic: {
      minValue: minValue(1),
      integer,
    },
    year: {
      integer,
      minValue: minValue(0),
    },
    price: {
      required,
      decimal,
      minValue: minValue(0),
    },
  },
  methods: {
    checkLoggedIn() {
      BaseRequest.get("user")
        .then(function(response) {
          if (response.data.role_id === 2) {
            this.$router.push({ path:"/" });
          }
        })
        .catch(() => {
          // phải dùng arrow function thì nó mới hiêu this.$router 
          this.$router.push({ path:"/"  });
        });
    },
    getCategories() {
      // this.loading = true;
      BaseRequest.get("category/action/getcategories").then((response) => {
        console.log("getCategories:", response.data);
        this.categoryList = response.data;
        // this.loading = false;
      });
    },
    getAuthors() {
      // this.loading = true;
      BaseRequest.get("author/action/getauthors").then((response) => {
        console.log("get Authors:", response.data);
        this.authorList = response.data;
        // this.loading = false;
      });
    },
    getNxbList() {
      BaseRequest.get("nxb/action/getNxbs")
        .then((result) => {
          this.nxbList = result.data;
           console.log("nxbList: ", result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createBook() {
      console.log("in createbook");
      this.loading = true;
      this.$v.$touch();

      if (this.$v.$invalid && !this.file) {
        console.log(this.$v.$invalid);
        this.loading = false;
      } else {
        BaseRequest.post("book", {
          book_name: this.bookName,
          category_id: this.categorySelect,
          content: this.content,
          nxb_id: this.NXB,
          author_id: this.authorSelect,
          republic: this.republic,
          year: this.year,
          price: this.price,
        })
          .then((response) => {
            const form = new FormData();
            form.append("file", this.file);
            form.append("book_id", response.data.id);

            console.log("id: ", response.data.id);
            console.log("id: ", response.data);
            console.log(form);
            BaseRequest.postImage("image", form)
              .then((response2) => {
                console.log(response2);
                alert("tạo sách thành công");
                this.loading = false;
                console.log(response2);
                this.$router.push({ path: "/admin/book" });
              })
              .catch((error) => {
                console.log(error);
                this.loading = false;
              });
          })
          .catch((errors) => {
            console.log(errors);
            this.loading = false;
          });
      }
    },

    getBook(id) {
      BaseRequest.get("book/" + id)
        .then((response) => {
          console.log(response);
          this.bookName = response.data.book_name;
          this.content = response.data.content;
          this.categorySelect = response.data.category_id;
          this.authorSelect = response.data.author_id;
          this.NXB = response.data.nxb_id;
          this.republic = response.data.republic;
          this.year = response.data.year;
          this.price = response.data.price;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },

    updateBook() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        BaseRequest.put("book/" + this.id, {
          book_name: this.bookName,
          category_id: this.categorySelect,
          content: this.content,
          nxb_id: this.NXB,
          author_id: this.authorSelect,
          republic: this.republic,
          year: this.year,
          price: this.price,
        })
          .then((response) => {
            console.log('update',response);
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });

        if (this.file) {
          const form = new FormData();
          form.append("file", this.file);
          for (const key of form.entries()) {
            console.log(key[0] + ", " + key[1]);
          }
          BaseRequest.putImage("image/" + this.id, form)
            .then((response) => {
              console.log("image", response);
              alert("update thành công");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    action() {
      if (this.id) {
        this.updateBook();
      } else {
        console.log("createBook:");
        this.createBook();
      }
    },

    // set file properties in data through input type file
    handleChangeFileInput() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
  },
  
};
</script>
