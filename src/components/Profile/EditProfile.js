import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const [password, setPassword] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [username, setUsername] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [email, setEmail] = useState("")
    const [passwordEnable, setPasswordEnable] = useState(true)
    const [usernameEnable, setUsernameEnable] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://yourscore-backend.onrender.com/user/get", {
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setUsername(data.username)
                setNewUsername(data.username)
                setEmail(data.email)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function checkUsername(newUsername) {
        if (newUsername !== "")
            fetch(`https://yourscore-backend.onrender.com/user/check/${newUsername}`)
                .then(resp => resp.text())
                .then(data => {
                    if (data === "" || username === newUsername) {
                        setUsernameEnable(true)
                    } else {
                        setUsernameEnable(false)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
    }

    function checkPassword(password1, password2) {
        if (password1 === password2) {
            setPasswordEnable(true)
        } else {
            setPasswordEnable(false)
        }
    }

    function changeUsername(e) {
        e.preventDefault()

        fetch(`https://yourscore-backend.onrender.com/user/update-username/${newUsername}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                goToProfile()
            })
    }

    function changeEmail(e) {
        e.preventDefault()

        fetch(`https://yourscore-backend.onrender.com/user/update-email/${email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                goToProfile()
            })
    }

    function changePassword(e) {
        fetch(`https://yourscore-backend.onrender.com/user/update-password/${userPassword}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                goToProfile()
            })
    }

    function editDummy(e) {
        e.preventDefault()
    }

    function goToProfile() {
        navigate("/profile")
    }

    return (
        <div className="profile-edit">
            <div className="profile-edit__wrap">
                <div className="profile__delete-back">
                    <button className="profile__delete-back-button" type="button" onClick={goToProfile}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="profile__delete-back-icon" viewBox="0 0 16 16">
                            <path
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="profile-edit__image" viewBox="0 0 16 16">
                    <defs>
                        <linearGradient id="followed__info-image-bgc" x2="0.35" y2="1">
                            <stop offset="0%" stop-color="var(--color-stop)"/>
                            <stop offset="30%" stop-color="var(--color-stop)"/>
                            <stop offset="100%" stop-color="var(--color-bot)"/>
                        </linearGradient>
                    </defs>
                    <path className="gradient-bg"
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path className="gradient-bg"
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
                <h3 className="profile-edit__title">Изменение имени пользователя</h3>
                <form onSubmit={(usernameEnable === true) ? changeUsername : editDummy} className="profile-edit__form">
                    <input required className={usernameEnable && newUsername !== "" ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="text"
                           name="username"
                           value={newUsername}
                           onChange={(el) => {
                               checkUsername(el.target.value)
                               setNewUsername(el.target.value)
                           }}
                           placeholder="Введите логин"/>
                    {newUsername !== "" ? <></> : <p className="sign-in__error-message">Имя пользователя не может быть пустым</p>}
                    {usernameEnable ? <></> : <p className="sign-in__error-message">Пользователь с таким именем уже существует</p>}
                    <button className="profile-edit__button" type="submit">Изменить</button>
                </form>
                <h3 className="profile-edit__title">Изменение почты</h3>
                <form onSubmit={changeEmail} className="profile-edit__form">
                    <input required className="sign-in__input"
                           type="email"
                           name="email"
                           value={email}
                           onChange={(el) => {
                               setEmail(el.target.value)
                           }}
                           placeholder="Введите email"/>
                    <button className="profile-edit__button" type="submit">Изменить</button>
                </form>
                <h3 className="profile-edit__title">Изменение пароля</h3>
                <form onSubmit={(passwordEnable === true) ? changePassword : editDummy} className="profile-edit__form">
                    <input required className={passwordEnable ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="password"
                           name="password"
                           value={password}
                           onChange={(el) => {
                               setPassword(el.target.value)
                               if (userPassword !== "") {
                                   checkPassword(el.target.value, userPassword)
                               }
                           }}
                           placeholder="Введите пароль"/>
                    <input required className={passwordEnable ? "sign-in__input" : "sign-in__input sign-in__input-error"}
                           type="password"
                           name="password"
                           value={userPassword}
                           onChange={(el) => {
                               // checkPassword(el.target.value)
                               setUserPassword(el.target.value)
                               if (password !== "") {
                                   checkPassword(password, el.target.value)
                               }
                           }}
                           placeholder="Повторите пароль"/>
                    {passwordEnable ? <></> : <p className="sign-in__error-message">Пароли не совпали</p>}
                    <button className="profile-edit__button" type="submit">Изменить</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile