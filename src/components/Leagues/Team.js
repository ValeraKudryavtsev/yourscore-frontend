import Image from "../Image";

const Team = (props) => {
    const {team} = props
    const form = team.form.split(',')

    return (
        <div className="team">
            <p className="team__position">
                {team.position}
            </p>
            <Image src={team.team.crest} alt="team logo" className="team__emblem" />
            <p className="team__name">
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
        </div>
    )
}

export default Team