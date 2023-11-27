import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Search from "./Search";
import { useEvents } from "../hooks/useEvents";

export function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const { auth, logoutAuth } = useAuth();
    const { handleSearchContext, logoutEvents } = useEvents();

    const handleLogout = () => {
        logoutEvents();
        logoutAuth();
        localStorage.removeItem("token");
    }

    return(
        <header className="px-4 py-5 bg-white border-b">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-start">
                <Link
                    to="/events" 
                    className="text-4xl text-teal-600 font-black text-center
                    mb-5 md:mb-0 cursor-pointer">
                    Occasio
                </Link>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleSearchContext}
                        className="font-bold uppercase"
                    >
                        Buscar Evento
                    </button>
                
                    <div className="relative">
                        <div 
                            className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full
                            cursor-pointer" 
                            onClick={() => setDropdownVisible(!dropdownVisible)}>
                            <svg 
                                className="absolute w-12 h-12 text-gray-400 -left-1" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        fillRule="evenodd" 
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                                        clipRule="evenodd">
                                    </path>
                            </svg>
                        </div>

                        <div id="userDropdown" className={`z-10 ${dropdownVisible ? '' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 right-0`}>
                            <div className="px-4 py-3 text-sm text-gray-900">
                                <h3>{auth.name}</h3>
                                <p className="font-medium truncate">{auth.email}</p>
                            </div>
                            <div className="py-1">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                                        Sign out
                                </button>
                            </div>

                            <Search />
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}