<template>
  <main-header></main-header>
  <main id="main" class="container">
    <router-view></router-view>
  </main>
</template>

<script setup>
import MainHeader from './MainHeader.vue';
</script>

<style scoped>
#main {
  margin-top: 90px;
}
</style>