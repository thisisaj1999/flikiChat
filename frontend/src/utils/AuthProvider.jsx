import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "./requests";
import axios from "axios";
import { useGlobalStore } from "./store";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const Update = {
    Global: {
      userGroups: useGlobalStore((State) => State.setUserGroups)
    }
  }

  const userLogin = async (payload) => {
    try {
      if (payload) {
        const response = await axios.post(Endpoints.LOGIN_USER, payload);
        const responseData = response.data;

        if(responseData?.status === 200){
          setUser(responseData?.data?.data);
          setToken(responseData?.data?.accessToken);
          localStorage.setItem("site", responseData?.data?.accessToken);
          Update.Global.userGroups(responseData?.data?.groups)
          localStorage.setItem("userGroups", JSON.stringify(responseData?.data?.groups));
          navigate("/dashboard");
        }
        return responseData;
      }
    } catch (error) {
      console.error(
        "userLogin: Failed to fetch the user data:",
        error.message
      );
    }
  };

  const registerUser = async (payload) => {
    try {
      if (payload) {
        const response = await axios.post(Endpoints.REGISTER_USER, payload);
        const responseData = response.data;

        if(responseData?.status === 200){
          setUser(responseData?.data?.data);
          setToken(responseData?.data?.accessToken);
          localStorage.setItem("site", responseData?.data?.accessToken);
          Update.Global.userGroups(responseData?.data?.groups)
          localStorage.setItem("userGroups", JSON.stringify(responseData?.data?.groups));
          navigate("/dashboard");
        }
        return responseData;
      }
    } catch (error) {
      console.log("registerUser: Failed to register the user:", error.message);
      return;
    }
  };
  

  const logOutUser = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, userLogin, logOutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};