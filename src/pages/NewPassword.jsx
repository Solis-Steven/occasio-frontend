import { useEffect, useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { Alert, Input } from "../components";
import { axiosClient } from "../config/axiosClient";
import { Link, useParams } from "react-router-dom";

export function NewPassword() {
    const [password, setPassword] = useState("");
    const [validToken, setValidToken] = useState(false);
    const [modifiedPassword, setModifiedPassword] = useState(false);

    const { token } = useParams();

    const { alert, showAlert } = useEvents();

    useEffect(() => {
        const verifyToken = async() => {
            try {
                await axiosClient(`/users/forgot-password/${token}`);
                setValidToken(true);
                showAlert({
                    msg: data.msg,
                    error: true
                });
            } catch (error) {
                showAlert({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
        verifyToken();
    }, []);

    const { msg } = alert;

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(password.trim() === "") return;

        try {
            const { data } = await axiosClient.post(`/users/forgot-password/${token}`, {
                password
            });
            showAlert({
                msg: data.msg,
                error: false
            });
            setPassword("");
            setModifiedPassword(true);
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    return(
        <>
            <h1 className="text-teal-600 font-black text-6xl capitalize">
                Reestablece tu contrase&ntilde;a y no pierdas acceso a tus {""}
                <span className="text-slate-700">eventos</span>
            </h1>

            {
                msg && !validToken && (<Alert alert={alert}/>)
            }

            {
                validToken && (
                    
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white mt-10 shadow rounded-lg p-10"
                    >
                        <div className="flex flex-col gap-6">
                            <Input 
                                id={"password"}
                                type={"password"}
                                value={password}
                                setValue={setPassword}>
                                Nueva contrase&ntilde;a
                            </Input>
                        </div>

                        <button
                            type="submit"
                            className="border p-2 bg-teal-700 hover:bg-teal-800
                            text-white uppercase font-bold rounded transition-colors
                            duration-300 w-full mt-6"
                        >
                            Guardar nueva contrase&ntilde;a
                        </button>

                        {
                            msg && <Alert alert={alert}/>
                        }
                    </form>
                )
            }

            {
                modifiedPassword && (
                    <nav className="lg:flex lg:justify-between">
                        <Link
                            to="/"
                            className="block text-center my-5 text-slate-500 uppercase
                            text-sm hover:border-b-2 hover:border-slate-600
                            transition-colors duration-300">
                            Inicia Sesi&oacuten;
                        </Link>
                    </nav>
                )
            }

        </>
    );
}