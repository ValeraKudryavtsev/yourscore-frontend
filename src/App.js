import './style/reset.css';
import './style/App.css';
import logo from './images/logo.png'
import Image from "./components/Image";
import MainNav from "./components/MainNav";
import {Link, Route, Routes} from "react-router-dom";
import SocialMedia from "./components/SocialMedia";
import AboutUs from "./components/AboutUs"
import ErrorPage from "./components/ErrorPage";
import Leagues from "./components/Leagues";
import MatchesPage from "./components/Matches/MatchesPage";


function App() {
  return (
    <div className="App">
        <header className="header">
            <Link className="header__logo-box" to={"/"}>
                <Image src={logo} className="header__image" alt="YourScore logo"/>
                <h1 className="header__title">YourScore</h1>
            </Link>
            <MainNav />
        </header>
        <main className="main">
            <Routes>
                <Route path="/" element={<MatchesPage />} />
                <Route path="/leagues" element={<Leagues />}>
                    <Route path=":leagueCode" element={<Leagues />}/>
                </Route>
                <Route path="/about-us" element={<AboutUs />} />

                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </main>
        <footer className="footer">
            <div className="footer__wrap container">
                <div className="footer__msg-box">
                    <Image src={logo} className="footer__image" alt="YourScore logo"/>
                    <p className="footer__text">all rights reserved</p>
                </div>
                <p className="footer__text">Valera Kudryavtsev 2023</p>
                <SocialMedia />
            </div>
        </footer>
    </div>
  );
}

export default App;
