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
                path: "/cash",
                component: () => import("../pages/CashPage.vue"),
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
                path: "/financial-knowledge",
                component: () => import("../pages/FinancialKnowledgePage.vue"),
            },
        ],
    },
    {
        path: "/import",
        component: () => import("../layouts/ImportLayout.vue"),
        children: [
            {
                path: "step-one",
                component: () => import("../components/MImportStepOne.vue"),
            },
            {
                path: "step-two",
                component: () => import("../components/MImportStepTwo.vue"),
            },
            {
                path: "step-three",
                component: () => import("../components/MImportStepThree.vue"),
            },
        ],
    },
];
