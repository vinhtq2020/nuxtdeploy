<template>
  <div class="page">
      <div class="nav">
          <ul>
              <li>
                  <nuxt-link to="/settings">General</nuxt-link>
              </li>
              <li>
                  <nuxt-link to="/settings/schedule">Deck</nuxt-link>
              </li>
          </ul>
      </div>
      <nuxt-child/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.page{
    display: flex;
}

.page .main{
    margin-left: 3rem;
}
</style>