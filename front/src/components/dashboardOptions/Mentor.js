import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Mentor = () => {
    const search = async () => {
        const data={search};
        await fetch("/search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => alert(data));
    }

    return(
        <>
            <div className="navigation">
                <div className="container">
                    <ul className="navigation-list float-right">
                        <li className="navigation-item">
                            <Link className="navigation-link button-white responsive-no-button-border" to="/dashboard"><i className="fa fa-arrow-left"/></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <br/>
            <div className="dashboard-header">
                <p>
                    <img alt="" className="rotation" style={{marginBottom: "20px"}} src={logo}/>
                </p>
                <span className="dashboard-title">
                    Mentor
                </span>
            </div>
            <br/>
            <center className="container content">
                <input name="search" style={{backgroundColor: "white"}} type="text" placeholder="What do you want to search?" required/>
                <button className="button" onClick={search}>
                    <i className="fa fa-search"/>|SEARCH
                </button>
            </center>
        </>
    );
}

export default Mentor;