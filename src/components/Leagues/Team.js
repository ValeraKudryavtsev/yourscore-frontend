import Image from "../Other/Image";
import {useEffect, useState} from "react";

const Team = (props) => {
    const {team} = props
    const form = team.form.split(',')
    const [followedTeams, setFollowedTeams] = useState([])

    useEffect(() => {
        fetch("https://yourscore-backend.onrender.com/team/list", {
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
    }, [followedTeams])

    function followTeam() {
        followedTeams.pop()
        fetch("https://yourscore-backend.onrender.com/team/follow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                teamCode: team.team.id,
                teamName: team.team.name,
                teamEmblemUrl: team.team.crest
            })
        })
            .then(resp => resp.text())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function unfollowTeam() {
        let teamId = 0
        followedTeams.forEach((el) => {
            if (+el.teamCode === team.team.id) {
                teamId = el.teamId
            }
        })

        fetch(`https://yourscore-backend.onrender.com/team/delete/${teamId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": window.localStorage.getItem('token')
            }
        })
            .then(resp => resp.text())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                followedTeams.pop()
            })
    }

    const isFollowed = () => {
        let result = false
        followedTeams.forEach((el) => {
            if (+el.teamCode === team.team.id) {
                result = true
            }
        })
        return result
    }

    return (
        <div className="team">
            <p className="team__position">
                {team.position}
            </p>
            <Image src={team.team.crest} alt="team logo" className="team__emblem" />
            <p className={window.localStorage.getItem('token') ? "team__name" : "team__name-unauthorized"}>
                {team.team.name}
            </p>
            <ul className="team-stats__list">
                <li className="team-stats__item">{team.playedGames}</li>
                <li className="team-stats__item">{team.won}</li>
                <li className="team-stats__item">{team.draw}</li>
                <li className="team-stats__item">{team.lost}</li>
                <li className="team-stats__item">{team.goalsFor}</li>
                <li className="team-stats__item">{team.goalsAgainst}</li>
                <li className="team-stats__item">{team.goalDifference}</li>
                <li className="team-stats__item team-stats__item-bold">{team.points}</li>
            </ul>
            <ul className="team-form__list">
                {form.map((e, id) =>
                    e === 'W' ? <li key={id} className="team-form__item team-form__item-W">{e}</li> : (
                        e === 'D' ? <li key={id} className="team-form__item team-form__item-D">{e}</li> :
                            <li key={id} className="team-form__item team-form__item-L">{e}</li>
                    )
                )}
            </ul>
            {window.localStorage.getItem('token') ?
                <button className="team__follow-button"
                        onClick={ (followedTeams.length > 0 && isFollowed()) ? unfollowTeam : followTeam}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                         className={(followedTeams.length > 0 && isFollowed()) ? "team__followed-pic" : "team__follow-pic"} viewBox="0 0 16 16">
                        <path
                            d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                    </svg>
                </button> :
                <></>
            }
        </div>
    )
}

export default Team