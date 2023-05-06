import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ErrorPage from "../Other/ErrorPage";
import Loader from "../Other/Loader";
import Team from "./Team";
import Image from "../Other/Image";
import logo from '../../images/logo.png'

const Standings = () => {
    const {code} = useParams()
    const allowedLeagues = ['BL1', 'PD', 'DED', 'PL', 'FL1', 'SA', 'PPL']
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch(`http://localhost:8080/standings/${code}`)
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
                                    <Image src={logo} alt="team logo" className="team__emblem" />
                                    <p className={window.localStorage.getItem('token') ? "team__name" : "team__name-unauthorized"}>
                                        КОМАНДА
                                    </p>
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
                                    {window.localStorage.getItem('token') ?
                                        <div className="team__follow-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="team__follow-pic-h" viewBox="0 0 16 16">
                                                <path
                                                    d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                                            </svg>
                                        </div> :
                                        <></>
                                    }
                                </div>
                            </div>
                            {data.map((e, id) => <Team team={e} key={id} />)}
                        </div>
            }
        </>
    )
}

export default Standings