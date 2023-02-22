<template>

  <Loading v-if="isLoading"></loading>

  <div class="products row" v-else>

    <div v-for="product in products" :key="product.id" class="col-md-3 col-sm-6 col-12 mb-4">
      <product-item :product="product"></product-item>
    </div>

  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductsStore } from '../../store/products';
import Loading from '../Global/Loading.vue';
import ProductItem from '../products/ProductItem.vue';

const store = useProductsStore();
const isLoading = ref(false);
const products = computed(() => store.allProducts);

const fetchProducts = async () => {
  isLoading.value = true;
  await store.fetchProducts();
  isLoading.value = false;
};

onMounted(() => {
  fetchProducts();
});

</script>
