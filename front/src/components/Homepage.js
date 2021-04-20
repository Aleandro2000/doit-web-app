import "milligram";
import AOS from "aos";
import "../aos.css";
import "./Homepage.css";
import logo from "../images/logo.png";
import code from "../images/code.svg";

function Homepage()
{
    AOS.init({
        duration: 1000
    });
    return(
        <>
            <nav className="navigation">
                <section className="container">
                    <img className="rotation fadeIn" src={logo}/>
                    <ul className="navigation-list float-right fadeIn">
                        <li className="navigation-item"><a className="navigation-link button-white" href="/list">Login</a></li>
                        <li className="navigation-item"><a className="navigation-link button-white" href="/login">Register</a></li>
                    </ul>
                </section>
            </nav>
            <div className="header">
                <div className="header-content fadeIn">
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
            <div className="container content" data-aos='fade-up'>
                <div className="row">
                    <div className="column">
                        <h1 align="center">
                            You write, we guide
                        </h1>
                        <p align="justify">
                            We helps you to translate ideas and thinking into code, guiding you step by step. Also, we learn you the best skill for today's word. We learn you how to learn.
                            <br/><br/>
                            So, keep it clean and simple! We all hate red flags, don’t we? And choosing a bad variable name or overcomplicating the code is one of the most common mistakes in a job interview.
                            <br/><br/>
                            A picture is worth a thousand words. But a video offers you more than that. DoIT’s materials content doesn’t just hand you over the solution, it will get you in a thinking process adventure where you will easily develop your problem-solving skills. You'll be able to solve any problem you'll face during an interview.
                        </p>
                    </div>
                    <div className="column">
                        <p align="center">
                            <img src={code} style={{filter: "grayscale(75%)"}}/>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;