import axios from "axios";
import { BASE_URL } from '../Constants';
import { useToast } from "vue-toast-notification";
import { uuid } from './../functions';

const toast = useToast();

const cart = {
  namespaced: true,

  state: {
    cartItems: []
  },

  getters: {
    allCartItems(state) {
      return state.cartItems
    },
    cartCount(state) {
      return state.cartItems.length
    }
  },

  mutations: {

    setToCart(state, items) {
      state.cartItems = items;
    },

    updateCartItem(state, item) {
      const index = state.cartItems.findIndex(x => x.id === item.id);
      state.cartItems[index] = item;
    },

    addToCart(state, mewItem) {
      state.cartItems.unshift(mewItem);
    },

    deleteFromCart(state, itemId) {
      const index = state.cartItems.findIndex(x => x.id === itemId);
      state.cartItems.splice(index, 1);
    },

  },

  actions: {

    async fetchCartItems({ commit }) {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/cart_items`);
        if (status === 200) {
          commit('setToCart', data);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }, // fetchCartItems

    async addToCart({ state, commit, dispatch }, dataModel) {

      const currentItem = state.cartItems.find(x => x.id === dataModel.id);

      if (currentItem) {

        dataModel.value = currentItem.value + 1;
        await dispatch('updateCartItem', dataModel); // increase cart item value

      } else {

        dataModel.value = 1;
        try {
          const { status, data } = await axios.post(`${BASE_URL}/cart_items`, dataModel);
          if (status === 201) {
            commit('addToCart', data);
            toast.success('Product Added To Cart');
          }
        } catch (err) {
          toast.error(err.message);
        }

      }

    }, // addToCart

    async updateCartItem({ commit }, dataModel) {
      try {
        const { status, data } = await axios.put(`${BASE_URL}/cart_items/${dataModel.id}`, dataModel);
        if (status === 200) {
          commit('updateCartItem', data);
          toast.success('Cart Item Updated');
        }
      } catch (err) {
        toast.error(err.message);
      }
    }, // updateCartItem

  }

}

export default cart;