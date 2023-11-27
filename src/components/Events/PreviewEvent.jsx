import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../utilities/formatDate";

export function PreviewEvent({event}) {
    
    return(
        <div className="border-b p-5 flex flex-col md:flex-row justify-between items-center">

            <div className="flex flex-col">
                <h2 className="font-bold text-lg">Nombre: {event.name}</h2>
                <p className="text-sm text-gray-500">Fecha: {formatDate(event.date)}</p>
            </div>
            
            <Link
                to={`${event._id}`}
                className="text-gray-500 hover:text-black"
            >
                Ver Detalles
            </Link>
        </div>
    );
}