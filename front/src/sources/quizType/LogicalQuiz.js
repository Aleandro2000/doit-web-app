import { useState,useEffect,useRef } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LogicalQuiz()
{
    const Ref=useRef(null);

    const [timer,setTimer]=useState("00:00:00");

    const [result,setResult]=useState([]);
    const [currentResult,setCurrentResult]=useState([]);
    const [pagesNumber,setPagesNumber]=useState(1);
    const [start,setStart]=useState(false);

    const history=useHistory();

    const getTimeRemaining = (e) => {
        const total=Date.parse(e)-Date.parse(new Date());
        const seconds=Math.floor((total/1000)%60);
        const minutes=Math.floor((total/1000/60)%60);
        const hours=Math.floor((total/1000/60/60)%24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let {total,hours,minutes,seconds}=getTimeRemaining(e);
        if(total >= 0)
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            );
    }

    const clearTimer = (e) => {
        setTimer('01:30:00');
        if(Ref.current)
            clearInterval(Ref.current);
        const id=setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current=id;
    }

    const getDeadTime = (hours,min,sec) => {
        let deadline=new Date();
        deadline.setHours(deadline.getHours()+hours);
        deadline.setMinutes(deadline.getMinutes()+min);
        deadline.setSeconds(deadline.getSeconds()+sec);
        return deadline;
    }

    useEffect(() => {
        if(start)
            clearTimer(getDeadTime(1,30,0));
        // eslint-disable-next-line
    },[start]);

    const quiz = async () => {
        await fetch("/quiz", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: "logical"
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.status===200)
                {
                    setResult(data.result)
                    setCurrentResult(data.result.slice(0,4));
                    if(data.result.length%5)
                        setPagesNumber(parseInt(data.result.length/5+1));
                    else
                        setPagesNumber(parseInt(data.result.length/5));
                }
                else
                    setCurrentResult([data.msg]);
            });
    }

    return(
        <div className="fadeIn">
            <Navbar type="back"/>
            <br/>
            <Header type="dashboard" text="Logical Reasoning"/>
            <center>
            {
                start ? (
                    <div className="content-box">
                        <div className="clock">
                            {timer}
                        </div>
                        <br/>
                        <br/>
                        <button className="button">Previous</button>
                        <button className="button">Next</button>
                    </div>
                ) : (
                    <div className="content-box">
                        <h4>
                            <b>
                                This quiz will take 1 hour and 30 minutes. The process is ireversible when you start!
                            </b>
                        </h4>
                        <button className="button" onClick={history.goBack}>Back</button>
                        <button className="button" onClick={()=>setStart(true)}>Start</button>
                    </div>
                )
            }
            </center>
            <br/>
            <Footer/>
            <br/>
        </div>
    );
}