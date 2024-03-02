import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
import { UrlProvider } from "./context/UrlProvider";
import { AuthProvider } from "./context/AuthProvider";
import { useState } from "react";
import CompliteProfilePage from "./pages/CompliteProfilePage";

const App = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <AuthProvider>
            <UrlProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='login' element={<LoginPage />}>
                            <Route
                                index
                                element={<LoginForm
                                    phoneNumber={phoneNumber}
                                    setPhoneNumber={setPhoneNumber} />}
                            />
                            <Route
                                path="otp"
                                element={<LoginOtpForm
                                    phoneNumber={phoneNumber} />}
                            />
                        </Route>
                        <Route
                            path="complite_profile"
                            element={<CompliteProfilePage />}
                        />
                    </Routes>
                </BrowserRouter>
            </UrlProvider>
        </AuthProvider>
    );
};

export default App;
