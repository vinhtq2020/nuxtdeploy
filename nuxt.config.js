export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  generate:{
    fallback:true
  },
  target:'static',
  head: {
    title: 'vuedeploy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script:[
      {
        src:'https://code.jquery.com/jquery-3.5.1.slim.min.js',
      },
      {
          src:'/assets/js/bootstrap.bundle.min.js',
      },
      {
        src:"https://www.paypal.com/sdk/js?client-id=AT0_SY5GRDe6KhYEWNv6PAYRkyqZNSjn2Pb_uKC2rwzwgjqeSwGVqySrOvCG4x5ApU8e4ydOah6M8DZx"

      }
  ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '/assets/css/bootstrap.min.css'
      },
      {rel:'stylesheet',href:"//cdn-images.mailchimp.com/embedcode/classic-10_7.css"}
    ]
  },
  loading:{color:'#fff'},
  // Global CSS: https://go.nuxtjs.dev/config-css
  css:[],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
   {src: '~/plugins/paginate.js',mode:'client'},
   { src: '~/plugins/paypal.js', ssr: false },
   {src:'~/plugins/vuelidate.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env:{
    VUE_APP_DATABASE_URL:process.env.VUE_APP_DATABASE_URL,
    VUE_APP_BASE_URL:process.env.VUE_APP_BASE_URL
  }
}
