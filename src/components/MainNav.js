import {Link} from "react-router-dom";

const MainNav = () => {

    // className={(currentPathName === "/leagues") ? "header__text header__text-current" : "header__text"}

    return (
        <nav className="header__nav container" id="myNav">
            <Link className="header__text" to={"/"}>Матчи</Link>
            <Link className="header__text" to={"/leagues"}>Лиги</Link>
            <Link className="header__text" to={"/followed"}>Избранное</Link>
            <Link className="header__text" to={"/news"}>Лента</Link>
            <Link className="header__text" to={"/about-us"}>Компания</Link>
            <Link className="header__text" to={"/goods"}>Магазин</Link>
            <Link className="header__text" to={"/profile"}>Профиль</Link>
        </nav>
    )
}

export default MainNav