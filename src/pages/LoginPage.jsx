import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import getAccess from "../helpers/getAccess";
import useUrl from "../hooks/useUrl";
import Loading from '../components/ui/Loading'

const LoginPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const BASE_URL = useUrl();
    const [isLoading, setIsLoading] = useState(false);

    const [token, setToken] = useState(() => {
        return localStorage.getItem("Access-Token");
    });

    useEffect(() => {
        const checkLogin = async () => {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}api/auth/me/`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-CSRF-TOKEN": localStorage.getItem("CSRF-Token"),
                },
            });
            console.log(res);
            if (!res.ok) {
                const isLogin = await getAccess(setToken);
                if (isLogin) {
                    navigate("/dashboard");
                }
            } else {
                navigate("/home");
            }
            setIsLoading(false);
        };
        checkLogin();
    }, [token, BASE_URL, navigate]);


    return (
        isLoading ? <Loading/> : <Outlet/>
    );
};

export default LoginPage;
