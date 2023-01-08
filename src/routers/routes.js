export const routes = [
    {
        path: "/",
        component: () => import("../layouts/MainLayout.vue"),
        children: [
            {
                path: "/",
                component: () => import("../pages/Home.vue"),
            },
            {
                path: "/about",
                component: () => import("../pages/About.vue"),
            },
        ],
    },
];
