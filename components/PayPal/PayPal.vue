<template>
  <paypal-buttons
    :on-approve="onApprove"
    :create-order="createOrder"
    :on-shipping-change="onShippingChange"
    :on-error="onError"
    :style-object="style"
    class="btn-block"
  />
</template>
<script src="https://www.paypal.com/sdk/js?client-id=AT0_SY5GRDe6KhYEWNv6PAYRkyqZNSjn2Pb_uKC2rwzwgjqeSwGVqySrOvCG4x5ApU8e4ydOah6M8DZx"></script>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  components: {
    "paypal-buttons": paypal.Buttons.driver("vue", Vue),
  },
  data(){
    return{
      VNDToUSD:22791.95
    }
  },
  computed: {
    ...mapGetters(["value"]),
    createOrder: function() {
      return (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value:Math.round(this.value.totalMoney/this.VNDToUSD * 100) / 100 ,
              },
            },
          ],
        });
      };
    },
    onApprove: function() {
      return (data, actions) => {
        return actions.order.capture().then(function(details){
          window.location.replace('https://webbansachonline.netlify.app/check-out?errorCode=0');
          alert('Transaction completed by ' + details.payer.name.given_name);
        
        });
      };
            

    },
    onShippingChange: function() {
      return (data, actions) => {
        if (data.shipping_address.country_code !== "US") {
          return actions.reject();
        }
        return actions.resolve();
      };
    },
    onError: function() {
      return (err) => {
        console.error(err);
        window.location.href = "/your-error-page-here";
      };
    },
    style: function() {
      return {
        shape: "pill",
        color: "gold",
        layout: "horizontal",
        label: "paypal",
        tagline: false,
      };
    },
  },
};
</script>

