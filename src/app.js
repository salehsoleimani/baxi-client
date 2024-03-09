import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/login/LoginForm";
import LoginOtpForm from "./components/login/LoginOtpForm";
import { AuthProvider } from "./context/AuthProvider";
import { useState } from "react";
import Maps from "./components/map/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";
import AddressPage from "./pages/AddressPage";
import NoNetworkModal from "./components/modals/NoNetworkModal.tsx";
import CompleteProfilePage from "./pages/CompleteProfilePage.jsx";
import EnterName from './components/compliteProfile/EnterName.jsx'
import EnterEmail from './components/compliteProfile/EnterEmail.jsx'

const App = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

    return (

        <NoNetworkModal>

            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MapPage />}>
                            <Route index element={<Maps />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="address" element={<AddressPage />} />
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
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </NoNetworkModal>
    );
};

export default App;
