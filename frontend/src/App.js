import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import RoutesConfig from "./Routes/RoutesConfig";
import Redirect from "./Routes/Redirect";
import { useAuthUserStore } from "./store";

function App() {
	const State = {
		Auth: {
			isLoggedIn: useAuthUserStore((State) => State.isLoggedIn),
		},
	};

	const Update = {
		Auth: {
			setLoggedIn: useAuthUserStore((State) => State.setIsLoggedIn),
		},
	};

	const AllRoutes = RoutesConfig(State.Auth.isLoggedIn);

	return (
		<div className={styles.App}>
			{State.Auth.isLoggedIn && <SideBar />}
			<div className={styles.MainPage}>
				{State.Auth.isLoggedIn && <NavBar />}
				<Routes>
					{AllRoutes.map((route, index) => {
						return (
							<Route
								key={index}
								path={route.path}
								element={<route.component />}
							/>
						);
					})}

					{/* WildCard Routes */}
					<Route
						path="*"
						element={
							<Redirect isLoggedIn={State.Auth.isLoggedIn} />
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
