import logo from "../images/logo2.png";

function NotFound()
{
    return(
        <center className="container">
            <img className="logo" src={logo}/>
            <hr/>
            <h3 style={{color: "#960018"}}>
                <b>
                    ERROR 404: Not Found :(
                </b>
            </h3>
        </center>
    );
}

export default NotFound;