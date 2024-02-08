import { useContext, createContext, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export const ScheduleContext = createContext();

export function useSchedule() {
    return useContext(ScheduleContext);
}

export function ScheduleProvider({ children }) {
    const { user } = useUser();
    const [schedule, setSchedule] = useState([
        {
            date: new Date(),
            time: ["10:00", "11:00"],
            event: "",
        }
    ])

    const [newSchedule, setNewSchedule] = useState({
        date: new Date(),
        time: ["10:00", "11:00"],
        event: "",
    });

    const getSchedule = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/schedules`,
                {
                    headers: {
                        "user-email": user.email,
                        "Content-Type": "application/json",
                    },
                }
            );
            const result = response.data;
            setSchedule(result);
            // console.log(quicks);
        } catch (e) {
            console.error(e);
        }
    }, [user]);

    function handleChangeCreate(name, value) {
        setNewSchedule({
            ...newSchedule,
            [name]: value,
        });
    }


    async function addSchedule(e) {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/schedules/add`,
                newSchedule,
                {
                    headers: {
                        "user-email": user.email,
                        "Content-Type": "application/json",
                    },
                }
            );
            setNewSchedule({
                date: new Date(),
                time: ["10:00", "11:00"],
                event: "",
            });
            getSchedule();
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <ScheduleContext.Provider
            value={{
                schedule,
                setSchedule,
                getSchedule,
                addSchedule,
                newSchedule,
                setNewSchedule,
                handleChangeCreate
            }}
        >
            {children}
        </ScheduleContext.Provider>
    );
}