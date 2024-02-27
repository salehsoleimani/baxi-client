import {createContext} from "react";

const UrlContext = createContext();
const UrlProvider = ({children}) => {
    return (
        <UrlContext.Provider value={"http://127.0.0.1:4000/"}>
            {children}
        </UrlContext.Provider>
    );
};

export {UrlProvider, UrlContext};
