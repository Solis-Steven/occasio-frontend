import { Link } from "react-router-dom";
import { Input, Alert } from "../components";
import { useState } from "react";
import { axiosClient } from "../config/axiosClient";
import { useEvents } from "../hooks/useEvents"


// Create account page
export function CreateAccount() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const { alert, showAlert } = useEvents();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([name, email, password, passwordRepeat].includes("")) return;

        if(password !== passwordRepeat) {
            showAlert({
                msg: "Las contraseñas deben ser iguales",
                error: true
            });
            return;
        }

        try {
            const { data } = await axiosClient.post("/users", {name, email, password});
    
            showAlert({
                msg: data.msg,
                error: false
            })

            setName("");
            setEmail("");
            setPassword("");
            setPasswordRepeat("");
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
                Crea una cuenta y administra tus {""}
                <span className="text-slate-700">eventos</span>
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white mt-10 shadow rounded-lg p-10"
            >
                <div className="flex flex-col gap-6">

                    <Input 
                        id={"name"}
                        value={name}
                        setValue={setName}>
                        Nombre y apellido
                    </Input>

                    <Input 
                        id={"email"}
                        value={email}
                        setValue={setEmail}>
                        Correo electr&oacute;nico
                    </Input>

                    <Input
                        id={"password"} 
                        type={"password"}
                        value={password}
                        setValue={setPassword}>
                        Contrase&ntilde;a
                    </Input>

                    <Input
                        id={"password-repeat"} 
                        type={"password"}
                        value={passwordRepeat}
                        setValue={setPasswordRepeat}>
                        Repite tu contrase&ntilde;a
                    </Input>
                </div>

                <button
                    type="submit"
                    className="border p-2 bg-teal-700 hover:bg-teal-800
                    text-white uppercase font-bold rounded transition-colors
                    duration-300 w-full mt-6"
                >
                    Crear Cuenta
                </button>

                {
                    msg && <Alert alert={alert}/>
                }
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/"
                    className="block text-center my-5 text-slate-500 uppercase
                    text-sm hover:border-b-2 hover:border-slate-600
                    transition-colors duration-300">
                    ¿Ya tienes una cuenta? <strong>Inicia Sesi&oacute;n</strong>
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