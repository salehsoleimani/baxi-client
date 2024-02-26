import {Outlet, useLocation, useNavigate} from "react-router-dom";
import styles from "./LoginPage.module.css";
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
            const res = await fetch(`${BASE_URL}api/auth/phone-number/`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                const isLogin = await getAccess(setToken);
                if (isLogin) {
                    navigate("/dashboard");
                }
            } else {
                navigate("/error");
            }
            setIsLoading(false)
        };
        checkLogin();
    }, [token, BASE_URL, navigate]);

    return (
        <main className={`container ${styles.container}`}>
            {isLoading ? <Loading/> :
                <div className={styles.loginBox}>
                    <h5>
                        {location.key === "default"
                            ? "ورود یا ثبت نام"
                            : "ورود به حساب کاربری"}
                    </h5>
                    <Outlet context={{isLoading: isLoading, setIsLoading}}/>
                </div>}
        </main>
    );
};

export default LoginPage;
