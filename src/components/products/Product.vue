<template>

  <loading v-if="isLoading"></loading>

  <div class="card" v-else-if="product">

    <div class="row">
      <div class="col-md-4 col-sm-12 col-12">
        <img :src="product.image" class="card-img-top" :alt="product.title">
      </div>
      <div class="col-md-8 col-sm-12 col-12">
        <div class="card-body">
          <h1 class="card-title mb-3">{{ product.title }}</h1>
          <p class="card-text fs-4 mb-5">{{ product.description }}</p>

          <div class="d-flex justify-content-between align-items-center">

            <cart-actions :data="productInCart" size="lg" v-if="productInCart"></cart-actions>
            <button class="btn btn-lg btn-outline-success" @click="addToCart(product)" v-else>Add To Cart</button>

            <strong class="text-black fs-4">
              <b class="bi bi-currency-dollar"></b>
              {{ formatPrice(product.price) }}
            </strong>
          </div>

        </div>

      </div>
    </div>
    <!-- .row -->

  </div>
  <!-- .card -->

</template>

<script setup>

import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { formatPrice } from "../../functions";
import { useToast } from "vue-toast-notification";
import { BASE_URL } from "../../Constants";
import axios from "axios";
import Loading from "../Global/Loading.vue";
import CartActions from '../Cart/CartActions.vue';
import { useCartStore } from "../../store/cart";

const store = useCartStore();
const toast = useToast();
const route = useRoute()
const product = ref(null);
const isLoading = ref(false);
const productInCart = computed(() => store.getCartItem(route.params.id));

const getProductData = async () => {
  try {
    isLoading.value = true;
    const { status, data } = await axios.get(`${BASE_URL}/products/${route.params.id}`);
    isLoading.value = false;
    if (status === 200) {
      product.value = data;
    }
  } catch (err) {
    toast.error(err.message);
  }
};

onMounted(() => {
  getProductData()
})

const addToCart = (item) => {
  store.addToCart(item);
};




</script>