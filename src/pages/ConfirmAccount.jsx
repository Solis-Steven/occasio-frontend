import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert } from "../components";
import { useEvents } from "../hooks/useEvents";
import { axiosClient } from "../config/axiosClient";

export function ConfirmAccount() {
    const [confirmedAccount, setConfirmedAccount] = useState(false);

    const { token } = useParams();
    const { alert, showAlert } = useEvents();

    const { msg } = alert;

    useEffect(() => {
        const confirmAccount = async() => {
            try {
                const { data } = await axiosClient(`/users/confirm/${token}`);
                showAlert({
                    msg: data.msg,
                    error: false
                });
                setConfirmedAccount(true);
            } catch (error) {
                showAlert({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        }
        confirmAccount();
    }, [])

    return(
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Confirma tu cuenta y comienza a administrar tus {""}
                <span className="text-slate-700">eventos</span>
            </h1>

            <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 bg-white rounded">
                {
                    msg && (<Alert alert={alert}/>)
                }

                {
                    confirmedAccount && (
                        <Link
                            to="/"
                            className="block text-center my-5 text-slate-500 uppercase
                            text-sm">
                            Inicia Sesi&oacute;n
                        </Link>
                    )
                }
            </div>
        </>
    );
}