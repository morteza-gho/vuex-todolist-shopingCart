import { createStore } from "vuex";
import tasks from "./tasks";
import products from './products';
import cart from './cart';
import auth from './auth';

const store = createStore({
  modules: {
    tasks,
    products,
    cart,
    auth
  }
});

export default store;