import React from "react";
import style from './App.module.scss'

// Components
import Dashboard from './layouts/Dashboard'
import Register from './layouts/Auth/Register'
import Login from './layouts/Auth/Login'

// Routes
import AuthProvider from "./utils/AuthProvider";
import { Route, Routes } from "react-router-dom";
import Redirect from "./routes/redirect";
import PrivateRoute from "./routes/PrivateRoute";


const App = () => {

	return (
		<div className={style.App}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
						
            {/* Other routes */}
						<Route path="*" element={<Redirect />}/>
          </Routes>
        </AuthProvider>
		</div>
	);
};

export default App;