import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LogicalQuiz()
{
    return(
        <div className="fadeIn">
            <Navbar type="back"/>
            <br/>
            <Header type="dashboard" text="Logical Reasoning"/>
            <div>

            </div>
            <br/>
            <Footer/>
            <br/>
        </div>
    );
}