import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ErrorPage from "../Other/ErrorPage";
import Loader from "../Other/Loader";
import Team from "./Team";

const Standings = () => {
    const {code} = useParams()
    const allowedLeagues = ['BL1', 'PD', 'DED', 'PL', 'FL1', 'SA', 'PPL']
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch(`https://api.football-data.org/v4/competitions/${code}/standings`, {
                headers: {
                    'X-Auth-Token': 'fe382c8a16f0430ca32f601d38888099'
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setData(data.standings[0].table)
                })
                .catch(err => {
                    setErr(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 1000)
    }, [code])

    // поправить

    if (allowedLeagues.indexOf(code) === -1) {
        return (<Navigate to={'/leagues/BL1'} />)
    }

    return (
        <>
            {
                err ? <ErrorPage/> :
                    loading ? <Loader/> :
                        <div className="standings__box">
                            <div className="standings__titles-box">
                                <div className="standings__titles">
                                    <p className="team__position">#</p>
                                    <p className="team__title-name">КОМАНДА</p>
                                    <ul className="team-stats__list">
                                        <li className="team-stats__item">И</li>
                                        <li className="team-stats__item">В</li>
                                        <li className="team-stats__item">Н</li>
                                        <li className="team-stats__item">П</li>
                                        <li className="team-stats__item">ГЗ</li>
                                        <li className="team-stats__item">ГП</li>
                                        <li className="team-stats__item">РГ</li>
                                        <li className="team-stats__item team-stats__item-bold">О</li>
                                    </ul>
                                    <div className="team__form">ФОРМА</div>
                                </div>
                            </div>
                            {data.map((e, id) => <Team team={e} key={id} />)}
                        </div>
            }
        </>
    )
}

export default Standings