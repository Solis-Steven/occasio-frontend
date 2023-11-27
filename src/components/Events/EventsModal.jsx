import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useEvents } from "../../hooks/useEvents";
import { Alert } from "../Alert";
import { useEvent } from "../../hooks/useEvent";


export function EventsModal() {
    const [eventId, setEventId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [customer, setCustomer] = useState("");
    
    const { 
        showAlert, createEvent, alert,
        currentEvent, handleEventModal, eventModal,
        setEventModal
    } = useEvents();

    // const { updateExistingEvent } = useEvent();

    const { msg  } = alert;

    useEffect(() => {
        if(currentEvent._id) {
            const { _id, name, description, date, customer } = currentEvent;
            setEventId(_id);
            setName(name);
            setDescription(description);
            setDate(date?.split("T")[0]);
            setCustomer(customer);

            return;
        }

        setEventId("");
        setName("");
        setDescription("");
        setDate("");
        setCustomer("");
    }, [currentEvent])

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([name, description, date, customer].includes("")) {
            showAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            });

            return;
        }

        if(eventId) {
            // TODO Hacer funcionalidad de editar
            // await updateExistingEvent({id: eventId, name, description, date, customer});
            setEventModal(false);
        } else {
            await createEvent({name, description, date, customer});
        }
        setEventId("");
        setName("");
        setDescription("");
        setDate("");
        setCustomer("");
    }

    return(
        <Transition.Root show={ eventModal } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleEventModal }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleEventModal  }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {eventId ? "Editar Evento" : "Crear Evento"}
                                    </Dialog.Title>

                                    <form 
                                        onSubmit={handleSubmit}
                                        className="my-10"
                                    >
                                        
                                        <div className="mb-5">
                                            <label 
                                                htmlFor="name"
                                                className="text-gray-700 uppercase font-bold text-sm"
                                            >
                                                Nombre Evento
                                            </label>
                                            <input 
                                                id="name"
                                                type="text" 
                                                placeholder="Nombre del evento"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label 
                                                htmlFor="description"
                                                className="text-gray-700 uppercase font-bold text-sm"
                                            >
                                                Descripci&oacute;n Evento
                                            </label>
                                            <textarea 
                                                id="description"
                                                placeholder="Descripción del evento"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label 
                                                htmlFor="date-event"
                                                className="text-gray-700 uppercase font-bold text-sm"
                                            >
                                                Fecha Evento
                                            </label>
                                            <input 
                                                id="date-event"
                                                type="date"
                                                value={date}
                                                onChange={e => setDate(e.target.value)}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label 
                                                htmlFor="customer"
                                                className="text-gray-700 uppercase font-bold text-sm"
                                            >
                                                Nombre Cliente
                                            </label>
                                            <input 
                                                id="customer"
                                                type="text" 
                                                placeholder="Nombre del cliente"
                                                value={customer}
                                                onChange={e => setCustomer(e.target.value)}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            />
                                        </div>

                                        <input 
                                            type="submit"
                                            value={eventId ? "Guardar Cambios" : "Crear Evento"}
                                            className="bg-teal-600 hover:bg-teal-700 w-full 
                                            p-3 text-white uppercase font-bold cursor-pointer
                                            transition-colors rounded text-sm"
                                        />

                                        {
                                            msg && <Alert alert={alert}/>
                                        }
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}