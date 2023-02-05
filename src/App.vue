<script>
   import MainHeader from './components/MainHeader.vue';

   export default {
      setup() {},
      components: {MainHeader}
   };
</script>

<template>
   <main-header></main-header>
   <main id="main" class="container">
      <router-view></router-view>
   </main>
</template>

<style scoped>
   #main {
      margin-top: 90px;
   }
</style>
