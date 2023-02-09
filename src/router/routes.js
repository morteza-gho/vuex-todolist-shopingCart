import Home from "../components/Home/Home.vue";

const routes = [
   { path: "/", name: 'home', component: Home },
   { path: '/tasks', name: 'tasks', component: () => import('../components/Tasks/Tasks.vue') },
   { path: '/products', name: 'products', component: () => import('../components/products/Products.vue') },
   { path: '/products/:id', name: 'product', component: () => import('../components/products/Product.vue') },
   { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/Global/NotFound.vue') },
];

export default routes;