
/* This componente generates an alert to display
something (error or not)

Props: 
    - alert -> object
*/
export function Alert({alert}) {
    return(
        <div className={`${alert.error 
            ? "from-red-400 to-red-600" 
            : "from-green-400 to-green-600"} 
            bg-gradient-to-br text-center p-3 rounded-sm uppercase
            text-white font-bold text-sm my-4`}>
            {alert.msg}
        </div>
    );
}