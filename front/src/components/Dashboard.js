import { Redirect } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";

function Dashboard(){

    const session=localStorage.getItem("session");

    if(!session)
        return <Redirect to="/login" />;

    const history = useHistory();

    const logout = () => {
        localStorage.setItem("session",null);
        history.push("/login");
    }

    return(
        <>
            Dashboard
        </>
    );
}

export default Dashboard;