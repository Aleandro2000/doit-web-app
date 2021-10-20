import { useState } from "react";
import teacher from "../../images/teacher.gif";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Mentor()
{
    const [searchInput, setSearchInput]=useState("#d1d1d1");
    const [search,setSearch]=useState("");
    const [result,setResult]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const [pagesNumber,setPagesNumber]=useState(1);

    const handleSearch = async () => {
        if(search)
        {
            setResult([]);
            setCurrentPage(0);
            setPagesNumber(1);
            document.getElementById("loading").style.display="inline-block";
            setSearchInput("#d1d1d1");
            const data={search: search.toLowerCase()};
            await fetch("/mentor", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    setResult(data.result)
                    if(data.result.length%5)
                        setPagesNumber(parseInt(data.result.length/5+1));
                    else
                        setPagesNumber(parseInt(data.result.length/5))
                });
            document.getElementById("loading").style.display="none";
        }
        else
            setSearchInput("red");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const forward=() => {
        if(currentPage<pagesNumber-1)
            setCurrentPage(currentPage+1);
    }

    const backward=() => {
        if(currentPage>0)
            setCurrentPage(currentPage-1);
    }

    return(
        <div className="fadeIn">
            <Navbar type="back"/>
            <Header type="dashboard" text="Mentor"/>
            <center className="container content">
                <div className="content-box">
                    <div className="teacher">
                        <img alt="" src={teacher} width="40px"/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <br/>
                        <input name="search" style={{backgroundColor: "white",borderColor: searchInput}} onChange={event => setSearch(event.target.value)} type="text" placeholder="What do you want to search?" required/>
                        <button type="submit" className="button" onClick={handleSearch}>
                            <i className="fa fa-search"/>|SEARCH
                        </button>
                    </form>
                </div>
                <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                {
                    result.length ? (
                        <>
                            {
                                result.slice(currentPage*4,(currentPage+1)*4).map(item => {
                                    return(
                                        <div className="content-box" key={item._id}>
                                            <b>
                                                {item.keyword.toUpperCase()}
                                            </b>
                                            <br/><br/>
                                            {item.definition}
                                        </div>
                                    );
                                })
                            }
                            <br/>
                            <div className="pagination">
                                <span className="pagination-component pagination-button" onClick={backward}>
                                    &laquo;
                                </span>
                                <span className="pagination-component">
                                    {currentPage+1}/{pagesNumber}
                                </span>
                                <span className="pagination-component pagination-button" onClick={forward}>
                                    &raquo;
                                </span>
                            </div>
                        </>
                    ) : (<></>)
                }
            </center>
            <Footer/>
            <br/>
        </div>
    );
}