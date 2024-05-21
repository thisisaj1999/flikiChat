import { useMemo } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";

const RoutesConfig = () => {

	const User = false;

	return useMemo(() => {
		// public routes
		let routesArray = [];

		// protected routes
		if (User) {
			routesArray = [
				...routesArray,
				{
					path: `/dashboard`,
					component: Dashboard,
					exact: true,
				},
			];
		}
		
		if(!User) {
			routesArray = [
				...routesArray,
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
		}

		return routesArray;
	}, [User]);

	// return routes
};

export default RoutesConfig;