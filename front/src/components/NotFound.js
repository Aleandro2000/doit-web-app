import logo from "../images/logo2.png";

function NotFound()
{
    return(
        <center className="content-box">
            <img alt="" className="logo" src={logo}/>
            <h3 className="title">
                <b>
                    PAGE NOT FOUND! :(
                </b>
            </h3>
            <hr/>
            <p>
                <b>
                    © Powered by <i><u>Softana</u></i>, All right reserved.
                </b>
            </p>
        </center>
    );
}

export default NotFound;