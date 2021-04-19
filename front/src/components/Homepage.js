import "milligram";
import "./Homepage.css";
import logo from "../images/logo.png";

function Homepage()
{
    return(
        <>
            <nav className="navigation">
                <section className="container">
                    <img className="rotation" src={logo}/>
                    <ul className="navigation-list float-right">
                        <li className="navigation-item"><a className="navigation-link button-white" href="/list">Login</a></li>
                        <li className="navigation-item"><a className="navigation-link button-white" href="/login">Register</a></li>
                    </ul>
                </section>
            </nav>
            <div className="header">
                <div className="header-content">
                    <b className="header-content-title">
                        Become the Super Software Engineer!
                        <hr/>
                    </b>
                    <p className="header-content-text">
                        Become master at the coding interview and get your dream job. Learn how to write clean quality code that passes the technical interview. Develop your problem solving skills using our step by step interactive lessons, video content and code quality tests.
                    </p>
                    <p className="header-content-text">
                        <a href="">
                            <div className="button-white" style={{padding: "7.5px"}}>
                                <b>
                                    Try our DEMO
                                </b>
                            </div>
                        </a>
                    </p>
                </div>
            </div>
            <div className="container">
                Lorem impus dolor sit alem
            </div>
        </>
    );
}

export default Homepage;