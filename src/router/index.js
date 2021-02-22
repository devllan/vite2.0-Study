import {
    createRouter,
    createWebHashHistory
} from "vue-router";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        // 默认跳转
        {
            path: "",
            redirect: "/home"

        },
        {
            path: "/home",
            component: () => import("../views/HellowWord.vue"),
        },
    ],
});