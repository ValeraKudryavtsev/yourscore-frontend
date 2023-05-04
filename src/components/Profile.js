import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "./Other/Loader";
// import logo from "../images/logo.png";
import Image from "./Other/Image";

const Profile = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [followedTeams, setFollowedTeams] = useState([])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch("http://localhost:8080/user/get", {
                headers: {
                    "Content-Type": "application/json",
                    "AUTHORIZATION": window.localStorage.getItem('token')
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setData(data)
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                    setErr(true)
                })
                .finally(() => {
                    setLoading(false)
                })
            fetch("http://localhost:8080/team/list", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "AUTHORIZATION": window.localStorage.getItem('token')
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setFollowedTeams(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, 500)
    }, [])

    function logout() {
        window.localStorage.setItem('token', '')
        navigate("/login")
    }

    return (
        data.error || err ? navigate("/login") :
            loading ? <Loader /> :
                <div className="profile">
                    <div className="profile__wrap">

                        <div className="profile__card">
                            <svg className="profile__image" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88">
                                <path d="M61.44,0c8.32,0,16.25,1.66,23.5,4.66l0.11,0.05c7.47,3.11,14.2,7.66,19.83,13.3l0,0c5.66,5.65,10.22,12.42,13.34,19.95 c3.01,7.24,4.66,15.18,4.66,23.49c0,8.32-1.66,16.25-4.66,23.5l-0.05,0.11c-3.12,7.47-7.66,14.2-13.3,19.83l0,0 c-5.65,5.66-12.42,10.22-19.95,13.34c-7.24,3.01-15.18,4.66-23.49,4.66c-8.31,0-16.25-1.66-23.5-4.66l-0.11-0.05 c-7.47-3.11-14.2-7.66-19.83-13.29L18,104.87C12.34,99.21,7.78,92.45,4.66,84.94C1.66,77.69,0,69.76,0,61.44s1.66-16.25,4.66-23.5 l0.05-0.11c3.11-7.47,7.66-14.2,13.29-19.83L18.01,18c5.66-5.66,12.42-10.22,19.94-13.34C45.19,1.66,53.12,0,61.44,0L61.44,0z M16.99,94.47l0.24-0.14c5.9-3.29,21.26-4.38,27.64-8.83c0.47-0.7,0.97-1.72,1.46-2.83c0.73-1.67,1.4-3.5,1.82-4.74 c-1.78-2.1-3.31-4.47-4.77-6.8l-4.83-7.69c-1.76-2.64-2.68-5.04-2.74-7.02c-0.03-0.93,0.13-1.77,0.48-2.52 c0.36-0.78,0.91-1.43,1.66-1.93c0.35-0.24,0.74-0.44,1.17-0.59c-0.32-4.17-0.43-9.42-0.23-13.82c0.1-1.04,0.31-2.09,0.59-3.13 c1.24-4.41,4.33-7.96,8.16-10.4c2.11-1.35,4.43-2.36,6.84-3.04c1.54-0.44-1.31-5.34,0.28-5.51c7.67-0.79,20.08,6.22,25.44,12.01 c2.68,2.9,4.37,6.75,4.73,11.84l-0.3,12.54l0,0c1.34,0.41,2.2,1.26,2.54,2.63c0.39,1.53-0.03,3.67-1.33,6.6l0,0 c-0.02,0.05-0.05,0.11-0.08,0.16l-5.51,9.07c-2.02,3.33-4.08,6.68-6.75,9.31C73.75,80,74,80.35,74.24,80.7 c1.09,1.6,2.19,3.2,3.6,4.63c0.05,0.05,0.09,0.1,0.12,0.15c6.34,4.48,21.77,5.57,27.69,8.87l0.24,0.14 c6.87-9.22,10.93-20.65,10.93-33.03c0-15.29-6.2-29.14-16.22-39.15c-10-10.03-23.85-16.23-39.14-16.23 c-15.29,0-29.14,6.2-39.15,16.22C12.27,32.3,6.07,46.15,6.07,61.44C6.07,73.82,10.13,85.25,16.99,94.47L16.99,94.47L16.99,94.47z" />
                            </svg>
                            <h1 className="profile__username">{data.username}</h1>
                            <h2 className="profile__email">{data.email}</h2>
                            <button className="profile__logout-button" type="button" onClick={logout}>Выход</button>
                        </div>
                        <div className="profile__followed">
                            <h2 className="profile__followed-heading">
                                <div className="profile__followed-heading-icon"></div>
                                Избранные команды
                            </h2>
                            <ul className="profile__followed-list">
                                {followedTeams.length ?
                                    followedTeams.map((e, id) =>
                                    <li className="profile__followed-item" key={id}>
                                        <Image src={e.teamEmblemUrl} alt="team logo" className="profile__followed-emblem" />
                                        {e.teamName}
                                    </li>
                                    ):
                                    <>
                                        <li className="profile__followed-item">Список пуст</li>
                                        <li className="profile__followed-item">Добавить команду в избранное можно с помощью кнопки на странице 'Лиги'</li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="profile__edit">
                        <ul className="profile__edit-list">
                            <li className="profile__edit-item">
                                <div className="profile__edit-item-box">
                                    <h4 className="profile__edit-item-heading">
                                        Редактирование аккаунта
                                    </h4>
                                    <p className="profile__edit-item-text">
                                        Нажав на кнопку вы сможете изменить имя пользователя, почту или пароль
                                    </p>
                                </div>
                                <button className="profile__edit-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profile__edit-button-icon" viewBox="0 0 16 16">
                                        <path
                                            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                        <path
                                            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                    </svg>
                                </button>
                            </li>
                            <li className="profile__edit-item-br"></li>
                            <li className="profile__edit-item">
                                <div className="profile__edit-item-box">
                                    <h4 className="profile__edit-item-heading">
                                        Удаление аккаунта
                                    </h4>
                                    <p className="profile__edit-item-text">
                                        При удалении аккаунта его невозможно будет восстановить
                                    </p>
                                </div>
                                <button className="profile__edit-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="profile__edit-button-icon-d" viewBox="0 0 16 16">
                                        <path
                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
    )
}

export default Profile