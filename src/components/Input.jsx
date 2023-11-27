import { useState } from "react";

/* This component represents an input

Props:
    - type -> input type
    - id -> input id and htmlFor
    - value -> input value
    - setValue -> onChange function
*/
export const Input = ({
    children, 
    type = "text", 
    id,
    value,
    setValue}) => {

    const [error, setError] = useState(false);

    const handleValue = () => {
        if(value.trim() === "") {
            setError(true);
            return;
        }

        setError(false);
    }

    return(
        <div>
            <div className="relative">
                <input 
                    type={type} 
                    id={id} 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={handleValue}
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent 
                    rounded-lg borde appearance-none focus:outline-none focus:ring-0 peer
                    border
                    ${error ? "border-red-600 text-red-600 focus:border-red-600" 
                    : "border-gray-300 text-gray-900 focus:border-teal-600"}`}
                    placeholder=" " />
                <label 
                    htmlFor={id} 
                    className={`absolute text-sm text-gray-500 dark:text-gray-400 
                    duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
                    bg-white px-2 peer-focus:px-2 
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                    peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1
                    ${error ? "text-red-600 peer-focus:text-red-600" : "text-gray-500 peer-focus:text-teal-600"}`}>
                        {children}
                </label>
            </div>

            {
                error && 
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500 mt-2">
                            <path strokeLinecap="round" strokeLinejoin="round" 
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>

                        <p 
                            id="filled_success_help" 
                            className="mt-2 text-xs text-red-600 dark:text-red-400 text-center">
                            Este campo es obligatorio
                        </p>
                    </div>
            }
        </div>
    );
}