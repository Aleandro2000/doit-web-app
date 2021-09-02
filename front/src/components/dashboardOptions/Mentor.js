import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import teacher from "../../images/teacher.gif";

const Mentor = () => {

    const [searchInput, setSearchInput]=useState("#d1d1d1");
    const [search,setSearch]=useState("");
    const [result,setResult]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);

    const handleSearch = async () => {
        if(search)
        {
            setResult("");
            document.getElementById("loading").style.display="inline-block";
            setSearchInput("#d1d1d1");
            const data={search: search};
            await fetch("/mentor", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if(data.status===200)
                        setResult(result);
                    else
                        setResult([data.msg]);
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
        if(currentPage<result.length)
            setCurrentPage(currentPage+1);
    }

    const backward=() => {
        if(currentPage>1)
            setCurrentPage(currentPage-1);
    }

    return(
        <div className="fadeIn">
            <div className="navigation">
                <div className="container">
                    <ul className="navigation-list float-right">
                        <li className="navigation-item">
                            <Link className="navigation-link button-white responsive-no-button-border" to="/dashboard"><i className="fa fa-arrow-left"/></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <br/>
            <div className="dashboard-header">
                <p>
                    <img alt="" className="rotation" style={{marginBottom: "20px"}} src={logo}/>
                </p>
                <span className="dashboard-title">
                    Mentor
                </span>
            </div>
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
                                result.map(item => {
                                    return(
                                        <div className="content-box">
                                            {item}
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
                                    {currentPage}/{result.length}
                                </span>
                                <span className="pagination-component pagination-button" onClick={forward}>
                                    &raquo;
                                </span>
                            </div>
                        </>
                    ) : (<></>)
                }
            </center>
        </div>
    );
}

export default Mentor;