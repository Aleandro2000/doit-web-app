import logo from "../../../images/logo2.png";

function DeleteAccount()
{
    const session=localStorage.getItem("session");

    if(!session)
        return <Redirect to="/login" />;
    
    return(
        <>
        </>
    );
}

export default DeleteAccount;