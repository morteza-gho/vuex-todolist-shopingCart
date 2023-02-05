import axios from "axios";
import { BASE_URL } from './../Constants';
import { createStore } from "vuex";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const store = createStore({

  state: {
    tasks: []
  },

  getters: {
    allTasks(state) {
      return state.tasks
    }
  },

  mutations: {

    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    updateTask(state, updtedTask) {
      const taskIndex = state.tasks.findIndex(x => x.id === updtedTask.id);
      tasks[taskIndex] = updtedTask;
    }

  },

  actions: {

    async fetchTasks({ commit }) {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/tasks`);
        if (status === 200) {
          commit('setTasks', data);
        }
      } catch (err) {
        $toast.error(err.message);
      }
    },

    async updatetask({ commit }, task) {
      try {
        const { status, data } = await axios.put(`${BASE_URL}/tasks/${task.id}`, task);
        if (status === 200) {
          commit('updateTask', task)
        }
      } catch (err) {
        $toast.error(err.message);
      }
    }
  }

});

export default store;