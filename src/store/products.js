import axios from "axios";
import { BASE_URL } from '../Constants';
import { useToast } from "vue-toast-notification";

const toast = useToast();

const products = {
  namespaced: true,

  state: {
    products: []
  },

  getters: {
    allProducts(state) {
      return state.products
    },
    
  },

  mutations: {

    setProducts(state, products) {
      state.products = products;
    },
  },

  actions: {

    async fetchProducts({ commit }) {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/products`);
        if (status === 200) {
          commit('setProducts', data);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }

  }

}

export default products;