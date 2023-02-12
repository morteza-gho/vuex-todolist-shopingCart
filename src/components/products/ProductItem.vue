<template>

  <div class="card">
    <router-link :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" class="card-img-top" :alt="product.title">
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.description }}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">

      <cart-actions :data="productInCart" v-if="productInCart"></cart-actions>
      <button class="btn btn-sm btn-outline-success" @click="addToCart(product)" v-else>Add To Cart</button>

      <strong class="text-black">
        <b class="bi bi-currency-dollar"></b>
        {{ formatPrice(product.price) }}
      </strong>
    </div>
  </div>

</template>

<script setup>

import { defineProps, computed } from "vue";
import { formatPrice } from "../../functions";
import store from "../../store";
import CartActions from '../Cart/CartActions.vue';

const props = defineProps({
  product: Object
});
const productInCart = computed(() => store.getters[`cart/getCartItem`](props.product.id));

const addToCart = (item) => {
  store.dispatch('cart/addToCart', item);
};

</script>