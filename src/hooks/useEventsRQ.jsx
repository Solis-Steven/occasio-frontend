import { useQuery, useMutation } from "@tanstack/react-query";
import { createUserEvent, deleteUserEvent, getUserEvents } from "../services/events.services";

export const useEventsRQ = () => {

    const eventsQuery = useQuery(
        ["events"],
        () => getUserEvents(),
        {
            refetchOnWindowFocus: false,
        }
    );

    const createMutation = useMutation(
        (newEvent) => createUserEvent(newEvent),
        {
            onSuccess: () => {
                eventsQuery.refetch(); // Refetch the "events" query after the mutation is successful
            },
            enabled: eventsQuery.data !== undefined,
        }
    );
    
    const deleteMutation = useMutation(
        (eventId) => deleteUserEvent(eventId),
        {
            onSuccess: () => {
                eventsQuery.refetch(); // Refetch the "events" query after the mutation is successful
            },
            enabled: eventsQuery.data !== undefined,
        }
    );

    const createNewEvent = async (newEvent) => {
        try {
            await createMutation.mutateAsync(newEvent);
        } catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    };

    const deleteJustEvent = async (eventId) => {
        try {
          await deleteMutation.mutateAsync(eventId);
        } catch (error) {
          console.error("Error deleting event:", error);
          throw error;
        }
    }

    return {
        eventsQuery,
        createNewEvent,
        deleteJustEvent,
    }
}