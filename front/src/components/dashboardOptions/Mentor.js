import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Mentor = () => {

    const [searchInput, setSearchInput]=useState("#d1d1d1");
    const [search,setSearch]=useState("");
    const [result,setResult]=useState("");

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
                    {
                        setResult(data.result[0]);
                    }
                    else
                        setResult(data.msg);
                });
            document.getElementById("loading").style.display="none";
        }
        else
            setSearchInput("red");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            <br/>
            <center className="container content">
                <form onSubmit={handleSubmit}>
                    <input name="search" style={{backgroundColor: "white",borderColor: searchInput}} onChange={event => setSearch(event.target.value)} type="text" placeholder="What do you want to search?" required/>
                    <button type="submit" className="button" onClick={handleSearch}>
                        <i className="fa fa-search"/>|SEARCH
                    </button>
                </form>
                <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>
                {
                    result ? (
                    <div className="content-box">
                        {result}
                    </div>
                    ) : (<></>)
                }
            </center>
        </div>
    );
}

export default Mentor;