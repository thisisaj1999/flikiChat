import { useMemo } from "react";
import Login from "../layouts/Auth/Login";
import Register from "../layouts/Auth/Register";
import Dashboard from "../layouts/Dashboard";
import UpdateUser from "../layouts/UpdateUser";
import AddUser from "../layouts/AddUser";

const RoutesConfig = (isLoggedIn) => {
	return useMemo(() => {
		// public routes
		let routes = [
			{
				path: `/login`,
				component: Login,
				exact: true,
			},
			{
				path: `/register`,
				component: Register,
				exact: true,
			},
		];

		// protected routes
		if (isLoggedIn) {
			routes = [
				...routes,
				{
					path: `/dashboard`,
					component: Dashboard,
					exact: true,
				},
				{
					path: `/add-user`,
					component: AddUser,
					exact: true,
				},
				{
					path: `/edit-user`,
					component: UpdateUser,
					exact: true,
				},
			];
		}

		return routes;
	}, [isLoggedIn]);
};

export default RoutesConfig;
