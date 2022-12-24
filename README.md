<p align="center">
    <img src="doit_logo.png" alt="DoIT Logo">
</p>

# DoIT
WARNING! THIS IS A DEMO DOCUMENTATION! DOCUMENTATION WILL BE CONTINUED SOON!

## The problem
Many coding interview platforms look the same, have a problem, an IDE and show a boring score. This is not attracting and keeping the dopamine high for users.

## Solution
A platform with a Mentor Bot to search for useful resources and help students anytime. In addition, the platform in feauter must include AI and Machine Learning courses to entertain the students.

## Before to start the documentation
Hi! My name is Alexandru Carmici and this is the most impactful project that has brought my development skills to the next level. The project was carried out before any work experience project. This was my first real project even though it was a personal project. It is a soul project because the main tasks of these projects were very unusual. For example:
1. I created an online IDE in the platform that compiles 4 different programming languages ​​on the server, I also had to think of a solution for a security that does not harm the servers
2. I learned to integrate a payment system, Stripe, with a monthly and annual subscription system. I also learned security practices to verify that the card is suitable for subscription (not expired or otherwise invalid).
3. I learned to make a search engine integrated with wikipedia to help users with useful information about technical concepts. For the search engine system we used NLP to take main nouns for the sentence and search information about them.
AND OTHER

For me, this is the biggest project of my entire career, even if it is not commercial and in use. This is why I finally decided to make it public. This is why I finally decided to make it public. Because it's the project of my heart, I finally decided to make it OPEN SOURCE, with the aim of giving you as much value as it gave me. Even though it is not a perfect project that meets the highest standards, from the mistakes in this project I learned the most valuable practices at the beginning of a career as a full-stack developer. I hope it will be useful in your career development, especially if you are a beginner or junior developer.

That was the spark that brought the great fire!

Good luck and feel free to contact me if you'd like to contribute to this one as well and switch to full-stack sensei developer!

# Main components from the application

## Generally Aspects
This application was made using ReactJS, NodeJS, ExpressJS, MongoDB, Stripe API and Ace Editor. All environmets variable are stored in ".env" files.

## Front-end
The routes for the entire application are defined in App.js int this mode:

### App.js
```
function App() {
  AOS.init({
    duration: 1000
  });
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <PublicRoute restricted={false} exact path="/home" component={Homepage}/>
        <PublicRoute restricted={true} exact path="/login" component={Login}/>
        <PublicRoute restricted={true} exact path="/register" component={Register}/>
        <PublicRoute restricted={true} exact path="/verificationlink" component={VerificationLink}/>
        <PublicRoute restricted={true} exact path="/resendlink" component={ResendLink}/>
        <PublicRoute restricted={true} exact path="/forgotpass" component={ForgotPassword}/>
        <PublicRoute restricted={true} exact path="/forgotpass/verificationkey" component={VerificationKey}/>
        <PublicRoute exact path="/demo" component={IDE}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute exact path="/dashboard/quiz" component={Quiz}/>
        <PrivateRoute exact path="/dashboard/quiz/logical" component={LogicalQuiz}/>
        <PrivateRoute exact path="/dashboard/quiz/technical" component={TechnicalQuiz}/>
        <PrivateRoute exact path="/dashboard/quiz/interview" component={InterviewQuiz}/>
        <PrivateRoute exact path="/dashboard/IDE" component={IDE}/>
        <PrivateRoute exact path="/dashboard/settings" component={Settings}/>
        <PrivateRoute exact path="/dashboard/mentor" component={Mentor}/>
        <PrivateRoute exact path="/dashboard/settings/profile/resetpass" component={ResetPassword}/>
        <PrivateRoute exact path="/dashboard/settings/profile/delete" component={DeleteAccount}/>
        <GatewayRoute exact path="/subscription" component={Subscription}/>
        <PublicRoute restricted={false} component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```
The implementations for the templates component may be found on src/components and the pages implementation in src/sources.

## Back-end
The main soruce file for this back-end is in index.js.
The implementation of compiler was made in compiler/compiler.js.

