import { useContext, createContext, useState, useCallback } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export const DailiesContext = createContext();

export function useDailies() {
  return useContext(DailiesContext);
}

export function DailiesProvider({ children }) {
  const { user } = useUser();
  const [hydrationLevel, setHydrationLevel] = useState(""); // 1 to 4 indicating hydration level
  const [mood, setMood] = useState("");
  const [sleepLevel, setSleepLevel] = useState(""); // 1 to 4 indicating sleep level
  const [quote, setQuote] = useState("");

  const [quicks, setQuicks] = useState([
    {
      water: "",
      mood: "",
      sleep: "",
      quote: "",
    },
  ]);

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

  async function deleteDaily(selectedDailyId) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/dailies/${selectedDailyId}`)
      .then(() => {
        setQuicks(quicks.filter((daily) => daily._id !== selectedDailyId));
        fetchQuicksData();
      })
      .catch((error) => console.error("Error deleting expense", error));
  }

  const fetchQuicksData = useCallback(async () => {
    try {
      // console.log("this is", user);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/dailies`,
        {
          headers: {
            "user-email": user.email,
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data;
      setQuicks(result);
      // console.log(quicks);
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  async function editDaily(selectedDailyId, updatedDaily) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/dailies/${selectedDailyId}`,
        updatedDaily
      );
      setQuicks([...quicks, response.data]);
    } catch (e) {
      console.log("Error editing quicks", e);
    }
  }

  const createDaily = async () => {
    try {
      if (
        hydrationLevel === "" ||
        mood === "" ||
        sleepLevel === "" ||
        quote === ""
      ) {
        alert("all fields required");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/dailies/add`,
        {
          water: hydrationLevel,
          mood,
          sleep: sleepLevel,
          quote,
        },
        {
          headers: {
            userEmail: user.email,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      console.log("Response from server:", response.data);
      fetchQuicksData();
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
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
        handleSleepChange,
        quicks,
        setQuicks,
        fetchQuicksData,
        deleteDaily,
        editDaily,
        createDaily
      }}
    >
      {children}
    </DailiesContext.Provider>
  );
}
