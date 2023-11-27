import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEventsRQ } from "../hooks/useEventsRQ";

// Provides a global state of events
const EventsContext = createContext();

export const EventsProvider = ({children}) => {
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({});

    const [alert, setAlert] = useState({});
    const [searchContext, setSearchContext] = useState(false);
    const [loading, setLoading] = useState(true);
    const [eventModal, setEventModal] = useState(false);
    const [deleteEventModalState, setDeleteEventModalState] = useState(false);
    const [tasksCollaborators, setTasksCollaborators] = useState(false);

    const { 
        createNewEvent, deleteJustEvent, 
    } = useEventsRQ();

    const navigate = useNavigate();

    const getEvents = (events) => {
        setEvents(events);
    }

    /**
     * This function takes a new event and sends 
     * request to endponint to create new event
     * @param {object} event 
     * @returns 
     */
    const createEvent = async(event) => {
        try {
            await createNewEvent(event);
            setEventModal(false);
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });   
        }
    }

    /**
     * Delete event by id
     * @param {string} id 
     */
    const deleteEvent = async(id) => {
        try {
            deleteJustEvent(id);
            const newEvents = events.filter(eventState => eventState._id !== id);
            setEvents(newEvents);
            setDeleteEventModalState(false);
            navigate("/events");
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    /**
     * Show alert (error or not)
     * @param {Object} newAlert 
     */
    const showAlert = (newAlert) => {
        setAlert(newAlert);
        setTimeout(() => {
            setAlert({});
        }, 3000)
    }

    /**
     * Managment search modal
     */
    const handleSearchContext = () => {
        setSearchContext(!searchContext);
    }

    /**
     * When you press botton "cerrar sesion"
     */
    const logoutEvents = () => {
        setEvents([]);
        setCurrentEvent({});
    }

    const handleEventModal = () => {
        setEventModal(!eventModal);
    }

    const handleDeleteEventModal = (event = {}) => {
        setCurrentEvent(event);
        setDeleteEventModalState(!deleteEventModalState);
    }

    const handleEditEventModal = (event = {}) => {
        setEventModal(true);
        setCurrentEvent(event);
    }

    return(
        <EventsContext.Provider
            value={{
                events,
                getEvents,
                currentEvent,
                setCurrentEvent,

                alert,
                showAlert,
                searchContext,
                handleSearchContext,
                logoutEvents,
                loading,
                createEvent,
                eventModal,
                handleEventModal,
                deleteEvent,
                deleteEventModalState,
                handleDeleteEventModal,
                tasksCollaborators,
                setTasksCollaborators,
                handleEditEventModal,
                setLoading,
                setEventModal
            }}
        >
            {children}
        </EventsContext.Provider>
    );
}

export default EventsContext;