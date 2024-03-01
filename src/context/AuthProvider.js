import {useContext, useEffect, useState} from "react";
import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{auth: auth, setAuth: setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);

