import useAuth from "./useAuth";
import axios from "../helpers/axios";


const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const res = await axios.get(`refresh/`, {
            withCredentials: true
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(res.data.accessToken)
            return {...prev, accessToken: res.data.accessToken}
        })
        return res.data.accessToken;
    }
    return refresh()
}

export default useRefreshToken;