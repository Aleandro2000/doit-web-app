import { useState,useEffect,useRef } from "react";
import { useHistory } from "react-router-dom";

export default function QuizTest(props)
{
    const Ref=useRef(null);

    const [timer,setTimer]=useState("00:00:00");

    const [result,setResult]=useState([]);
    const [pagesNumber,setPagesNumber]=useState(0);
    const [currentPage,setCurrentPage]=useState(0);
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

    const forward=() => {
        if(currentPage<pagesNumber)
            setCurrentPage(currentPage+1);
    }

    const backward=() => {
        if(currentPage>0)
            setCurrentPage(currentPage-1);
    }

    const startQuiz = async () => {
        document.getElementById("loading").style.display="block";
        await fetch("/quiz", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: props.type
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.status===200)
                {
                    document.getElementById("loading").style.display="none";
                    setStart(true);
                    setResult(data.result);
                    setPagesNumber(data.result.length);
                }
                else
                {
                    setResult([data.msg]);
                    document.getElementById("loading").style.display="none";
                }
            });
    }

    return(
        <center>
        {
            start ? (
                <div className="content-box">
                    <br/>
                    <div className="clock">
                        {timer}
                    </div>
                    <br/><br/>
                    {
                        result.slice(currentPage,currentPage+1).map((item,index)=>{
                            return(
                                <div key={index}>
                                    <h4 align="justify">
                                        <b>
                                            <span className="question-index">{currentPage+1}</span> {item.question}
                                        </b>
                                    </h4>
                                    <div className="paper-shadow">
                                    {
                                        item.alternatives.map((item,index)=>{
                                            return(
                                                <>
                                                    <label for={index}>
                                                        <input type="checkbox" name={index} value={item.isCorrect}/>
                                                        {item.text}
                                                    </label>
                                                </>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <button className="button" onClick={backward}>Previous</button>
                    <button className="button" onClick={forward}>Next</button>
                </div>
            ) : (
                <div className="content-box">
                    <h4>
                        <b>
                            This quiz will take 1 hour and 30 minutes. The process is ireversible when you start!
                        </b>
                    </h4>
                    <button className="button" onClick={history.goBack}>Back</button>
                    <button className="button" onClick={startQuiz}>Start</button>
                    <br/>
                    <b>
                        {result[0]}
                    </b>
                    <center>
                        <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                    </center>
                </div>
            )
        }
        </center>
    );
}