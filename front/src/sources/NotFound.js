import logo from "../images/logo2.png";
import { useHistory } from "react-router-dom";

function NotFound()
{
    const history=useHistory();

    return(
        <center>
            <div className="content-box">
                <img alt="" className="logo" src={logo}/>
                <h3 className="title">
                    <b>
                        PAGE NOT FOUND! :(
                    </b>
                </h3>
                <button className="button" onClick={history.goBack}>
                    <i className="fa fa-arrow-left"/> Back
                </button>
                <hr/>
                <p>
                    <b>
                        © Powered by <i><u>Softana</u></i>, All right reserved.
                    </b>
                </p>
            </div>
        </center>
    );
}

export default NotFound;