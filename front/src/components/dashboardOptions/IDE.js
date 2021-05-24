import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-tomorrow_night";

import { Redirect, Link } from "react-router-dom";

function onChange(newValue)
{
    console.log("change", newValue);
}

function IDE()
{
    const session=localStorage.getItem("session");

    if(!session)
        return <Redirect to="/login" />;
        
    return(
        <>
            <div style={{backgroundColor: "#282a2e"}}>
                <div className="navigation ide-navigation">
                    <div className="container">
                        <ul className="navigation-list float-right">
                            <li className="navigation-item">
                                <Link className="navigation-link button-white responsive-no-button-border" to="/dashboard"><i className="fa fa-arrow-left"/></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{paddingTop: "15px"}}>
                    <AceEditor
                        mode="c_cpp"
                        theme="tomorrow_night"
                        onChange={onChange}
                        name="ide-editor"
                        editorProps={{ $blockScrolling: true }}
                        width="100%"
                        showPrintMargin={false}
                    />
                </div>
                <div className="ide-options">
                    <p align="right">
                        <button className="button-white responsive-no-button-border" style={{borderRadius: "0"}}>
                            <i className="fa fa-save"/>|SAVE
                        </button>
                        <button className="button-white responsive-no-button-border" style={{borderRadius: "0"}}>
                            <i className="fa fa-cog"/>|RUN
                        </button>
                    </p>
                    <b>
                       Output:<span className="prompt-cursor"/>
                    </b>
                </div>
            </div>
            <br/>
            <p className="container" align="center">
                <b>
                    © Powered by <i><u>Softana</u></i>, All right reserved.
                </b>
            </p>
            <br/>
        </>
    );
}

export default IDE;