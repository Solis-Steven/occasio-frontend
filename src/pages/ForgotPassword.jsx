import { useState } from "react";
import { Alert, Input } from "../components";
import { useEvents } from "../hooks/useEvents";
import { Link } from "react-router-dom";
import { axiosClient } from "../config/axiosClient";

export function ForgotPassword() {
    const [email, setEmail] = useState("");

    const { alert, showAlert } = useEvents();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(email.trim() === "") return;

        try {
            const { data } = await axiosClient.post(`/users/forgot-password`, {email});
            await showAlert({
                msg: data.msg,
                error: false
            });
            setEmail("");
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
                Recupera tu contrase&ntilde;a y administra tus {""}
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
                </div>

                <button
                    type="submit"
                    className="border p-2 bg-teal-700 hover:bg-teal-800
                    text-white uppercase font-bold rounded transition-colors
                    duration-300 w-full mt-6"
                >
                    Enviar correo
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
                    to="/"
                    className="block text-center my-5 text-slate-500 uppercase
                    text-sm hover:border-b-2 hover:border-slate-600
                    transition-colors duration-300">
                    ¿Ya tienes una cuenta? <strong>Inicia Sesi&oacute;n</strong>
                </Link>
            </nav>
        </>
    );
}