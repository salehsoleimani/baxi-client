// getAccess.js
const BASE_URL = "http://127.0.0.1:4000/api/auth/";

const getAccess = async (setToken) => {
    const refreshToken = localStorage.getItem("Refresh-Token");
    const reqBody = {
        refresh: refreshToken,
    };
    const res = await fetch(`${BASE_URL}me/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Cookie": document.cookie
        },
        body: JSON.stringify(reqBody),
    });
    const data = await res.json();

    if (res.ok) {
        localStorage.setItem("Refresh-Token", data.refresh_token);
        localStorage.setItem("Access-Token", data.access_token);
        setToken(data.access_token);
        return true;
    } else {
        localStorage.removeItem("Access-Token");
        localStorage.removeItem("Refresh-Token");
        setToken("");
        return false;
    }
};

export default getAccess;
