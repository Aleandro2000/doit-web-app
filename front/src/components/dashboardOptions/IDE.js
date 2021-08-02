import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import Select from 'react-select';
import swal from 'sweetalert';
import beautify from "js-beautify";

import logo from "../../images/logo2.png";

function IDE()
{
    const [filename,setFileName]=useState("code.c");
    const [language,setLanguage]=useState("c_cpp");
    const [output, setOutput]=useState("");
    const [textSize,setTextSize]=useState("12pt");
    const aceEditorRef=createRef();

    const options = [
        { value: '.c', label: 'C' },
        { value: '.cpp', label: 'C++' },
        { value: '.java', label: 'Java' },
        { value: '.py', label: 'Python' },
        { value: '.js', label: 'NodeJS' }
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);
    
    const handleChange = (selectedOption) => {
        setFileName("code"+selectedOption.value);
        switch(selectedOption.label)
        {
            case "C":
                setLanguage("c_cpp");
                aceEditorRef.current.editor.setValue(process.env.REACT_APP_DOIT_IDE_C);
                break;
            case "C++":
                setLanguage("c_cpp");
                aceEditorRef.current.editor.setValue(process.env.REACT_APP_DOIT_IDE_CPP);
                break;
            case "Java":
                setLanguage("java");
                aceEditorRef.current.editor.setValue(process.env.REACT_APP_DOIT_IDE_JAVA);
                break;
            case "Python":
                setLanguage("python");
                aceEditorRef.current.editor.setValue(process.env.REACT_APP_DOIT_IDE_PYTHON);
                break;
            case "NodeJS":
                setLanguage("javascript");
                aceEditorRef.current.editor.setValue(process.env.REACT_APP_DOIT_IDE_JAVASCRIPT);
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
        document.getElementById("loading").style.display="inline-block";
        const input=document.getElementById("input").value;
        const data={code,input};
        await fetch("/"+lang,{
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
                    document.getElementById("loading").style.display="none";
                    document.getElementById("status").style.backgroundColor="#ff3b47";
                    setOutput(data.stderr);
                }
                else
                {
                    document.getElementById("loading").style.display="none";
                    document.getElementById("status").style.backgroundColor="#00d742";
                    setOutput(data.stdout);
                }
            });
    }

    const Run = () => {
        const code=aceEditorRef.current.editor.getValue();
        if(code&&Buffer.byteLength(code,"utf8")/1000<=100)
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
                case "Python":
                    submitToCompile("python",code);
                    break;
                case "NodeJS":
                    submitToCompile("node",code);
                    break;
                default:
                    break;
            }
        else if(!code)
            swal({
                title: "OOPS!",
                text: "IDE Editor may not be empty!",
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
        else
            swal({
                title: "OOPS!",
                text: "Maximum size for IDE Editor is 100KB!",
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
    }

    const Open = (event) =>{
        const fileName=document.getElementById('open').value.toLowerCase();
        if(!fileName.endsWith('.txt')&&!fileName.endsWith('.c')&&!fileName.endsWith('.cpp')&&!fileName.endsWith('.java')&&!fileName.endsWith('.py')&&!fileName.endsWith('.js'))
            swal({
                title: "OOPS!",
                text: "Please upload a compatible file!",
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
        else
        {
            const reader=new FileReader();
            reader.onload=(() => {
                return function(e) {
                    if(Buffer.byteLength(e.target.result,"utf8")/1000<=100)
                        aceEditorRef.current.editor.setValue(e.target.result);
                    else
                        swal({
                            title: "OOPS!",
                            text: "Maximum size for IDE Editor is 100KB!",
                            icon: "error",
                            buttons: {
                                confirm: {text:'OK',className:'alert-button'}
                            }
                        });
                };
            })(event.target.files[0]);
            reader.readAsText(event.target.files[0]);
        }
    }

    const Format = () => {
        const code=aceEditorRef.current.editor.getValue();
        if(Buffer.byteLength(code,"utf8")/1000<=100)
            aceEditorRef.current.editor.setValue(beautify(code, { indent_size: 4, space_in_empty_paren: true }));
        else
            swal({
                title: "OOPS!",
                text: "Maximum size for IDE Editor is 100KB!",
                icon: "error",
                buttons: {
                    confirm: {text:'OK',className:'alert-button'}
                }
            });
    }

    const Find = () => {
        aceEditorRef.current.editor.execCommand("find");
    }

    return(
        <>
            <div style={{backgroundColor: "#282a2e"}} className="fadeIn">
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
                    <label style={{cursor: "pointer",color: "white"}} htmlFor="open">
                        <i className="fa fa-file"/>|OPEN
                    </label>
                    <input onChange={Open} type="file" id="open" name="open" accept=".txt,.c,.cpp,.java,.py,.js" style={{display: "none"}}/>
                    <br/>
                    <button onClick={Format} className="button-white responsive-no-button-border" style={{borderRadius: "5px"}}>
                        <i className="fa fa-edit"/>|Beautify
                    </button>
                    <button onClick={Find} className="button-white responsive-no-button-border" style={{borderRadius: "5px"}}>
                        <i className="fa fa-search"/>|Find
                    </button>
                    <select id="text-size" onChange={()=>setTextSize(document.getElementById("text-size").value)}>
                        <option value="10pt">10pt</option>
                        <option value="11pt">11pt</option>
                        <option value="12pt" selected>12pt</option>
                        <option value="13pt">13pt</option>
                        <option value="14pt">14pt</option>
                        <option value="15pt">15pt</option>
                        <option value="16pt">16pt</option>
                        <option value="17pt">17pt</option>
                        <option value="18pt">18pt</option>
                    </select>
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
                            fontSize: textSize
                        }}
                        defaultValue={process.env.REACT_APP_DOIT_IDE_C}
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
                    <center>
                        <div className="lds-ellipsis" style={{background: "transparent"}} id="loading"><div style={{background: "white"}}></div><div style={{background: "white"}}></div><div style={{background: "white"}}></div><div style={{background: "white"}}></div></div>
                    </center>
                    <div className="output">
                        <b style={{marginLeft: "5px"}}>Input</b>
                        <div className="screen" style={{padding: "0"}}>
                            <textarea className="input" id="input"/>
                        </div>
                    </div>
                    <br/>
                    <div className="output">
                        <div className="status" id="status"/>
                        <div className="screen">
                            <p>-&#62; Output:<b>{output}</b><span className="prompt-cursor"/></p>
                        </div>
                    </div>
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