import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from '../components/ui/Loading'
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const abortController = new AbortController();

        (async () => {
            setIsLoading(true);
            try {
                const res = await axiosPrivate.get('api/auth/me/', {
                    signal: abortController.signal
                });
                console.log(res.data);
                navigate('/home');
            } catch (err) {
                // not authenticated
                console.log(err);
            }
            setIsLoading(false);
        })();

        return () => abortController.abort('component did unmount')
    }, [navigate, axiosPrivate]);


    return (isLoading ? <Loading/> : <Outlet/>);
};

export default LoginPage;
