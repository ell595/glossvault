import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/home', component: () => import('../views/Home.vue') },
    { path: '/register', component: () => import('../views/Register.vue') },
    { path: '/login', component: () => import('../views/Login.vue') },
    { path: '/dashboard', component: () => import('../views/Dashboard.vue') },
    { path: '/collections/:id', component: () => import('../views/CollectionPage.vue'), name: "collection" }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
