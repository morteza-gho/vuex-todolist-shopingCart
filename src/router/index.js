import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from './../store/index';
import { computed } from "vue";

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
const router = createRouter({
   history: createWebHistory(),
   routes
});

router.beforeEach((to, from, next) => {
   if (to.name !== 'login' && !isAuthenticated.value) next({ name: 'login' });
   else next();
});

export default router;