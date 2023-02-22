import axios from "axios";
import { BASE_URL } from '../Constants';
import { useToast } from "vue-toast-notification";
import { defineStore } from 'pinia';

const toast = useToast();

export const useProductsStore = defineStore('products', {

  state: () => {
    return {
      products: []
    }
  },

  getters: {
    allProducts(state) {
      return state.products
    },
  },

  actions: {

    async fetchProducts() {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/products`);
        if (status === 200) {
          this.products = data;
        }
      } catch (err) {
        toast.error(err.message);
      }
    }

  }

});