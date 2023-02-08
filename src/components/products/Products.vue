<template>

  <Loading v-if="isLoading"></loading>

  <div class="products row" v-else>

    <div v-for="product in products" :key="product.id" class="col-md-3 col-sm-6 col-12 mb-4">
      <div class="card">
        <img :src="product.image" class="card-img-top" :alt="product.title">
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">{{ product.description }}</p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          <button class="btn btn-sm btn-outline-success">Add To Cart</button>
          <strong class="text-success">{{ formatPrice(product.price) }}</strong>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Loading from '../Global/Loading.vue';
import { formatPrice } from "../../functions";

const store = useStore();
const isLoading = ref(false);
const products = computed(() => store.getters['products/allProducts']);

const fetchProducts = async () => {
  isLoading.value = true;
  await store.dispatch('products/fetchProducts');
  isLoading.value = false;
};

onMounted(() => {
  fetchProducts();
});

</script>
