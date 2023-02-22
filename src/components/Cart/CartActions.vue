<template>
  <div class="btn-group" :class="`btn-group-${size}`">
    <button type="button" class="btn btn-outline-danger" title="Decrease" v-if="data.value > 1" :disabled="miniLoading"
      @click="changeCount('dec')">
      <i class="bi bi-dash-lg"></i>
    </button>
    <button type="button" class="btn btn-outline-danger" title="Delete" v-if="data.value === 1"
      :disabled="miniLoading" @click="deleteItem()">
      <i class="bi bi-trash"></i>
    </button>
    <button class="btn btn-outline-secondary text-black px-3" disabled>
      {{ data.value || 0 }}
    </button>
    <button type="button" class="btn btn-outline-success" title="Increase" :disabled="miniLoading"
      @click="changeCount('inc')">
      <i class="bi bi-plus-lg"></i>
    </button>
  </div>
</template>

<script setup>
import {ref, defineProps} from "vue";
import { useCartStore } from "../../store/cart";


const store = useCartStore();
const miniLoading = ref(false);
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    default: 'sm'
  }
});

const changeCount = async (type) => {
  if (type === 'inc') {
    props.data.value++;
  } else {
    props.data.value--;
  }
  miniLoading.value = true;
  await store.updateCartItem(props.data);
  miniLoading.value = false;
};

const deleteItem = async () => {
  if (window.confirm('Are You Sure To Delete This Product?')) {
    miniLoading.value = true;
    await store.deleteCartItem(props.data.id);
    miniLoading.value = false;
  }
};

</script>