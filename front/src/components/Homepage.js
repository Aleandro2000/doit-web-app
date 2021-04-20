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
                        Become <b>master</b> at the <b>coding interview</b> and get your <b>dream job</b>. Learn how to write <b>clean quality code</b> that passes the technical interview. Develop your <b>problem solving skills</b> using our <b>step by step</b> interactive lessons, video content and tips&#38;tricks.
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
                            We helps you to translate <b>ideas and thinking</b> into code, guiding you <b>step by step</b>. Also, we learn you the best skill for today's word. We learn you how to learn.
                            <br/><br/>
                            So, <b>keep it clean and simple</b>! We all hate <b>red flags</b>, don’t we? And choosing a <b>bad variable</b> name or overcomplicating the code is one of the most common mistakes in a <b>job interview</b>.
                            <br/><br/>
                            A <b>picture</b> is worth a thousand words. But a <b>video</b> offers you more than that. DoIT’s materials content doesn’t just hand you over the solution, it will get you in a <b>thinking process</b> adventure where you will easily develop your <b>problem-solving skills</b>. You'll be able to solve any problem you'll face during an <b>interview</b>.
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