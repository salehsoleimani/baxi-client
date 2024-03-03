import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
import { UrlProvider } from "./context/UrlProvider";
import { AuthProvider } from "./context/AuthProvider";
import { useState } from "react";
import CompliteProfilePage from "./pages/CompliteProfilePage";
import EnterName from "./components/compliteProfile/EnterName";
import EnterEmail from "./components/compliteProfile/EnterEmail";
import Maps from "./components/map/Map";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";

const App = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <AuthProvider>
            <UrlProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MapPage />}>
                            <Route index element={<Maps />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
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
                            element={<CompliteProfilePage />}>
                            <Route
                                index
                                element={<EnterName />}
                            />
                            <Route
                                path="email"
                                element={<EnterEmail />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UrlProvider>
        </AuthProvider>
    );
};

export default App;
