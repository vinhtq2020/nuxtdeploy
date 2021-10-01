<template>
  <div>
   
        <div>
          <div class="card col-10 bg-light mx-auto mt-4">
            <div class="card-body">
              <div class="form-group row">
                <label for="staticEmail" class="col-2 col-form-label"
                  >ID User</label
                >
                <div class="col-6">
                  <input
                    type="text"
                    class="form-control"
                    id="staticEmail"
                    v-model="idUser"
                    readonly
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="staticEmail" class="col-2 col-form-label"
                  >Username</label
                >
                <div class="col-6">
                  <input
                    type="text"
                    class="form-control"
                    id="staticEmail"
                    v-model="userInfo.name"
                    readonly
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="staticEmail" class="col-2 col-form-label"
                  >Email</label
                >
                <div class="col-6">
                  <input
                    type="text"
                    class="form-control"
                    id="staticEmail"
                    v-model="userInfo.email"
                    readonly
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="inputSdt" class="col-2 col-form-label"
                  >Phone Number</label
                >
                <div class="col-6">
                  <input
                    type="tel"
                    class="form-control"
                    id="inputSdt"
                    v-model="userInfo.phone_number"
                    readonly
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputSdt" class="col-2 col-form-label"
                  >Gender</label
                >
                <div class="col-6">
                  <input
                    type="tel"
                    class="form-control"
                    id="inputSdt"
                    :value="userInfo.gender == 0 ? 'male' : 'female'"
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card col-10 bg-light mx-auto mt-4">
          <div class="table-wrapper">
            <table class="table table-striped table-hover" style="font-size:13px;">
              <thead>
                <tr>
                  <!-- <th>
                    <span class="custom-checkbox">
                      <input type="checkbox" id="selectAll" />
                      <label for="selectAll"></label>
                    </span>
                  </th> -->
                  <th>id Bill</th>
                  <th>create at</th>
                  <th>products</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="po in bills" :key="po.id">
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
                  <td><nuxt-link :to="{path:`/admin/billdetail/${po.id}`}">{{ po.id }}</nuxt-link></td>

                  <td>
                    {{ po.created_at.getHours() }}:{{
                      po.created_at.getMinutes()
                    }}
                    {{ po.created_at.getDate() }}/{{
                      po.created_at.getMonth() + 1
                    }}/{{ po.created_at.getFullYear() }}
                  </td>
                <td><div v-for="item in po.billdetails" :key="item.id" class="mt-1">{{item.book_name}}</div></td>
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
          </div>
        </div>
  
  </div>
</template>

<script>
import BaseRequest from "@/core/BaseRequest";
export default {
    layout:'admin',
  
  mounted() {
    this.checkLoggedIn();
    this.getUserInfo(this.idUser);
    this.getBillByIdUser(this.idUser);
  },
  data() {
    return {
      bills: [],
      idUser: this.$route.params.id,
      userInfo: {},
    };
  },
  methods: {
    checkLoggedIn() {
      BaseRequest.get("user")
        .then(function(response) {
          if (response.data.role_id === 2) {
            this.$router.push({ name: "user/home" });
          }
        })
        .catch(() => {
          // phải dùng arrow function thì nó mới hiêu this.$router
          this.$router.push({ name: "user/home" });
        });
    },
    clickCallback(page) {
      // tham số page là page hiện tại
      this.currentPage = page;
    },
    getUserInfo(id) {
      BaseRequest.get(`user/${id}`)
        .then((result) => {
          this.userInfo = result.data;
          console.log(this.userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBillByIdUser(idUser) {
      BaseRequest.get(`bill/action/getBillByIdUser/${idUser}`)
        .then((result) => {
          this.bills = result.data;
          this.bills.forEach((element) => {
            element.created_at = new Date(element.created_at);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>