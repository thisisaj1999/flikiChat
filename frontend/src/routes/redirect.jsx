import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

const Redirect = () => {
  const user = useAuth()
	const navigate = useNavigate();
	
	useEffect(() => {
		if(user.token){
			navigate("/dashboard");
		} else if(!user.token){
			navigate("/login")
		}
	}, [user.token]);

	return null;
};

export default Redirect;