const axios = require('axios');
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Books Store',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Đây là website bán sách của nhóm chúng em phục vụ cho môn Thương main điện tử, mong mọi người nhiệt tình ủng hộ' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js',
      },
      {
        src: "https://www.paypal.com/sdk/js?client-id=AT0_SY5GRDe6KhYEWNv6PAYRkyqZNSjn2Pb_uKC2rwzwgjqeSwGVqySrOvCG4x5ApU8e4ydOah6M8DZx"

      },
      {
        src: "https://ahachat.com/customer-chats/customer_chat_ENbVt0HmDM614f3facaaddf.js"
      },
      {
        src: "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
      },
      {
        hid: "tawk.to",
        src: "https://embed.tawk.to/614fd42925797d7a8900d6a7/1fgft9ghq",
        defer: true
      },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'
      },
      { rel: 'stylesheet', href: "//cdn-images.mailchimp.com/embedcode/classic-10_7.css" },
      {rel:'canonical', href:"https://webbanbook.herokuapp.com/"}
    ]
  },
  loading: { color: '#fff' },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/paginate.js', ssr: false },
    { src: '~/plugins/paypal.js', ssr: false },
    { src: '~/plugins/vuelidate.js' },
    {src: '~plugins/vue-gtag.js',mode:'client'}
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
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',

  ],
  sitemap: {
    hostname: 'https://webbanbook.herokuapp.com',
    exclude: [
      '/account/**',
      '/admin/**',
      '/account',
      '/searchpage'
    ],
    routes: async () => {
      let { data } = await axios.get('https://laravel-backend-book.herokuapp.com/api/book/action/getAll')
      return data.map(v => `/productdetail/${v.id}`)
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Robots.txt
  robots: [
    {
      UserAgent: '*',
      Allow: '/',
      Disallow: '/admin',
    },
    {
      UserAgent: '*',
      Disallow: '/account',
      Sitemap: 'https://webbanbook.herokuapp.com/sitemap.xml'
    }
  ],


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    VUE_APP_DATABASE_URL: process.env.VUE_APP_DATABASE_URL,
    VUE_APP_BASE_URL: process.env.VUE_APP_BASE_URL
  }
}
