import { useState,useEffect,useRef } from "react";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LogicalQuiz()
{
    const Ref=useRef(null);

    const [timer,setTimer]=useState("00:00:00");

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
        setTimer('01:00:00');
        if(Ref.current)
            clearInterval(Ref.current);
        const id=setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current=id;
    }

    const getDeadTime = (hours,min,sec) => {
        let deadline = new Date();
        deadline.setHours(deadline.getHours()+hours);
        deadline.setMinutes(deadline.getMinutes()+min);
        deadline.setSeconds(deadline.getSeconds()+sec);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime(1,0,0));
        // eslint-disable-next-line
    },[]);

    return(
        <div className="fadeIn">
            <Navbar type="back"/>
            <br/>
            <Header type="dashboard" text="Logical Reasoning"/>
            <center>
                <div className="clock">
                    {timer}
                </div>
            </center>
            <br/>
            <Footer/>
            <br/>
        </div>
    );
}