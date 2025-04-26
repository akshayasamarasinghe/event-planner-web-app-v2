import {createContext, ReactNode, useContext} from "react";
import {LOGGED_IN_USER, LOGGED_IN_USER_TYPE} from "../../constants/constants.ts";

// Define Auth Context
interface AuthContextType {
    user: any;
    userType: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Provide Auth Context
export const AuthProvider = ({children}: { children: ReactNode }) => {
    const user = localStorage.getItem(LOGGED_IN_USER) ? localStorage.getItem(LOGGED_IN_USER) : null;
    const userType = localStorage.getItem(LOGGED_IN_USER_TYPE) ? localStorage.getItem(LOGGED_IN_USER_TYPE) : null;
    //
    // const login = (userData: any) => {
    //     setUser(userData);
    //     localStorage.setItem("user", JSON.stringify(userData)); // Store user in local storage
    // };
    //
    // const logout = () => {
    //     setUser(null);
    //     localStorage.removeItem("user");
    // };

    return <AuthContext.Provider value={{user, userType}}>{children}</AuthContext.Provider>;
};

// Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};
