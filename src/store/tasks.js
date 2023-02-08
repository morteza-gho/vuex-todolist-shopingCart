import axios from "axios";
import { BASE_URL } from './../Constants';
import { useToast } from "vue-toast-notification";

const toast = useToast();

const tasks = {
  namespaced: true,

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

    addTask(state, newTask) {
      state.tasks.unshift(newTask);
    },

    updateTask(state, updtedTask) {
      const taskIndex = state.tasks.findIndex(x => x.id === updtedTask.id);
      state.tasks[taskIndex] = updtedTask;
    },

    deleteTask(state, taskId) {
      const taskIndex = state.tasks.findIndex(x => x.id === taskId);
      state.tasks.splice(taskIndex, 1);
    },
  },

  actions: {

    async fetchTasks({ commit }) {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/tasks`);
        if (status === 200) {
          commit('setTasks', data);
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

    async addTask({ commit }, dataModel) {
      try {
        const { status, data } = await axios.post(`${BASE_URL}/tasks`, dataModel);
        if (status === 201) {
          commit('addTask', data);
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

    async updateTask({ commit }, task) {
      try {
        const { status, data } = await axios.put(`${BASE_URL}/tasks/${task.id}`, task);
        if (status === 200) {
          commit('updateTask', data)
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

    async deleteTask({ commit }, taskId) {
      try {
        const { status, data } = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
        if (status === 200) {
          commit('deleteTask', taskId)
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

  }

}

export default tasks;