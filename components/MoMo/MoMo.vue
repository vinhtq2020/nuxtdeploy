<template>
  <div>
    <a @click="payBill()" class="btn btn-block btn-danger badge-pill" ><img src="~/static/assets/momo-logo.png" class="img-fluid" alt="momo-logo" width="30"></a>
  </div>
</template>

<script>
const crypto = require("crypto");
const axios = require("axios");
import { mapGetters } from "vuex";
export default {
  
  data() {
    return {
      partnerCode: "MOMOLBGP20210920",
      accessKey: "h63mSQLh1klEWGR2",
      secretkey: "6fCSqfD0pqC7t4Qn1AvVc6rDUKmpnMsH",

      orderInfo: "pay with MoMo",
      returnUrl: "https://webbansachonline.netlify.app/check-out",
      notifyUrl: "https://webbansachonline.netlify.app/check-out",
      amount: "1000",
      requestType: "captureMoMoWallet",
      extraData: "", //pass empty value if your merchant does not have stores
      signature: "",
      requestId: "",
      orderId: "",
      rawSignature: "",
    };
  },
  computed:{
    ...mapGetters(["value"]),
  },
  methods: {
    payBill() {
      this.amount = this.value.totalMoney.toString();
      this.requestId = this.partnerCode + new Date().getTime();
      this.orderId = this.requestId;
     
      console.log(this.requestId);
      console.log(this.orderId);
      this.rawSignature = `partnerCode=${this.partnerCode}&accessKey=${this.accessKey}&requestId=${this.requestId}&amount=${this.amount}&orderId=${this.orderId}&orderInfo=${this.orderInfo}&returnUrl=${this.returnUrl}&notifyUrl=${this.notifyUrl}&extraData=${this.extraData}`;

      console.log("--------------------RAW SIGNATURE----------------");
      console.log(this.rawSignature);
      this.signature = crypto
        .createHmac("sha256", this.secretkey)
        .update(
          this.rawSignature
        )
        .digest("hex");
      console.log("--------------------SIGNATURE----------------");
      console.log(this.signature);
      var requestBody = JSON.stringify({
        notifyUrl: this.notifyUrl,
        returnUrl: this.returnUrl,
        orderId: this.orderId,
        amount: this.amount,
        orderInfo: this.orderInfo,
        requestId: this.requestId,
        extraData: this.extraData,
        signature: this.signature,
        accessKey: this.accessKey,
        partnerCode: this.partnerCode,
        requestType: "captureMoMoWallet",
      });

      var headers = {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      };
      axios
        .post(
          "https://test-payment.momo.vn/gw_payment/transactionProcessor",
          requestBody,
          headers
        )
        .then((response) => {
          console.log(response.data);
          window.location.replace(response.data.payUrl)
        })
        .catch((error) => {
          console.log("loi: ", error);
        });
    },
  },
};
</script>

