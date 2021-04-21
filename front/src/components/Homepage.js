import "milligram";
import AOS from "aos";
import "../aos.css";
import "./Homepage.css";
import logo from "../images/logo.png";
import code from "../images/code.svg";
import tick from "../images/tick.png";
import redX from "../images/red-x.png";

function Homepage()
{
    AOS.init({
        duration: 1000
    });
    return(
        <>
            <nav className="navigation">
                <section className="container">
                    <ul className="navigation-list float-right fadeIn">
                        <li className="navigation-item"><a className="navigation-link button-white responsive-no-button-border" href="/list">Login</a></li>
                        <li className="navigation-item"><a className="navigation-link button-white responsive-no-button-border" href="/login">Register</a></li>
                    </ul>
                </section>
            </nav>
            <div className="header">
                <img className="rotation fadeIn" style={{marginBottom: "20px"}} src={logo}/>
                <p align="center">
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
                </p>
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
            <div data-aos='fade-up'>
                <h1 align="center">
                    Major Benefits
                </h1>
                <table className="container content" style={{textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th>Feauter</th>
                            <th>LeetCode / Hackerrank</th>
                            <th>CodeCademy</th>
                            <th>AlgoExpert</th>
                            <th>AlgoCademy</th>
                            <th>DoIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Optimized for Coding Interviews</td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Performance Validation</td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Learn how to write Clean Quality Code </td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Step by Step Coding Tutorials</td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Video Content</td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Develops your Thinking Process and Problem Solving Skills </td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Code Quality Validation </td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Optimized Problem Set for fast Learning Curve</td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Exploring Every Solution to a given Problem</td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Teaching to become self-taught</td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Teaching programming languages with all programming concepts in background</td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Bot assistant during the studying</td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={redX} width="20px" heigh="20px"/></td>
                            <td><img src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Homepage;