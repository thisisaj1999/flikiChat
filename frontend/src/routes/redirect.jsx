import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {

	const navigate = useNavigate();
	
	useEffect(() => {
		navigate("/login");
	}, []);

	return null;
};

export default Redirect;