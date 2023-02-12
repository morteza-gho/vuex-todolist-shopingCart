import AppWrapper from "../components/Global/AppWrapper.vue";

const routes = [
   { path: '/login', name: 'login', component: () => import('../components/Login/Login.vue') },
   { path: '/', redirect: { name: 'home' } },
   {
      path: '/app', name: 'app', component: AppWrapper,
      children: [
         { path: "home", name: 'home', component: () => import('../components/Home/Home.vue') },
         { path: 'tasks', name: 'tasks', component: () => import('../components/Tasks/Tasks.vue') },
         { path: 'products', name: 'products', component: () => import('../components/products/Products.vue') },
         { path: 'products/:id', name: 'product', component: () => import('../components/products/Product.vue') },
         { path: 'cart', name: 'cart', component: () => import('../components/Cart/Cart.vue') },
         { path: ':pathMatch(.*)*', name: 'NotFound', component: () => import('../components/Global/NotFound.vue') },
      ]
   },

];

export default routes;