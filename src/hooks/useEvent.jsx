import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserEvent, updateUserEvent } from "../services/events.services";

const getEventInfo = async(id) => {
    const data =  await getUserEvent(id);

    return data;
}

export const useEvent = (id) => {

    const eventQuery = useQuery(
        ["event", id],
        () => getEventInfo(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const updateMutation = useMutation(
        (event) => updateUserEvent(event),
        {
          // This option will refetch the storeQuery after the mutation is successful, to update the data.
          onSettled: () => eventQuery.refetch(),
          enabled: eventQuery.data !== undefined,
        },
    );

    const updateExistingEvent = async (event) => {
        try {
          await updateMutation.mutateAsync(event);
        } catch (error) {
          console.error("Error updating store:", error);
          throw error;
        }
    };

    return {
        eventQuery,
        updateExistingEvent
    }
}