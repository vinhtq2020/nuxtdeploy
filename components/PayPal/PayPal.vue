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

          onApprove: async (data, actions) => {
            return await actions.order.capture().then(function (details) {
              window.location.replace(
                `${process.env.VUE_APP_BASE_URL}checkout?errorCode=0`
              )
              alert('Transaction completed by ' + details.payer.name.given_name)
            })
          },
          onError() {
            return (err) => {
              console.error(err)
              window.location.href = `${process.env.VUE_APP_BASE_URL}checkout`
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
