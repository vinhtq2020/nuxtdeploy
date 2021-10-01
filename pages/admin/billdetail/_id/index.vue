<template>
  <div class="p-4 border col-10 mx-auto bg-light">
    <div>
      <div style="font-size: 19px; font-weight: 350" class="mt-3">
        Chi tiết đơn hàng #{{ billId }}
      </div>
      <div style="font-size: 19px; font-weight: 350">
        Người đặt hàng #{{ billUserId }}
      </div>
      <div class="text-right" style="font-size: 13px">
        Ngày đặt hàng: {{ billDate.getHours() }}:{{ billDate.getMinutes() }}
        {{ billDate.getDate() }}/{{ billDate.getMonth() + 1 }}/{{
          billDate.getFullYear()
        }}
      </div>
      <div style="font-size: 13px; font-weight: 400" class="mt-3 mb-3">
        THÔNG BÁO
      </div>
      <div>
        <div class="bg-light">
          <div class="card">
            <table
              class="table table-hover table-responsive"
              style="font-size: 13px"
            >
              <thead>
                <tr style="font-size: 15px">
                  <th
                    style="width: 40%"
                    scope="col"
                    class="text-secondary font-weight-normal"
                  >
                    Sản phẩm
                  </th>
                  <th
                    style="width: 20%"
                    scope="col"
                    class="text-secondary font-weight-normal"
                  >
                    Giá
                  </th>
                  <th
                    style="width: 20%"
                    scope="col"
                    class="text-secondary font-weight-normal"
                  >
                    Số lượng
                  </th>
                  <th
                    style="width: 20%"
                    scope="col"
                    class="text-secondary font-weight-normal text-right"
                  >
                    Tạm tính
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bill in billItems" :key="bill.id">
                  <td scope="row">
                    <div class="row">
                      <div class="col-4">
                        <img
                          :src="apiUrl + bill.image[0].url"
                          class="
                            img-fluid
                            ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}
                          "
                          alt=""
                        />
                      </div>
                      <div class="col-8">
                        <div>{{ bill.book_name }}</div>
                      </div>
                    </div>
                  </td>
                  <td>{{ bill.unit_price }} ₫</td>
                  <td>{{ bill.quatity }}</td>
                  <td class="text-right">
                    {{ bill.unit_price * bill.quatity }} ₫
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colspan="3"
                    class="text-right text-secondary"
                    style="font-size: 14px"
                  >
                    Tổng cộng
                  </td>
                  <td class="text-danger h5 text-right">{{ billTotal }} ₫</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from '@/core/BaseRequest'

export default {
  layout: 'admin',
  mounted() {
    this.getBillDetailById(this.billId)
    this.getBillDetailByIdBill(this.billId)
  },
  data() {
    return {
      billId: this.$route.params.id,
      billItems: [],
      billTotal: 0,
      billDate: new Date(),
      billUserId: '',

      apiUrl: process.env.VUE_APP_DATABASE_URL,
    }
  },
  methods: {
    getBillDetailByIdBill(id) {
      BaseRequest.get('billdetail/action/getBillDetailByIdBill/' + id)
        .then((response) => {
          this.billItems = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getBillDetailById(id) {
      BaseRequest.get('bill/' + id)
        .then((result) => {
          this.billTotal = result.data.total
          this.billDate = new Date(result.data.created_at)
          this.billUserId = result.data.user_id
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
