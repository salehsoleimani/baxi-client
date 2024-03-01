import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
import {UrlProvider} from "./context/UrlProvider";
import {AuthProvider} from "./context/AuthProvider";
import {useState} from "react";

const App = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <Routes>
            <Route path='login' element={<LoginPage/>}>
                <Route
                    index
                    element={<LoginForm
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}/>}
                />
                <Route
                    path="otp"
                    element={<LoginOtpForm
                        phoneNumber={phoneNumber}/>}
                />
            </Route>
        </Routes>
    );
};

export default App;
