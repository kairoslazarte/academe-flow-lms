import { createContext, useContext, useState } from "react";

export const UsersContext = createContext();

export const useUsersContext = () => {
    return useContext(UsersContext);
}

export const UsersContextProvider = ({ children }) => {
    const [users, setUsers] = useState(null);

    return <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>;
}