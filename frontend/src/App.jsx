import React from "react";
import style from './App.module.scss'
import socketIO from 'socket.io-client';

import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'

// Routes
import AuthProvider from "./utils/AuthProvider";
import { Route, Routes } from "react-router-dom";
import Redirect from "./routes/redirect";
import PrivateRoute from "./routes/PrivateRoute";


const App = () => {

	const socket = socketIO.connect('http://localhost:8080');

	return (
		<div className={style.App}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard socket={socket}/>} />
            </Route>
						
            {/* Other routes */}
						<Route path="*" element={<Redirect />}/>
          </Routes>
        </AuthProvider>
		</div>
	);
};

export default App;