import { Link } from "react-router-dom";
import logicthinking from "../../images/logic-thinking.png";
import technical from "../../images/technical.png";
import interview from "../../images/interview.png";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Quiz()
{
    return(
        <div className="options">
            <Navbar type="back"/>
            <br/>
            <Header type="dashboard" text="Quiz"/>
            <div className="container content">
                <div className="row">
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={logicthinking}/>
                        <br/>
                        <Link to="/dashboard/quiz/logical">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Logical Reasoning Quiz
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={technical}/>
                        <br/>
                        <Link to="/dashboard/quiz/technical">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Technical Quiz
                            </div>
                        </Link>
                    </div>
                    <div className="content-box column" style={{padding: "20px"}}>
                        <img alt="" className="icon" src={interview}/>
                        <br/>
                        <Link to="/dashboard/quiz/interview">
                            <div className="button-black" style={{marginBottom: "15px",cursor: "pointer"}}>
                                Interview Questions Quiz
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}