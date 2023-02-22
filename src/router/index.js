import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useAuthStore } from './../store/auth';

const router = createRouter({
   history: createWebHistory(),
   routes
});

router.beforeEach((to, from, next) => {
   const store = useAuthStore();
   if (to.name !== 'login' && !store.isAuthenticated) next({ name: 'login' });
   else next();
});

export default router;