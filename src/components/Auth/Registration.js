import {Link} from "react-router-dom";

const Registration = () => {
    function registrationFun() {
        console.log("success")
    }

    return (
        <div className="sign-in">
            <div className="sign-in__box">
                <h3 className="sign-in__title">
                    Регистрация
                </h3>
                <form onSubmit={registrationFun} className="sign-in__form">
                    <input required
                           className="sign-in__input"
                           type="text"
                           name="username"
                           placeholder="Введите логин"/>
                    <input required className="sign-in__input"
                           type="email"
                           name="email"
                           placeholder="Введите email"/>
                    <input required className="sign-in__input"
                           type="password"
                           name="password"
                           placeholder="Введите пароль"/>
                    <input required className="sign-in__input"
                           type="password"
                           name="password"
                           placeholder="Повторите пароль"/>
                    <button className="sign-in__button" type="submit">Sign Up</button>
                </form>
                <p className="sign-in__text">
                    <Link className="sign-in__link" to={"/profile"}>Вход</Link>
                </p>
            </div>
        </div>
    )
}

export default Registration