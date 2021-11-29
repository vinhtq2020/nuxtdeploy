<template>
  <div class="container mt-3">
    <div class="row">
      <side-bar class="col-3" style="background: #6060a9" />
      <div class="col-9">
        <div class="border" style="background: white">
          <div class="p-2">
            <div>
              <div
                class=" font-weight-bold"
                style="font-size: 30px; border-bottom: 3px solid #6060a9"
              >
                Sản phẩm mới nhất
              </div>

              <div>
                <slider :parent-data="newBooks" :item-show="4" />
              </div>
            </div>
            <div>
              <div
                class=" font-weight-bold"
                style="font-size: 30px; border-bottom: 3px solid #6060a9"
              >
                Sản phẩm bán chạy
              </div>

              <div>
                <slider :parent-data="bestSaleBooks" :item-show="4" />
              </div>
            </div>
            <div v-for="item in booksByCategoryId" :key="item.category.id">
              <div
                class="font-weight-bold"
                style="font-size: 30px; border-bottom: 3px solid #6060a9"
              >
                {{ item.category.category_name }}
              </div>

              <div>
                <slider :parent-data="item.books" :item-show="4" />
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </div>
  </div>
</template>
<script>
import SideBar from '~/components/SideBar/Sidebar'
import BaseRequest from '~/core/BaseRequest'
import Slider from '~/components/Slider/Slider.vue'
export default {
  layout: 'public',
  components: {
    SideBar,
    Slider,
  },
  data() {
    return {
      newBooks: [],
      bestSaleBooks: [],
      categories: [],
      booksByCategoryId: [],
    }
  },
  methods: {
    getNewBooks() {
      BaseRequest.get('book/action/getNewBooks/8')
        .then((response) => {
          console.log('booknews', response)
          this.newBooks = response.data
          console.log('newBooks:', this.newBooks)
        })
        .catch((error) => {
          console.log('errors booknews', error)
        })
    },
    getBooksByCategoryId(id) {
      BaseRequest.get('book/action/getBookByCategoryId/' + id + '/4')
        .then((result) => {
          console.log(result)
          this.booksByCategoryId = [
            ...this.BooksByCategoryId,
            { category_id: id, books: result.data },
          ]
          console.log('BooksByCategoryId: ', this.booksByCategoryId)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getBooksBestSaleInMonth() {
      BaseRequest.get('book/action/getBookBestSale/4')
        .then((result) => {
          this.bestSaleBooks = result.data
          console.log('books best sale', result.data)
        })
        .catch((err) => {
          console.log('books best sale', err)
        })
    },
    getCategories() {
      BaseRequest.get('category/action/getcategories')
        .then((result) => {
          this.categories = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getBookByAllCategoires(number) {
      BaseRequest.get('book/action/getBooksByAllCategories/' + number)
        .then((result) => {
          console.log('getBookByAllCategoires: ', result.data)
          this.booksByCategoryId = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    this.getNewBooks()
    this.getBooksBestSaleInMonth()
    this.getBookByAllCategoires(4)
  },
}
</script>
