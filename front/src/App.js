import './App.css';
import "milligram";
import logo from "./images/logo.png";

function App() {
  return(
    <>
      <nav className="navigation">
        <section className="container">
          <img className="rotation" src={logo}/>
          <ul className="navigation-list float-right">
             <li className="navigation-item"><a className="navigation-link button button-outline" href="/list">LOGIN</a></li>
             <li className="navigation-item"><a className="navigation-link button button-outline" href="/login">REGISTER</a></li>
          </ul>
        </section>
      </nav>
    </>
  );
}

export default App;
