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
    const decodedUser=decodeToken(localStorage.getItem("TOKEN_KEY"));
    decodedUser.user.password=decodedUser.user.verificationKey="";
    return decodedUser;
}

export const isSubscribed = () => {
    const decoded=decodeSession();
    if(decoded.user.customerId&&decoded.user.subscriptionId)
        return true;
    else
        return false;
}

export function navmenu(id)
{
    let element=document.getElementById(id);
    if(element.style.display==="none")
        element.style.display="block";
    else
        element.style.display="none";
}