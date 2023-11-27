import { axiosClient } from "../config/axiosClient";

export const getUserEvents = async() => {
    try {
        const token = localStorage.getItem("token");
        
        if(!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        const { data } = await axiosClient("/events", config);
        return(data);
    } catch (error) {
        return(error);
    }
}

export const createUserEvent = async(event) => {
    try {
        const token = localStorage.getItem("token");

        if(!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axiosClient.post("/events", event, config);
        return(data)
    } catch (error) {
        throw error;
    }
}

export const getUserEvent = async(id) => {
    try {
        const token = localStorage.getItem("token");

        if(!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axiosClient(`/events/${id}`, config);
        return(data);
    } catch (error) {
        throw error
    }
}

export const deleteUserEvent = async(id) => {
    try {
        const token = localStorage.getItem("token");

        if(!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = axiosClient.delete(`/events/${id}`, config);
        return(data);
    } catch (error) {
        throw error
    }
}

export const updateUserEvent = async(event) => {
    try {
        const token = localStorage.getItem("token");

        if(!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        console.log({event, config});

        const { data } = axiosClient.put(`/events/${event.id}`, event, config);
        return(data);
    } catch (error) {
        throw error
    }
}