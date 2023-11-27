import { Outlet } from "react-router-dom";

/* First layout (is only displayed if the user is 
in no unprotected route)
*/
export function AuthLayout() {
    return(
        <>
            <main className="container mx-auto mt-5 md:mt-20 p-5 
            md:flex md:justify-center">
                <div className="md:w-2/3 lg:w-2/5">
                    <Outlet />
                </div>
            </main>
        </>
    );
}