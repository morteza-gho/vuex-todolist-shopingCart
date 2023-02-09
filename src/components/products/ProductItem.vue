<template>

  <div class="card">
    <img :src="product.image" class="card-img-top" :alt="product.title">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.description }}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <button class="btn btn-sm btn-outline-success" @click="addToCart(product)">Add To Cart</button>
      <strong class="text-black">
        <b class="bi bi-currency-dollar"></b>
        {{ formatPrice(product.price) }}
      </strong>
    </div>
  </div>

</template>

<script setup>

import { defineProps } from "vue";
import { formatPrice } from "../../functions";
import store from "../../store";

const props = defineProps({
  product: Object
});

const addToCart = (item) => {
  store.dispatch('cart/addToCart', item);
}


</script>