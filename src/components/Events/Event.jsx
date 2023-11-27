import { Link, useParams } from "react-router-dom";
import { useEvents } from "../../hooks/useEvents";
import { Alert } from "../Alert";
import { DeleteModal } from "../DeleteModal";
import { useEvent } from "../../hooks/useEvent";
import { Tasks } from "../Tasks/Tasks";
import { Collaborators } from "../Collaborators/Collaborators";
import { useEffect } from "react";

export function Event() {
    const { 
        currentEvent,
        alert, handleDeleteEventModal,
        deleteEventModalState, deleteEvent,
        tasksCollaborators, setTasksCollaborators,
        handleEditEventModal, setCurrentEvent
    } = useEvents();

    const { id } = useParams();
    const { eventQuery } = useEvent(id);
    const eventData = eventQuery.data;

    const { msg } = alert;

    useEffect(() => {
        setCurrentEvent(eventData || {});
    }, [eventData])

    const handleAdd = () => {
        if(!tasksCollaborators) {

        } else {
            
        }
    }

    if(eventQuery.isLoading) return (
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
            <div  className="flex justify-center">
                    {
                        msg && <Alert alert={alert}/>
                    }
            </div>
            
            <section className="flex flex-col items-center sm:flex sm:flex-row sm:justify-between">
                <article className="flex gap-2 justify-center items-center">
                    <Link 
                        to="/events"
                        data-tooltip-target="tooltip-default"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </Link>

                    <h1 className="font-bold text-4xl mb-2">{eventQuery.data.name}</h1>
                </article>

                <article className="flex gap-4">
                    <div 
                        onClick={() => handleEditEventModal(currentEvent)}
                        className="flex gap-2 justify-center items-center
                        cursor-pointer hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>

                        <button className="uppercase font-bold">editar</button>
                    </div>

                    <div 
                        onClick={() => handleDeleteEventModal(currentEvent)}
                        className="flex gap-2 justify-center items-center
                        cursor-pointer hover:text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                        <button className="uppercase font-bold">eliminar</button>
                    </div>

                    <DeleteModal
                        state={deleteEventModalState}
                        handleDelete={handleDeleteEventModal}
                        deleteMethod={deleteEvent}
                        type={"Evento"}
                        msg={"Un evento eliminado no se podrá recuperar"}
                    />
                </article>
            </section>

            <section>

                <nav className="flex text-gray-500 mt-4
                justify-between">
                    <div className="flex gap-2">
                        <span 
                            onClick={() => setTasksCollaborators(false)}
                            className={`hover:text-black cursor-pointer
                            ${!tasksCollaborators ? "border-b border-b-green-500" : ""}`}>
                            Tareas
                        </span>
                        <span 
                            onClick={() => setTasksCollaborators(true)}
                            className={`hover:text-black cursor-pointer
                            ${tasksCollaborators ? "border-b border-b-green-500" : ""}`}>
                            Colaboradores
                        </span>
                    </div>

                    <article 
                        onClick={handleAdd}
                        className="hover:text-black cursor-pointer flex uppercase
                        items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span>Agregar</span>
                    </article>
                </nav>

                {
                    !tasksCollaborators 
                    ? (
                        <Tasks />
                    )
                    : (
                        <Collaborators />
                    )
                }

            </section>
        </>
    );
}