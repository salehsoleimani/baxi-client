import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from '../components/ui/Loading'
import axios from "../helpers/axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        // if user has logged in navigate to home
        (async () => {
            setIsLoading(true);
            await axios.get('api/auth/me/', {
                signal: abortController.signal
            })
                .then(() => navigate('/home'))
                .catch(err => console.log(err));
            setIsLoading(false);
        })();

        return () => abortController.abort('component did unmount')
    }, [navigate]);


    return (isLoading ? <Loading/> : <Outlet/>);
};

export default LoginPage;
