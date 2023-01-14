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
                path: "/cash",
                component: () => import("../pages/Cash.vue"),
            },
            {
                path: "/deposits",
                component: () => import("../pages/DepositsPage.vue"),
            },
        ],
    },
];
