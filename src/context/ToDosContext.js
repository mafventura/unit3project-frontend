import { useContext, createContext, useState, useCallback } from "react"
import axios from "axios"

export const ToDosContext = createContext()

export function useDiaries() {
    return useContext(ToDosContext)
}

export function ToDosProvider({children}) {



    return (
        <ToDosContext.Provider value={{
     
        }}>
            {children}
        </ToDosContext.Provider>
    )
}