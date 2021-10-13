import QuizTest from "../../components/QuizTest";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TechnicalQuiz()
{
    return(
        <div className="fadeIn">
            <Header type="dashboard" text="Technical"/>
            <QuizTest type="technical"/>
            <br/>
            <Footer/>
            <br/>
        </div>
    );
}