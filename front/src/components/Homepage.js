import logo from "../images/logo.png";
import code from "../images/code.svg";
import tick from "../images/tick.png";
import redX from "../images/red-x.png";
import { Link } from "react-router-dom";

function Homepage()
{

    function navmenu(id)
    {
        let element=document.getElementById(id);
        if(element.style.display==="none")
            element.style.display="block";
        else
            element.style.display="none";
    }

    return(
        <div className="homepage fadeIn">
            <div className="navigation">
                <div className="container">
                    <ul className="navigation-list float-right">
                        <li className="navigation-item">
                            <div className="dropdown">
                                <div className="button-white responsive-no-button-border dropbtn" onClick={() => navmenu("dropdown-content") }>Authentificate</div>
                                <div className="dropdown-content" id="dropdown-content">
                                    <Link className="navigation-link button-white-dropdown" to="/login"><i className="fa fa-sign-in"/> Login</Link>
                                    <br/>
                                    <Link className="navigation-link button-white-dropdown" to="/register"><i className="fa fa-plus"/> Register</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="header">
                <img alt="" className="rotation" style={{marginBottom: "20px"}} src={logo}/>
                <p align="center">
                    <div className="header-content">
                        <b className="header-content-title">
                            Become the Super Software Engineer!
                        </b>
                        <hr/>
                        <p className="header-content-text">
                            Become <b>master</b> at the <b>coding interview</b> and get your <b>dream job</b>. Learn how to write <b>clean quality code</b> that passes the technical interview. Develop your <b>problem solving skills</b> using our <b>step by step</b> interactive lessons, video content and tips&#38;tricks.
                        </p>
                        <Link className="header-content-text" to="/demo">
                            <div className="button-white" style={{padding: "7.5px"}}>
                                <b>
                                    Try our DEMO
                                </b>
                            </div>
                        </Link>
                        <br/>
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
                            <img alt="" src={code} style={{filter: "grayscale(75%)"}}/>
                        </p>
                    </div>
                </div>
            </div>
            <div className="container content" data-aos='fade-up'>
                <div className="row">
                    <div className="column">
                        <h1 align="center" style={{color: "#c21808"}}>
                            <i className="fa fa-puzzle-piece"/>
                        </h1>
                        <h3 align="center">
                            <b>
                                90+
                            </b>
                        </h3>
                        <p align="center">
                            <b>
                                coding lessons
                            </b>
                        </p>
                    </div>
                    <div className="column">
                        <h1 align="center" style={{color: "#c21808"}}>
                            <i className="fa fa-play"/>
                        </h1>
                        <h3 align="center">
                            <b>
                                100+
                            </b>
                        </h3>
                        <p align="center">
                            <b>
                                video lessons
                            </b>
                        </p>
                    </div>
                    <div className="column">
                        <h1 align="center" style={{color: "#c21808"}}>
                            <i className="fa fa-code"/>
                        </h1>
                        <h3 align="center">
                            <b>
                                Languages
                            </b>
                        </h3>
                        <p align="center">
                            <b>
                                C, C++, Java, Python, NodeJS
                            </b>
                        </p>
                    </div>
                    <div className="column">
                        <h1 align="center" style={{color: "#c21808"}}>
                            <i className="fa fa-book"/>
                        </h1>
                        <h3 align="center">
                            <b>
                                DoIT like a GOD
                            </b>
                        </h3>
                        <p align="center">
                            <b>
                                Full Courses in Algorithms, DS, OOP and Machine Learning
                            </b>
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
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Performance Validation</td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Learn how to write Clean Quality Code </td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Step by Step Coding Tutorials</td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Video Content</td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Develops your Thinking Process and Problem Solving Skills </td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Code Quality Validation </td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Optimized Problem Set for fat Learning Curve</td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Exploring Every Solution to a given Problem</td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Teaching to become self-taught</td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Teaching programming languages with all programming concepts in background</td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Bot assistant based on AI as digital teacher during the studying</td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                        <tr>
                            <td>Teaching Machine Learning to bost your DATA SCIENCE skills</td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={redX} width="20px" heigh="20px"/></td>
                            <td><img alt="" src={tick} width="20px" heigh="20px"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="container content" data-aos='fade-up'>
                <h1 align="center">
                    Meet the digital teacher!
                </h1>
                <p align="center">
                    We provide the best digital teacher for competitive programming and coding interviews and professional experience in well-known tech companies. You may ask any question to our bot, because all questions it is kept secret.
                </p>
            </div>
            <div className="container content" data-aos='fade-up'>
                <h1 align="center">
                    Pricing
                </h1>
                <ul class="price">
                    <li className="price-detail"><b>Basic</b><br/>$ 20 / month</li>
                    <li className="price">
                        <b>100+ handpicked Coding Questions</b>
                    </li>
                    <li className="price">
                        <b>Step by Step coding tutorials</b>
                    </li>
                    <li className="price">
                        <b>Amazing video explanations</b>
                    </li>
                    <li className="price">
                        <b>Code Quality tests</b>
                    </li>
                    <li className="price">
                        <b>Optimized for fast Learning Curve</b>
                    </li>
                    <li className="price">
                        <b>Quality validation</b>
                    </li>
                    <li className="price">
                        <b>Write code in 5 different languages</b>
                    </li>
                    <li className="price">
                        <b>Exploring every solution to a given problem</b>
                    </li>
                    <li className="price">
                        <b>Unlimited access to the our AI mentor.</b>
                    </li>
                    <li className="grey price"><Link to="/register" className="button">BUY</Link></li>
                </ul>
            </div>
            <h1 align="center" data-aos='fade-up'>
                Testimonial
            </h1>
            <center className="container" data-aos='fade-up'>
                <div className="testimonial-card">
                    <div className="text">
                        <h3>Jane Doe</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur elit. Ipsa voluptatum ipsum, laudantium minima aliquam porro? Iste,  Et, esta ah.
                        </p>
                    </div>
                    <div className="card-footer">
                        <div src="" className="image-1"/>
                    </div>
                </div>
            </center>
            <center className="container" data-aos='fade-up'>
                <div className="testimonial-card">
                    <div className="text">
                        <h3>Jane Doe</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur elit. Ipsa voluptatum ipsum, laudantium minima aliquam porro? Iste,  Et, esta ah.
                        </p>
                    </div>
                    <div className="card-footer">
                        <div src="" className="image-2"/>
                    </div>
                </div>
            </center>
            <center className="container" data-aos='fade-up'>
                <div className="testimonial-card">
                    <div className="text">
                        <h3>Jane Doe</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur elit. Ipsa voluptatum ipsum, laudantium minima aliquam porro? Iste,  Et, esta ah.
                        </p>
                    </div>
                    <div className="card-footer">
                        <div src="" className="image-3"/>
                    </div>
                </div>
            </center>
            <h1 align="center" style={{marginTop: "100px"}} data-aos='fade-up'>
                Meet the Founder
            </h1>
            <center className="container" data-aos='fade-up'>
                <div className="testimonial-card">
                    <div className="text">
                        <h3><b>Alexandru Camrici</b></h3>
                        <h4><i>Founder</i></h4>
                        <a href="https://ro.linkedin.com/in/alexandru-andrei-carmici-8978b21b3">
                            <i className="fa fa-linkedin social-media-founder" style={{paddingLeft: "17.5px",paddingRight: "17.5px"}}/>
                        </a>
                        <a href="https://github.com/Aleandro2000">
                            <i className="fa fa-github social-media-founder"/>
                        </a>
                        <p>
                            Lorem ipsum dolor sit amet consectetur elit. Ipsa voluptatum ipsum, laudantium minima aliquam porro? Iste,  Et, esta ah.
                        </p>
                    </div>
                    <div className="card-footer">
                        <div src="" className="image-founder"/>
                    </div>
                </div>
            </center>
            <center style={{marginTop: "100px"}}>
                <div className="footer" data-aos='zoom-in'>
                    <p>
                        <b>
                            © Powered by <i><u>Softana</u></i>, All right reserved.
                        </b>
                    </p>
                    <hr/>
                    <p>
                        <a href="#">
                            <i className="fa fa-facebook social-media" style={{paddingLeft: "17.5px",paddingRight: "17.5px"}}/>
                        </a>
                        <a href="#">
                            <i className="fa fa-instagram social-media"/>
                        </a>
                        <a href="#">
                            <i className="fa fa-youtube social-media"/>
                        </a>
                        <a href="#">
                            <i className="fa fa-linkedin social-media"/>
                        </a>
                    </p>
                    <br/>
                </div>
            </center>
        </div>
    );
}

export default Homepage;