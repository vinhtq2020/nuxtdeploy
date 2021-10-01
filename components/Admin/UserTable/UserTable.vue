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
              <h2>Manager<b>User</b></h2>
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
              <th>id User</th>
              <th>username</th>
              <th>email</th>
              <th>roles</th>
              <th v-if="!pageData">action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="po in users" :key="po.id">
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
              <td>{{ po.name }}</td>
              <td>{{ po.email }}</td>
              <td>
                <select name="" id="" v-model="po.role_id" @change="changeRole(po.id, po.role_id)">
                    <option value=1>admin</option>
                    <option value=2>user</option>
                </select>
              </td>
              <td><router-link :to="{path:`/admin/usermanager/infouser/${po.id}`}" class="add-quatity"
                  ><i class="material-icons">&#xe88e;</i></router-link
                ></td>
              
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
  props: ["pageData"],
  mounted() {
    this.getUser();
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      totalPage: 1,
    };
  },
  watch: {
    currentPage() {
      this.getUser();
    },
  },
  methods: {
    clickCallback(page) {
      // tham số page là page hiện tại
      this.currentPage = page;
    },
    getUser() {
      BaseRequest.get("user/action/getAll?page="+this.currentPage)
        .then((result) => {
          this.users = result.data.user_list.data;
          console.log(this.users);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changeRole(id,roleId){
       
       BaseRequest.post('user/action/changeRole',{user_id:id,role_id:roleId}).then((result) => {
            console.log(result.data.message);
        }).catch((err) => {
            console.log(err);
        });
    }
  },

};
</script>

