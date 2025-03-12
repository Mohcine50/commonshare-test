import { createRouter, createWebHistory } from 'vue-router';
import Home from "../pages/Home.vue";
import Companies from "../pages/Companies.vue";
import ContactUs from "../pages/ContactUs.vue";
import Login from "../pages/Login.vue";



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/companies',
        name: 'Companies',
        component: Companies,
    },
    {
        path: '/contact-us',
        name: 'ContactUs',
        component: ContactUs,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;