<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">Smart Traveler</b-navbar-brand>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/scss/argon';
@import '~bootstrap-vue';
</style>
