const BASE_URL = "https://localhost:3000/";

const getAccess = async (setToken) => {
    const refreshToken = localStorage.getItem("Refresh-Token");
    const reqBody = {
        refresh: refreshToken,
    };
    const res = await fetch(`${BASE_URL}api/auth/refresh/`, {
        method: "POST", headers: {
            "content-type": "application/json", "Cookie": document.cookie

        }, body: JSON.stringify(reqBody),
    });
    const data = await res.json();

    if (res.ok) {
        localStorage.setItem("Refresh-Token", data.access);
        setToken(data.access);
        return true;
    } else {
        localStorage.removeItem("Access-Token");
        localStorage.removeItem("Refresh-Token");
        setToken("");
        return false;
    }
};

export default getAccess;
