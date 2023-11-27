import { Link, useNavigate } from "react-router-dom";
import { Input, Alert } from "../components";
import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { axiosClient } from "../config/axiosClient";
import { useAuth } from "../hooks/useAuth";

// Login page
export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkedState, setCheckedState] = useState(false);

    const { setAuth } = useAuth();
    const { alert, showAlert } = useEvents();

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([email, password].includes("")) {
            showAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            })

            return;
        }

        try {
            const { data } = await axiosClient.post("/users/login", {email, password});
            showAlert({});
            localStorage.setItem("token", data.token);
            setAuth(data);
            navigate("/events");
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alert;

    return(
        <>
            <h1 className="text-teal-600 font-black text-6xl capitalize">
                Inicia sesión y administra tus {""}
                <span className="text-slate-700">eventos</span>
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white mt-10 shadow rounded-lg p-10"
            >
                <div className="flex flex-col gap-6">

                    <Input 
                        id={"email"}
                        value={email}
                        setValue={setEmail}>
                        Correo electr&oacute;nico
                    </Input>

                    <Input
                        id={"password"} 
                        type={checkedState ? "text" : "password"}
                        value={password}
                        setValue={setPassword}>
                        Contrase&ntilde;a
                    </Input>
                </div>

                <div className="flex items-center mt-4">
                    <input 
                        checked={checkedState}
                        id="checked-checkbox" 
                        type="checkbox" 
                        value="" 
                        onChange={() => setCheckedState(!checkedState)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 
                        border-gray-300 rounded focus:ring-blue-500 
                        focus:ring-2 dark:bg-gray-700 dark:border-gray-600
                        cursor-pointer" 
                    />
                    <label 
                        htmlFor="checked-checkbox" 
                        className="ml-2 text-sm font-medium text-gray-900 
                        dark:text-gray-300 cursor-pointer">
                            Mostrar Contrase&ntilde;a
                    </label>
                </div>

                <button
                    type="submit"
                    className="border p-2 bg-teal-700 hover:bg-teal-800
                    text-white uppercase font-bold rounded transition-colors
                    duration-300 w-full mt-6"
                >
                    Iniciar Sesi&oacute;n
                </button>

                {
                    msg && <Alert alert={alert}/>
                }
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/create-account"
                    className="block text-center my-5 text-slate-500 uppercase
                    text-sm hover:border-b-2 hover:border-slate-600
                    transition-colors duration-300">
                    ¿No tienes una cuenta? <strong>Reg&iacute;strate</strong>
                </Link>

                <Link 
                    to="/forgot-password"
                    className="block text-center my-5 text-slate-500 uppercase
                    text-sm hover:border-b-2 hover:border-slate-600
                    transition-colors duration-300">
                    Olvid&eacute; Mi Contrase&ntilde;a
                </Link>
            </nav>
        </>
    );
}