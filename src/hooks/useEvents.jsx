import { useContext } from "react";
import EventsContext from "../context/EventsProvider";

// Allows you to use EventsProvier
export const useEvents = () => {
    return(useContext(EventsContext));
}