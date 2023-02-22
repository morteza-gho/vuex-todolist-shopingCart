import axios from "axios";
import { BASE_URL } from './../Constants';
import { useToast } from "vue-toast-notification";
import { defineStore } from "pinia";

const toast = useToast();

export const useTasksStore = defineStore('tasks', {

  state: () => {
    return {
      tasks: []
    }
  },

  getters: {
    allTasks(state) {
      return state.tasks
    }
  },

  actions: {

    async fetchTasks() {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/tasks`);
        if (status === 200) {
          this.tasks = data;
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

    async addTask( dataModel) {
      try {
        const { status, data } = await axios.post(`${BASE_URL}/tasks`, dataModel);
        if (status === 201) {
          this.tasks.unshift(data);
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

    async updateTask(task) {
      try {
        const { status } = await axios.put(`${BASE_URL}/tasks/${task.id}`, task);
        if (status === 200) {
          const taskIndex = this.tasks.findIndex(x => x.id === task.id);
          this.tasks[taskIndex] = task;
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

    async deleteTask(taskId) {
      try {
        const { status, data } = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
        if (status === 200) {
          const taskIndex = this.tasks.findIndex(x => x.id === taskId);
          this.tasks.splice(taskIndex, 1);
        }
      } catch (err) {
        toast.error(err.message);
      }
    },

  }

});