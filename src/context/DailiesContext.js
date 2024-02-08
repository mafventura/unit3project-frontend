import { useContext, createContext, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export const DailiesContext = createContext();

export function useDailies() {
    return useContext(DailiesContext);
}

export function DailiesProvider({ children }) {

    const [hydrationLevel, setHydrationLevel] = useState(1); // 1 to 4 indicating hydration level
    const [mood, setMood] = useState("");
    const [sleepLevel, setSleepLevel] = useState(0); // 1 to 4 indicating sleep level
    const [quote, setQuote] = useState("");

    const handleHydrationChange = (event) => {
        setHydrationLevel(event.target.value);
    };

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    const handleSleepChange = (event) => {
        setSleepLevel(event.target.value);
    };

    const handleQuoteChange = (event) => {
        setQuote(event.target.value);
    };

    return (
        <DailiesContext.Provider
            value={{
                hydrationLevel,
                setHydrationLevel,
                mood,
                setMood,
                sleepLevel,
                setSleepLevel,
                quote,
                setQuote,
                handleHydrationChange,
                handleMoodChange,
                handleQuoteChange,
                handleSleepChange
            }}
        >
            {children}
        </DailiesContext.Provider>
    )
}