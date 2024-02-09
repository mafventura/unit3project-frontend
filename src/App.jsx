import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./Components/AuthPage";
import Sidebar from "./Components/Sidebar";
import YearsAndMonthToDos from "./Components/todos/YearsAndMonthToDos";
import "./App.css";
import Home from "./Home";
import YearsAndMonthDailies from "./Components/Dailies/YearsAndMonthDailies";
import { useUser } from "./context/UserContext";
import { useToDos } from "./context/ToDosContext";
import { useDailies } from "./context/DailiesContext";
import YearsAndMonthSchedule from "./Components/schedule/YearsAndMonthSchedule";

function App() {
  const { todos, fetchData } = useToDos();
  const { user, setUser, getUser, handleLogout } = useUser();
  const { quicks, setQuicks, fetchQuicksData } = useDailies()



  useEffect(() => {
    getUser();
  }, []);


  return (
    <>
      {user ? (
        <div className="d-flex">
          <Sidebar user={user} handleLogout={handleLogout} />
          <Routes>
            <Route
              path="/schedule"
              element={
                <YearsAndMonthSchedule />
              }
            />
            <Route
              path="/todos"
              element={
                <YearsAndMonthToDos />
              }
            />
            <Route
              path="/dailies"
              element={
                <YearsAndMonthDailies fetchQuicksData={fetchQuicksData} quicks={quicks} />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  setUser={setUser}
                  getUser={getUser}
                  quicks={quicks}
                  setQuicks={setQuicks}
                  fetchQuicksData={fetchQuicksData}
                />
              }
            />
          </Routes>
        </div>
      ) : (
        <AuthPage
          user={user}
          setUser={setUser}
          handleClose={handleLogout}
          getUSer={getUser}
        />
      )}
    </>
  );
}

export default App;
