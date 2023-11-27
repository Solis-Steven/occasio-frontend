import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { EventsModal, Header } from "../components";
import { Sidebar } from "./sidebar/Sidebar";

export function ProtectedRoute() {
    const { auth, loading } = useAuth();

    if(loading) return("Loading...");
    
    return(
        <>
            {
                auth._id 
                    ? (
                        <div className="bg-gray-100">
                            <Header />

                            <div className="md:flex md:min-h-screen">
                                <Sidebar />

                                <main className="flex-1 p-10">
                                    <Outlet />
                                </main>
                            </div>
                        </div>
                    )
                    : <Navigate to="/" />
            }

            <EventsModal />
        </>
    );
}