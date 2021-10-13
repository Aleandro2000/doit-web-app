import QuizTest from "../../components/QuizTest";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function InterviewQuiz()
{
    return(
        <div className="fadeIn">
            <Header type="dashboard" text="Interview"/>
            <QuizTest type="interview"/>
            <br/>
            <Footer/>
            <br/>
        </div>
    );
}