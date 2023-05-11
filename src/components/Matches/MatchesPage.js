import {useEffect, useState} from "react";
import Match from "./Match";
import Loader from "../Other/Loader";
import ErrorPage from "../Other/ErrorPage";
import LiveScore from "./LiveScore";

const MatchesPage = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)
    const allowedLeagues = ['CL', 'BL1', 'PD', 'EC', 'DED', 'PL', 'FL1', 'SA', 'PPL']
    const validMatches = []
    const [matchesArrayId, setId] = useState(0)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch("https://yourscore-backend.onrender.com/matches")
                .then(resp => resp.json())
                .then(data => {
                    setData(data.matches)
                    console.log(data.matches)
                })
                .catch(err => {
                    setErr(err)
                    // console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 500)
    }, [])

    data.forEach((item) => {
        if (allowedLeagues.indexOf(item.competition.code) !== -1) {
            validMatches.push(item)
        }
    })
    // console.log(validMatches)

    return(
        <>
            {err ? <ErrorPage /> :
                loading ? <Loader /> :
                    validMatches.length > 0 ?
                        <div className="matches__page">
                            <ul className="matches__list">
                                {validMatches ? validMatches.map((e, id) => <Match match={e} setId={setId} id={id} currentId={matchesArrayId} key={id} />) : <p>Сегодня нет игр</p>}
                            </ul>
                            {validMatches[matchesArrayId] ? <LiveScore match={validMatches[matchesArrayId]} /> : null}
                        </div> :
                        <div className="matches__empty">
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
                            <h3 className="matches__empty-title">
                                Матчей нет!
                            </h3>
                            <p className="matches__empty-text">
                                Расписание интересующей команды можно узнать, добавив ее в избранное
                            </p>
                        </div>
            }
        </>
    )
}

export default MatchesPage