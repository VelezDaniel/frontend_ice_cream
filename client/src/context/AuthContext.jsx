import { createContext, useState } from "react";

export const AuthContext = createContext();

// Creacion de provider (componente que engloba otros componentes)
export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null)

  const signup = (user) => {
    
  }

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
} 