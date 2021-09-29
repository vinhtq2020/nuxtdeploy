<template>
  <div ref="paypal"></div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
   data() {
    return {
      VNDToUSD: 22791.95,
      loaded: false,
    }
  },
  // head() {
  //   return {
  //     script: [
  //       {
  //         src: 'https://www.paypal.com/sdk/js?client-id=AT0_SY5GRDe6KhYEWNv6PAYRkyqZNSjn2Pb_uKC2rwzwgjqeSwGVqySrOvCG4x5ApU8e4ydOah6M8DZx',
  //       },
  //     ],
  //   }
  // },
  computed: {
    ...mapGetters(['value']),
  },
  mounted() {
    this.setLoaded()
  },

 
  methods: {
    setLoaded() {
      this.loaded = true
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value:
                        Math.round(
                          (this.value.totalMoney / this.VNDToUSD) * 100
                        ) / 100,
                    },
                  },
                ],
              })
            },
          
          onApprove() {
            return async (data, actions) => {
              return await actions.order.capture().then(function (details) {
                window.location.replace(
                  'https://webbansachonline.netlify.app/check-out?errorCode=0'
                )
                alert(
                  'Transaction completed by ' + details.payer.name.given_name
                )
              })
            }
          },
          
          onError() {
            return (err) => {
              console.error(err)
              window.location.href = '/your-error-page-here'
            }
          },
          style: {
            
              shape: 'pill',
              color: 'gold',
              layout: 'horizontal',
              label: 'paypal',
              tagline: false,
            
          },
        })
        .render(this.$refs.paypal)
    },
  },
  
}
</script>
