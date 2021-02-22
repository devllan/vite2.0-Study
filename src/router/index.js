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
			redirect: "/login"

		},
		{
			path: "/home",
			component: () => import("../views/HellowWord.vue"),
		},
		{
			path: "/login",
			component: () => import("../views/login.vue"),
		},
	],
});