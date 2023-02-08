import { createStore } from "vuex";
import tasks from "./tasks";
import products from './products';

const store = createStore({
  modules: {
    tasks,
    products
  }
});

export default store;