import {Link} from "react-router-dom";

const MainNav = () => {
    return (
        <nav className="header__nav container">
            <Link className="header__text" to={"/"}>Матчи</Link>
            <Link className="header__text" to={"/leagues"}>Лиги</Link>
            <Link className="header__text" to={"/news"}>Лента</Link>
            <Link className="header__text" to={"/about-us"}>Компания</Link>
            <Link className="header__text" to={"/goods"}>Мерч</Link>
            <Link className="header__text" to={"/followed"}>Избранное</Link>
            <Link className="header__text" to={"/profile"}>Профиль</Link>
        </nav>
    )
}

export default MainNav