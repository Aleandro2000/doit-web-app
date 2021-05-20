import logo from "../images/logo2.png";

function NotFound()
{
    return(
        <center className="content-box" style={{transform: "translate(0,50%)"}}>
            <img className="logo" src={logo}/>
            <h3 className="title">
                <b>
                    ERROR 404: Not Found :(
                </b>
            </h3>
        </center>
    );
}

export default NotFound;