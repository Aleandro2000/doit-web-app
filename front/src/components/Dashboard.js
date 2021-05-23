import { Redirect } from "react-router-dom";

function Dashboard(){

    const session=localStorage.getItem("session");

    if(!session)
        return <Redirect to="/login" />;

    return(
        <>
            Dashboard
        </>
    );
}

export default Dashboard;