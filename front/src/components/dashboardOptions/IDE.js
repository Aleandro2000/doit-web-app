import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import swal from 'sweetalert';

import { Redirect, Link } from "react-router-dom";
import { createRef, useState } from "react";

function onChange(newValue)
{
    console.log("change", newValue);
}

function IDE()
{
    const [filename,setFileName]=useState("code.cpp");
    const session=localStorage.getItem("session");
    const aceEditorRef=createRef();

    if(!session)
        return <Redirect to="/login" />;

    const SaveFile = () => {
        const code=aceEditorRef.current.editor.getValue();
        if(code)
        {
            const file=new Blob([code], {type: 'text/plain'});
            if (window.navigator.msSaveOrOpenBlob)
                window.navigator.msSaveOrOpenBlob(file,filename);
            else
            {
                const a=document.createElement("a");
                const url=URL.createObjectURL(file);
                a.href=url;
                a.download=filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);  
                }, 0);
            }
        }
        else
            swal({
                title: "ERROR!",
                text: "IDE Editor may not be empty!",
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
    }

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
                        showGutter={true}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                        }}
                        ref={aceEditorRef}
                    />
                </div>
                <div className="ide-options">
                    <p align="right">
                        <button onClick={SaveFile} className="button-white responsive-no-button-border" style={{borderRadius: "0"}}>
                            <i className="fa fa-save"/>|SAVE
                        </button>
                        <button className="button-white responsive-no-button-border" style={{borderRadius: "0"}}>
                            <i className="fa fa-cog"/>|RUN
                        </button>
                    </p>
                    <b>
                       Console:<span className="prompt-cursor"/>
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