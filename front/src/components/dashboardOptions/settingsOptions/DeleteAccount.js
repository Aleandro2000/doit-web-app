import logo from "../../../images/logo2.png";
import {
    Link,
    useHistory
} from "react-router-dom";
import { logout,decodeSession } from "../../../utils";

function DeleteAccount()
{
    const history=useHistory();

    const deleteAccount=async () => {
        document.getElementById("loading").style.display="inline-block";
        const data={_id: decodeSession().user._id};
        const req=await fetch("/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(req.status===200)
        {
            logout();
            document.getElementById("loading").style.display="none";
            history.push("/login");
        }
        else
            document.getElementById("loading").style.display="none";
    }
    
    return(
        <div className="content-box">
            <img alt="" src={logo} className="logo"/>
            <h3 className="title">
                <b>
                    Delete Account
                </b>
            </h3>
            <p align="center">
                Are you sure you want to do this? This action is not reversible.
            </p>
            <hr/>
            <button type="submit" className="button" onClick={deleteAccount}>
                YES
            </button>
            <Link to="/dashboard/settings">
                <button type="submit" className="button">
                    NO
                </button>
            </Link>
            <br/>
            <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
            <hr/>
            <p>
                <b>
                    © Powered by <i><u>Softana</u></i>, All right reserved.
                </b>
            </p>
        </div>
    );
}

export default DeleteAccount;