### compiler.js
```
module.exports = function(req,res,lang,type){
    let safe=false;
    switch(type)
    {
        case "c":
            safe=!req.body.code.toLowerCase().includes("sys")&&!req.body.code.toLowerCase().includes("exec")&&!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("file")&&!req.body.code.toLowerCase().includes("remove")&&!req.body.code.toLowerCase().includes("rename")&&!req.body.code.toLowerCase().includes("thread")&&!req.body.code.toLowerCase().includes("uistd")&&!req.body.code.toLowerCase().includes("windows")&&!req.body.code.toLowerCase().includes("fcntl")&&!req.body.code.toLowerCase().includes("errno");
            break;
        case "cpp":
            safe=!req.body.code.toLowerCase().includes("sys")&&!req.body.code.toLowerCase().includes("exec")&&!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("fstream")&&!req.body.code.toLowerCase().includes("remove")&&!req.body.code.toLowerCase().includes("rename")&&!req.body.code.toLowerCase().includes("thread")&&!req.body.code.toLowerCase().includes("uistd")&&!req.body.code.toLowerCase().includes("windows")&&!req.body.code.toLowerCase().includes("file")&&!req.body.code.toLowerCase().includes("fcntl")&&!req.body.code.toLowerCase().includes("errno");
            break;
        case "java":
            safe=!req.body.code.toLowerCase().includes("runtime")&&!req.body.code.toLowerCase().includes("exec")&&!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("thread");
            break;
        case "python":
            safe=!req.body.code.toLowerCase().includes("os")&&!req.body.code.toLowerCase().includes("exec")&&!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("sys")&&!req.body.code.toLowerCase().includes("thread")&&!req.body.code.toLowerCase().includes("matplotlib");
            break;
        case "node":
            safe=!req.body.code.toLowerCase().includes("process")&&!req.body.code.toLowerCase().includes("socket")&&!req.body.code.toLowerCase().includes("tempfile")&&!req.body.code.toLowerCase().includes("thread");
            break;
        default:
            break;
    }
    if(safe)
        lang.runSource(req.body.code, {stdin: req.body.input})
            .then(result => res.send(result))
            .catch(err=>res.send({stderr: err}));
    else
        res.send({stderr: "Error to compile the code!"});
}
```

The implementation of serch engine may be seen in mentor/mentor.js:

### mentor.js
```
function strtok(src,delim)
{
    let delim_escaped=new RegExp('['+delim.replace(/[\[\]\(\)\*\+\?\.\\\^\$\|\#\-\{\}\/]/g, "\\$&")+']','g');
    return src.replace(delim_escaped,delim[0]).split(delim[0]);
}

function strstr(haystack, needle, before_needle)
{
    if(haystack.indexOf(needle)>=0) 
        return before_needle ? haystack.substr(0, haystack.indexOf(needle)) 
               : haystack.substr(haystack.indexOf(needle));
    return false;
}

module.exports=function(req,res){
    let words=new pos.Lexer().lex(req.body.search);
    let tags=new pos.Tagger()
        .tag(words)
        .map(function(tag){return tag[0] + '/' + tag[1];})
        .join(' ');
    let places=chunker.chunk(tags, '[{ tag: NNP|NNS|NN|JJ|VBG }]');
    let noums=[];
    strtok(places,"{}").forEach(element => {
        element=element.replace(/\s/g,"");
        if(strstr(element,"/NNP",true))
            noums.push(strstr(element,"/NNP",true));
        else if(strstr(element,"/NNS",true))
            noums.push(strstr(element,"/NNS",true));
        else if(strstr(element,"/NN",true))
            noums.push(strstr(element,"/NN",true));
        else if(strstr(element,"/JJ",true))
            noums.push(strstr(element,"/JJ",true));
        else if(strstr(element,"/VBG",true))
            noums.push(strstr(element,"/VBG",true));
    });
    if(!noums.length)
        return res.send({result: [{_id: null,keyword: "SORRY!",definition: "We may not find it!"}]});
    noums=Array.from(new Set(noums));
    Dictionary.find({},(err,dictionary)=>{
        if(err)
            return res.send({result: [{_id: null,keyword: "SORRY!",definition: "We may not find it!"}]});
        else if(dictionary)
        {
            let result=[];
            for(let element in dictionary)
                for(let index in noums)
                    if(dictionary[element].keyword==noums[index])
                    {
                        result.push(dictionary[element]);
                        break;
                    }
            if(result.length)
                return res.send({result: result});
            else
                return res.send({result: [{_id: null,keyword: "SORRY!",definition: "We may not find it!"}]});
        }
    });
}
```



WARNING! THIS IS A DEMO DOCUMENTATION! DOCUMENTATION WILL BE CONTINUED SOON!