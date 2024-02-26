import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
import {useState} from "react";
import {UrlProvider} from "./context/UrlProvider";

const App = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <UrlProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='login' element={<LoginPage/>}>
                        <Route
                            index
                            element={
                                <LoginForm
                                    phoneNumber={phoneNumber}
                                    setPhoneNumber={setPhoneNumber}
                                />
                            }
                        />
                        <Route
                            path="otp"
                            element={
                                <LoginOtpForm
                                    phoneNumber={phoneNumber}
                                />
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UrlProvider>
    );
};

export default App;
