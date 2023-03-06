import {useEffect, useState} from "react";
import Match from "./Match";
import Loader from "../Loader";
import ErrorPage from "../ErrorPage";
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
            fetch("https://api.football-data.org/v4/matches", {
                headers: {
                    'X-Auth-Token': 'fe382c8a16f0430ca32f601d38888099'
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setData(data.matches)
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
    console.log(validMatches)

    return(
        <>
            {err ? <ErrorPage /> :
                loading ? <Loader /> :
                    <div className="matches__page">
                        <ul className="matches__list">
                            {validMatches ? validMatches.map((e, id) => <Match match={e} setId={setId} id={id} key={id} />) : <p>Сегодня нет игр</p>}
                        </ul>
                        {validMatches[matchesArrayId] ? <LiveScore match={validMatches[matchesArrayId]} /> : null}
                    </div>
            }
        </>
    )
}

export default MatchesPage