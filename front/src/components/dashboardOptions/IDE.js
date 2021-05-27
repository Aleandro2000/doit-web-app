import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

import { Redirect, Link } from "react-router-dom";
import { createRef, useState } from "react";
import Select from 'react-select';
import swal from 'sweetalert';

import logo from "../../images/logo2.png";

function IDE()
{
    const [filename,setFileName]=useState("code.c");
    const [language,setLanguage]=useState("c_cpp");
    const [output, setOutput]=useState("");
    const session=localStorage.getItem("session");
    const aceEditorRef=createRef();

    const options = [
        { value: '.c', label: 'C' },
        { value: '.cpp', label: 'C++' },
        { value: '.java', label: 'Java' },
        { value: '.py', label: 'Python 2' },
        { value: '.py', label: 'Python 3' },
        { value: '.js', label: 'NodeJS' }
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    if(!session)
        return <Redirect to="/login" />;
    
    const handleChange = (selectedOption) => {
        setFileName("code"+selectedOption.value);
        switch(selectedOption.label)
        {
            case "C":
                setLanguage("c_cpp")
                break;
            case "C++":
                setLanguage("c_cpp")
                break;
            case "Java":
                setLanguage("java")
                break;
            case "Python 2":
                setLanguage("python")
                break;
            case "Python 3":
                setLanguage("python")
                break;
            case "NodeJS":
                setLanguage("javascript")
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
                title: "OOPS!",
                text: "IDE Editor may not be empty!",
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
    }

    const submitToCompile = async (lang,code) =>{
        const input=document.getElementById("input").value;
        const data={code,input};
        await fetch("http://localhost:8081/"+lang,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if(data.stderr)
                {
                    document.getElementById("status").style.backgroundColor="#ff3b47";
                    setOutput(data.stderr);
                }
                else
                {
                    document.getElementById("status").style.backgroundColor="#00d742";
                    setOutput(data.stdout);
                }
            });
    }

    const Run = () => {
        const code=aceEditorRef.current.editor.getValue();
        if(code)
            switch(selectedOption.label)
            {
                case "C":
                    submitToCompile("c",code);
                    break;
                case "C++":
                    submitToCompile("cpp",code);
                    break;
                case "Java":
                    submitToCompile("java",code);
                    break;
                case "Python 2":
                    submitToCompile("python",code);
                    break;
                case "Python 3":
                    submitToCompile("python",code);
                    break;
                case "NodeJS":
                    submitToCompile("node",code);
                    break;
                default:
                    break;
            }
        else
            swal({
                title: "OOPS!",
                text: "IDE Editor may not be empty!",
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
    }

    const Open = (event) =>{
        const fileName=document.getElementById('open').value.toLowerCase();
        if(!fileName.endsWith('.txt')&&!fileName.endsWith('.c')&&!fileName.endsWith('.cpp')&&!fileName.endsWith('.java')&&!fileName.endsWith('.py')&&!fileName.endsWith('.js'))
        {
            swal({
                title: "OOPS!",
                text: "Please upload a compatible file!",
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
        }
        else
        {
            const reader=new FileReader();
            reader.onload=(() => {
                return function(e) {
                    aceEditorRef.current.editor.setValue(e.target.result);
                };
            })(event.target.files[0]);
            reader.readAsText(event.target.files[0]);
        }
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
                <center>
                    <button className="button-white responsive-no-button-border" style={{borderRadius: "0",marginTop: "10px"}}>
                        <label style={{cursor: "pointer"}} for="open">
                            <i className="fa fa-file"/>|OPEN
                        </label>
                    </button>
                    <input onChange={Open} type="file" id="open" name="open" accept=".txt,.c,.cpp,.java,.py,.js" style={{display: "none"}}/>
                </center>
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
                        <div className="output">
                            <b style={{marginLeft: "5px"}}>Input</b>
                            <div className="screen" style={{padding: "0"}}>
                                <textarea className="input" id="input"/>
                            </div>
                        </div>
                    </p>
                    <p>
                        <div className="output">
                            <div className="status" id="status"/>
                            <div className="screen">
                                <p>-&#62; Output:<b>{output}</b><span className="prompt-cursor"/></p>
                            </div>
                        </div>
                    </p>
                </div>
            </div>
            <div className="content-box">
                <center>
                    <img alt="" src={logo} className="logo"/>
                    <hr/>
                    <p>
                        <b>
                            © Powered by <i><u>Softana</u></i>, All right reserved.
                        </b>
                    </p>
                </center>
            </div>
        </>
    );
}

export default IDE;