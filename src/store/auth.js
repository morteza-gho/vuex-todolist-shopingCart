import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {

  state: () => {
    return { 
      token: null
    }
  },

  getters: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    getToken() {
      return localStorage.getItem('token');
    }
  },

  actions: {
    async setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    async logout() {
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});