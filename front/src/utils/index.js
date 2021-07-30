import { decodeToken } from "react-jwt";

export const login = (jwt_key) => {
    localStorage.setItem("TOKEN_KEY", jwt_key);
}

export const logout = () => {
    localStorage.removeItem("TOKEN_KEY");
}

export const isLogin = () => {
    if(localStorage.getItem("TOKEN_KEY"))
        return true;
    else
        return false;
}

export const decodeSession = () => {
    return decodeToken(localStorage.getItem("TOKEN_KEY"));
}

export const isSubscribed = () => {
    const decoded=decodeSession();
    if(decoded.user.customerId&&decoded.user.subscriptionId)
        return true;
    else
        return false;
}