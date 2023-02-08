import { createStore } from "vuex";
import tasks from "./tasks";

const store = createStore({
  modules: {
    tasks
  }
});

export default store;