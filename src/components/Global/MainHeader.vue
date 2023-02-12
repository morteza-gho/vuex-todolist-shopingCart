<template>

   <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
         <div class="container">

            <router-link to="/" class="navbar-brand">Learning Vuex</router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
               <ul class="navbar-nav">
                  <li class="nav-item"><router-link :to="{ name: 'home' }" class="nav-link">Home</router-link></li>
                  <li class="nav-item"><router-link :to="{ name: 'tasks' }" class="nav-link">Tasks</router-link></li>
                  <li class="nav-item"><router-link :to="{ name: 'products' }" class="nav-link">Products</router-link>
                  </li>
               </ul>
            </div>

            <div class="position-relative">
               <router-link :to="{ name: 'cart' }">
                  <b class="bi bi-cart text-white fs-4"></b>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-2">
                     {{ cartCount }}
                  </span>
               </router-link>
            </div>
            <b class="bi bi-box-arrow-right text-white fs-4 ms-4" title="Logout" style="cursor: pointer;"
              @click="logout"></b>

         </div>
      </nav>
   </header>

</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const cartCount = computed(() => store.getters['cart/cartCount']);

const fetchCartItems = () => {
   store.dispatch('cart/fetchCartItems');
};

onMounted(() => {
   fetchCartItems();
});

const logout = async () => {
   if (window.confirm('Are you sure to logout?')) {
      await store.dispatch('auth/logout');
      router.push({ name: 'login' });
   }
}


</script>

<style scoped>
.router-link-active {
   color: #FFF !important;
}
</style>