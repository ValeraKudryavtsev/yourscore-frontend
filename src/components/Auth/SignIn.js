import {Link} from "react-router-dom";

const SignIn = () => {
    function signInFun() {
        console.log("success")
    }

    return (
        <div className="sign-in">
            <div className="sign-in__box">
                <h3 className="sign-in__title">
                    Вход <span className="sign-in__subtitle">YourScore</span>
                </h3>
                <form onSubmit={signInFun} className="sign-in__form">
                    <input required
                           className="sign-in__input"
                           type="text"
                           name="username"
                           placeholder="Введите логин"/>
                    <input required className="sign-in__input"
                           type="password"
                           name="password"
                           placeholder="Введите пароль"/>
                    <button className="sign-in__button" type="submit">Sign In</button>
                </form>
                <p className="sign-in__text">
                    Нет аккаунта? <Link className="sign-in__link" to={"/registration"}>Регистрация</Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn