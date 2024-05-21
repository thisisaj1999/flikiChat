import { useMemo } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import { useGlobalStore } from "../utils/store";

const RoutesConfig = () => {

	const State = {
		GlobalStore: {
			isAuthenticated: useGlobalStore((State) => State.isAuthenticated),
		},
	};

	return useMemo(() => {
		// public routes
		let routesArray = [];

		// protected routes
		if (State.GlobalStore.isAuthenticated) {
			routesArray = [
				...routesArray,
				{
					path: `/dashboard`,
					component: Dashboard,
					exact: true,
				},
			];
		}
		
		if(!State.GlobalStore.isAuthenticated) {
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
	}, [State.GlobalStore.isAuthenticated]);

	// return routes
};

export default RoutesConfig;