import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
import { UrlProvider } from "./context/UrlProvider";
import { AuthProvider } from "./context/AuthProvider";
import { useState } from "react";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import EnterName from "./components/completeProfile/EnterName";
import EnterEmail from "./components/completeProfile/EnterEmail";
import Maps from "./components/map/Map";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import AddressPage from "./pages/AddressPage";

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
                            <Route path="addr" element={<AddressPage />} />
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
                        </Route>
                        <Route
                            path="complete_profile"
                            element={<CompleteProfilePage />}>
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
