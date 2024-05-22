import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../utils/store";

const Redirect = () => {

	const State = {
		GlobalStore: {
			isAuthenticated: useGlobalStore((State) => State.isAuthenticated),
		},
	};

	const navigate = useNavigate();
	
	useEffect(() => {
		if(State.GlobalStore.isAuthenticated){
			navigate("/dashboard");
		} else if(!State.GlobalStore.isAuthenticated){
			navigate("/login")
		}
	}, [, State.GlobalStore.isAuthenticated]);

	return null;
};

export default Redirect;