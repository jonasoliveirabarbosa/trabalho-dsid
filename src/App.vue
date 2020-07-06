<template>
  <div id="app">
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand to="/">Smart Traveler</b-navbar-brand>
        <b-navbar-nav class="ml-auto" v-if="this.$store.state.isLogOn">
            <b-navbar-nav>
              <b-nav-text> <router-link :to="{ path: '/dash' }">Olá {{ this.$store.state.usuario.nome }}</router-link></b-nav-text>
            </b-navbar-nav>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
            <b-navbar-nav>
              <b-nav-text>
                <router-link :to="{ path: '/sing_up' }">Cadastrar</router-link>
                / <router-link :to="{ path: '/log_in' }">Login</router-link>
              </b-nav-text>
            </b-navbar-nav>
        </b-navbar-nav>
      </b-navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/scss/argon';
@import '~bootstrap-vue';
</style>
