export const routes = [
    {
        path: "/",
        component: () => import("../layouts/MainLayout.vue"),
        children: [
            {
                path: "/",
                component: () => import("../pages/HomePage.vue"),
            },
            {
                path: "/deposits",
                component: () => import("../pages/DepositsPage.vue"),
            },
            {
                path: "/purchase",
                component: () => import("../pages/PurchasePage.vue"),
            },
            {
                path: "/sell",
                component: () => import("../pages/SellPage.vue"),
            },
            {
                path: "/order-management",
                component: () => import("../pages/OrderManagementPage.vue"),
            },
            {
                path: "/granary",
                component: () => import("../pages/GranaryPage.vue"),
            },
            {
                path: "/fixed-assets",
                component: () => import("../pages/FixedAssetsPage.vue"),
            },
            {
                path: "/tools",
                component: () => import("../pages/ToolsPage.vue"),
            },
            {
                path: "/tax",
                component: () => import("../pages/TaxPage.vue"),
            },
            {
                path: "/worth",
                component: () => import("../pages/WorthPage.vue"),
            },
            {
                path: "/overall",
                component: () => import("../pages/OverallPage.vue"),
            },
            {
                path: "/fund",
                component: () => import("../pages/FundPage.vue"),
            },
            {
                path: "/report",
                component: () => import("../pages/ReportPage.vue"),
            },
            {
                path: "/financial-analysis",
                component: () => import("../pages/FinancialAnalysisPage.vue"),
            },
            {
                path: "/category",
                component: () => import("../pages/CategoryPage.vue"),
            },
            {
                path: "/account-system",
                component: () => import("../pages/AccountSystemPage.vue"),
            },
        ],
    },
    {
        path: "/pay",
        component: () => import("../layouts/SecondLayout.vue"),
        children: [
            {
                path: "pay-detail",
                component: () => import("../pages/PaymentDetailsPage.vue"),
            },
        ]
    },
    {
        path: "/cash",
        component: () => import("../layouts/TabRouterLayout.vue"),
        children: [
            {
                path: "procedure",
                component: () => import("../pages/ProcedurePage.vue"),
            },
            {
                path: "pay",
                component: () => import("../pages/PayPage.vue"),
            },
        ],
    },
];
