import { useEffect } from "react";
import { PreviewEvent } from "../components";
import { useEvents } from "../hooks/useEvents";
import { useEventsRQ } from "../hooks/useEventsRQ";

export function Events() {
    const { 
        events, loading, handleEventModal, 
        setCurrentEvent, getEvents, setLoading
    } = useEvents();

    const { eventsQuery } = useEventsRQ();
    const eventsData = eventsQuery.data;
    
    useEffect(() => {
        getEvents(eventsData);
        setLoading(false);
    }, [eventsData]);

    

    if(loading) return (
        <div role="status" className="flex justify-center">
            <svg aria-hidden="true" className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );

    return(
        <>
            <h1 className="text-center text-2xl uppercase font-bold">Mis Eventos</h1>
            
            {/* TODO hacer una barra de progreso */}

            <button
                type="button"
                onClick={() => {
                    setCurrentEvent({});
                    handleEventModal();
                }}
                className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold
                bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center
                hover:bg-sky-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nuevo Evento
            </button>
            <div className="bg-white shadow mt-10 rounded-lg">
                {
                    events?.length
                        ? events.map(event => (
                            <PreviewEvent 
                                key={event._id}
                                event={event}
                            />
                        ))
                        : (<p className="text-center text-gray-600 uppercase p-5">No hay eventos a&uacute;n</p>)          
                }
            </div>
        </>
    );
}