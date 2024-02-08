import { useContext, createContext, useState, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UsersProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });

      setUser(data?.user?._json);
    } catch (e) {
      console.error(e);
    }
  }

  const googleAuth = useCallback(() => {
    window.open(
        `${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`,
        '_self'
    )
}, [])

  const handleLogout = async () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
  };

  return (
    <UserContext.Provider value={{
        user,
        setUser,
        getUser,
        handleLogout,
        googleAuth
    }}
    >
        {children}
    </UserContext.Provider>
    );
}