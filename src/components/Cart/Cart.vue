<template>

  <div v-if="cartItems.length">

    <h1 class="mb-4">Shopping Cart Items</h1>
    <table class="table table-bordered table-hover">
      <thead>
        <tr class="bg-light">
          <th>Row</th>
          <th>Product Title</th>
          <th class="text-center">Unit Price</th>
          <th class="text-center">Count</th>
          <th class="text-center">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to="{ name: 'product', params: { id: item.id } }">
              <img :src="item.image" :alt="item.title" width="40">
            </router-link>
            {{ item.title }}
          </td>
          <td class="text-center">{{ formatPrice(item.price) }}</td>
          <td class="text-center">
            <cart-actions :data="item"></cart-actions>
          </td>
          <td class="text-center">{{ formatPrice(item.value * item.price) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-light">
          <td colspan="4"><strong>Total Price</strong></td>
          <td class="text-center"><strong>{{ formatPrice(totalPrice) }}</strong></td>
        </tr>
      </tfoot>
    </table>

    <div class="d-flex justify-content-end">
      <button class="btn btn-lg btn-success">
        <i class="bi bi-cart"></i>
        Checkout
      </button>
    </div>
  </div>

  <div class="d-flex flex-column justify-content-center align-items-center" v-else>
    <div class="card text-center p-5">
      <p class="fs-1">Your Cart Is Empty.</p>
      <b class="bi bi-cart-x" style="font-size: 100px"></b>
      <router-link :to="{ name: 'products' }" class="btn btn-dark mt-3">Go to products</router-link>
    </div>
  </div>

</template>

<script setup>

import { computed } from 'vue';

import { formatPrice } from '../../functions';
import { useCartStore } from '../../store/cart';
import CartActions from './CartActions.vue';

const store = useCartStore();
const cartItems = computed(() => store.allCartItems);
const totalPrice = computed(() => store.calcTotalPrice);

</script>

<style scoped>
.table td {
  vertical-align: middle;
}

button[disabled] {
  cursor: not-allowed;
}
</style>