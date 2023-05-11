import {Link, useLocation, useNavigate} from "react-router-dom";
import Image from "../Other/Image";
import {useEffect, useState} from "react";
import FollowedMatches from "./FollowedMatches";
import Loader from "../Other/Loader";

const FollowedPage = () => {
    const [followedTeams, setFollowedTeams] = useState([])
    const location = useLocation()
    const currentPathName = location.pathname.toString().split("/")[2]
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        fetch("https://yourscore-backend.onrender.com/team/list", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setFollowedTeams(data)
                // navigate(`/followed/${followedTeams[0].teamCode}`)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    // обработка пустого массива (т.е. если избранных команд нет)

    return (
        followedTeams.error ? navigate("/login") :
            loading ? <Loader /> :
                followedTeams.length ?
                    <div className="followed__box">
                        <div className='leagues__list'>
                            {
                                followedTeams.map((e, id) =>
                                    <Link key={id} className={(currentPathName === e.teamCode) ? "leagues__item leagues__item-current" : "leagues__item"} to={`${e.teamCode}`}>
                                        <Image src={e.teamEmblemUrl} alt="flag" className="leagues__item-flag" />
                                        {e.teamName}
                                    </Link>
                                )
                            }
                        </div>
                        {currentPathName ?
                            <FollowedMatches code={currentPathName} /> :
                            <div className="followed__info-box">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="followed__info-image" viewBox="0 0 16 16">
                                    <defs>
                                        <linearGradient id="followed__info-image-bgc" x2="0.35" y2="1">
                                            <stop offset="0%" stop-color="var(--color-stop)"/>
                                            <stop offset="30%" stop-color="var(--color-stop)"/>
                                            <stop offset="100%" stop-color="var(--color-bot)"/>
                                        </linearGradient>
                                    </defs>
                                    <path className="gradient-bg"
                                          d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                                </svg>
                                <h2 className="followed__info-title">
                                    Выберите команду
                                </h2>
                                <p className="followed__info-text">
                                    После выбора команды, вы увидите расписание матчей для текущего сезона
                                </p>
                            </div>
                        }
                    </div> :
                    <div className="followed__info-box">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="followed__info-image" viewBox="0 0 16 16">
                            <defs>
                                <linearGradient id="followed__info-image-bgc" x2="0.35" y2="1">
                                    <stop offset="0%" stop-color="var(--color-stop)"/>
                                    <stop offset="30%" stop-color="var(--color-stop)"/>
                                    <stop offset="100%" stop-color="var(--color-bot)"/>
                                </linearGradient>
                            </defs>
                            <path className="gradient-bg"
                                d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                        </svg>
                        <h2 className="followed__info-title">
                            Следите за результатами любимых команд
                        </h2>
                        <p className="followed__info-text">
                            Нажмите на иконку справа от интересующей команды в турнирной таблице на странице 'Лиги'
                        </p>
                    </div>
    )
}

export default FollowedPage