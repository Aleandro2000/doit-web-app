import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import swal from 'sweetalert';

import { Redirect, Link } from "react-router-dom";
import { createRef, useState } from "react";
import Select from 'react-select';

function IDE()
{
    const [filename,setFileName]=useState("code.c");
    const [language,setLanguage]=useState("c_cpp");
    const session=localStorage.getItem("session");
    const aceEditorRef=createRef();

    const options = [
        { value: '.c', label: 'C' },
        { value: '.cpp', label: 'C++' },
        { value: '.java', label: 'Java' },
        { value: '.py', label: 'Python' },
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    if(!session)
        return <Redirect to="/login" />;
    
    const handleChange = (selectedOption) => {
        setFileName("code"+selectedOption.value);
        switch(selectedOption.label)
        {
            case "C++":
                setLanguage("c_cpp")
                break;
            case "C":
                setLanguage("c_cpp")
                break;
            case "Java":
                setLanguage("java")
                break;
            case "Python":
                setLanguage("python")
                break;
            default:
                break;

        }
        setSelectedOption(selectedOption);
    }

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

    const Run = () => {
        const code=aceEditorRef.current.editor.getValue();
        if(code)
        {
            //TO DO
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
                        mode={language}
                        theme="tomorrow_night"
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
                <Select isSearchable={false} options={options} value={selectedOption} onChange={handleChange}/>
                <div className="ide-options">
                    <p align="right">
                        <button onClick={SaveFile} className="button-white responsive-no-button-border" style={{borderRadius: "0"}}>
                            <i className="fa fa-save"/>|SAVE
                        </button>
                        <button onClick={Run} className="button-white responsive-no-button-border" style={{borderRadius: "0"}}>
                            <i className="fa fa-cog"/>|RUN
                        </button>
                    </p>
                    <p>
                        <b>
                           Console:<span className="prompt-cursor"/>
                        </b>
                    </p>
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