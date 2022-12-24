![drawing](doit_logo.png){: height="36px" width="36px"}

# DoIT
WARNING! THIS IS A DEMO DOCUMENTATION! TE DOCUMENTATION WILL BE CONTINUED SOON!

## The problem
Many coding interview platform looks the same, they have a proble, an IDE and show a boring score. This is not attract and keep the dopamine highly for the users.

## Solution
A platform with an Mentor Bot for searching usefluu sorces and help students anytime. Addition the platform in feauter must include AI and Machine Learning courses to keep in fun the students

## Before start the documentation
Hi! My name is Alexandru Carmici ant this is the most impactfull prject that brought me my development skills to the next level. The project was made before any work experience project. That was my first real project even if it was a personal project. It is a soul projects because the main tasks for these project was very unusuals. For example:
1. I created an online IDE in platform that compile 4 different programming language on the server, I had to also think to a solution for a security to not harm the servers
2. I learned to integrate a payment system, Stripe, with a subscritpion system monthly and yearly. I also learned security practices to check if the card is right for subscription (not to be expired or invalid in any other way).
3. I learned to make a search engine integrated with wikipedia to help users with usefull information about tech concepts. For the search engine system I used NLP to take main noums for sentence and search informations abut them.
AND MORE

For me, that is the biggest project from my entire career even if It's not a commercial one and in use. That is the reason when I decided finally to make it public. Because it's my heart project and it's so close to Christmass, I have decidet to make it OPEN SOURCE, yep, OPEN SOURCE with the purpose to give YOU velue as much as given me, and still giving. Even it's not a perfect project that respects highest standards, from the mistakes from this projects I learned the most valuable practices that none of any bootcamps may offer from the beginning of a full-stack developer career.

That was the spark that bring the big fire!

Cheers and no hesitate to contact me if you feel to contribue also to it and to level up to sensei full-stack developer! I hope it will be usefull in your careeer development, especially if you are a beginner or a junior developer.

Happy coding!

# Main component from the application

## Generally Aspects
Thia application was made using ReactJS, NodeJS, ExpressJS, MongoDB, Stripe API and Ace Editor. All environmets variable are stored in .env files.

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



WARNING! THIS IS A DEMO DOCUMENTATION! TE DOCUMENTATION WILL BE CONTINUED SOON!