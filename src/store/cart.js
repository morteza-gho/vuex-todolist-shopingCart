import axios from "axios";
import { BASE_URL } from '../Constants';
import { useToast } from "vue-toast-notification";
import { defineStore } from 'pinia';

const toast = useToast();

export const useCartStore = defineStore('cart', {

  state: () => {
    return {
      cartItems: []
    }
  },

  getters: {
    allCartItems(state) {
      return state.cartItems
    },
    getCartItem: (state) => {
      return (itemId) => state.cartItems.find(x => parseInt(x.id) === parseInt(itemId));
    },
    cartCount(state) {
      return state.cartItems.length
    },
    calcTotalPrice(state) {
      let total = 0;
      state.cartItems.forEach((item) => {
        total += item.value * item.price
      });
      return total
    }
  },

  actions: {

    async fetchCartItems() {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/cart_items`);
        if (status === 200) {
          this.cartItems = data;
        }
      } catch (err) {
        toast.error(err.message);
      }
    }, // fetchCartItems

    async addToCart(dataModel) {

      const currentItem = this.cartItems.find(x => x.id === dataModel.id);

      if (currentItem) {

        dataModel.value = currentItem.value + 1;
        const index = this.cartItems.findIndex(x => x.id === currentItem.id);
        this.cartItems[index] = currentItem;

      } else {

        dataModel.value = 1;
        try {
          const { status, data } = await axios.post(`${BASE_URL}/cart_items`, dataModel);
          if (status === 201) {
            this.cartItems.unshift(dataModel);
            toast.success('Product Added To Cart');
          }
        } catch (err) {
          toast.error(err.message);
        }

      }

    }, // addToCart

    async updateCartItem(dataModel) {
      try {
        const { status, data } = await axios.put(`${BASE_URL}/cart_items/${dataModel.id}`, dataModel);
        if (status === 200) {
          const index = this.cartItems.findIndex(x => x.id === dataModel.id);
          this.cartItems[index] = dataModel;
          toast.success('Cart Item Updated');
        }
      } catch (err) {
        toast.error(err.message);
      }
    }, // updateCartItem

    async deleteCartItem(itemId) {
      try {
        const { status, data } = await axios.delete(`${BASE_URL}/cart_items/${itemId}`);
        if (status === 200) {
          const index = this.cartItems.findIndex(x => x.id === itemId);
          this.cartItems.splice(index, 1);
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

  }

});