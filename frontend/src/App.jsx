import React, { useEffect } from "react";
import style from './App.module.scss'
import socketIO from 'socket.io-client';

// Routes
import { Routes, Route } from "react-router-dom";
import RoutesConfig from "./routes/routesConfig";
import Redirect from "./routes/redirect";

const socket = socketIO.connect('http://localhost:8080');


const App = () => {
	const AllRoutes = RoutesConfig();

	return (
		<div className={style.App}>
			<Routes>
				{AllRoutes.map((route, index) => {
					return (
						<Route
							key={index}
							path={route.path}
							element={<route.component socket={socket} />}
						/>
					);
				})}

				{/* WildCard Routes */}
				<Route path="*" element={<Redirect />} />
			</Routes>
		</div>
	);
};

export default App;