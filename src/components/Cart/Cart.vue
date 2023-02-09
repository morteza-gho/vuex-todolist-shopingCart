<template>

  <loading v-if="isLoading"></loading>

  <div v-else>
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
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-danger" title="Increase"
                :disabled="miniLoading || item.value === 1" @click="changeCount('dec', item)">
                <i class="bi bi-dash-lg"></i>
              </button>
              <button class="btn btn-outline-secondary text-black px-3" disabled>
                {{ item.value }}
              </button>
              <button type="button" class="btn btn-outline-success" title="Decrease" :disabled="miniLoading"
                @click="changeCount('inc', item)">
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
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

</template>

<script setup>

import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { formatPrice } from '../../functions';
import Loading from '../Global/Loading.vue';

const store = useStore();
const isLoading = ref(false);
const miniLoading = ref(false);
const cartItems = computed(() => store.getters['cart/allCartItems']);
const totalPrice = computed(() => store.getters['cart/calcTotalPrice']);

const changeCount = async (type, item) => {
  if (type === 'inc') {
    item.value++;
  } else {
    item.value--;
  }
  miniLoading.value = true;
  await store.dispatch('cart/updateCartItem', item);
  miniLoading.value = false;
};

</script>

<style scoped>
.table td {
  vertical-align: middle;
}

button[disabled] {
  cursor: not-allowed;
}
</style>