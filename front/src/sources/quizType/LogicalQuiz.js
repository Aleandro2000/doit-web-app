import QuizTest from "../../components/QuizTest";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LogicalQuiz()
{
    return(
        <div className="fadeIn">
            <Header type="dashboard" text="Logical Reasoning"/>
            <QuizTest type="logical"/>
            <br/>
            <Footer/>
            <br/>
        </div>
    );
}