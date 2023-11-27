import { useState, useEffect, createContext } from "react";
import { axiosClient } from "../config/axiosClient";
import { useQueryClient } from "@tanstack/react-query";

// Provides state of user

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    
    const queryClient = useQueryClient();
    
    const logoutAuth = () => {
        setAuth({});
        queryClient.clear();
    }

    // Verify if the token is valid
    useEffect(() => {
        const autenticarUsuario = async() => {
            const token = localStorage.getItem("token");
            
            if(token) {
                const config = {
                    headers: {
                        "Content-Type":  "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                try {
                    const { data } = await axiosClient("/users/profile", config);
                    setAuth(data);
                    // navigate("/events")
                } catch (error) {
                    setAuth({});
                    console.log("Error al autenticar usuario: ", error);
                }

            }
            setLoading(false);
        }
        autenticarUsuario();
    }, []);

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logoutAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;