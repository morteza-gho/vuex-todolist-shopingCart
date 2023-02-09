import { createStore } from "vuex";
import tasks from "./tasks";
import products from './products';
import cart from './cart';

const store = createStore({
  modules: {
    tasks,
    products,
    cart
  }
});

export default store;