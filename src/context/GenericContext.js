import { createContext, useState } from "react";

const GenericContext = createContext({});

export const GenericContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <GenericContext.Provider value={
            {
                isLoading, setIsLoading
            }
        }>
            {children}
        </GenericContext.Provider>
    )
}

export default GenericContext;