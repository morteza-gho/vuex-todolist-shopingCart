const auth = {
  namespaced: true,

  state: {
    token: null
  },

  getters: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    getToken() {
      return localStorage.getItem('token');
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
    }
  },

  actions: {
    async setToken({ commit }, token) {
      await commit('setToken', token);
    },
    async logout({ commit }) {
      await commit('logout');
    }
  }
};

export default auth;