import {createContext} from "react";

const UrlContext = createContext();
const UrlProvider = ({children}) => {
    return (
        <UrlContext.Provider value={"http://localhost:3000/"}>
            {children}
        </UrlContext.Provider>
    );
};

export {UrlProvider, UrlContext};
