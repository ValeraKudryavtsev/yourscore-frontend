import Image from "../Other/Image";
import Team from "./Team";
import MatchLoad from "./MatchLoad";

const LiveScore = (props) => {
    const {match} = props

    const date = new Date()
    const timeZone = -date.getTimezoneOffset()/60
    let time = match.utcDate
        .split('T')[1]
        .slice(0, -4)
    const h = (+time.split(':')[0] + timeZone)>24 ? (+time.split(':')[0] + timeZone)%24 : (+time.split(':')[0] + timeZone)
    const m = time.split(':')[1]
    time = `${h}:${m}`

    return (
        <div className="live-score">
            <div className="live-score__wrap">
                <div className="live-score__header">
                    <Image src={match.area.flag} alt="competition emblem" className="live-score__emblem" />
                    <h3 className="live-score__title">
                        {match.area.name}
                    </h3>
                    <h3 className="live-score__title">
                        {match.competition.name}
                    </h3>
                </div>
                <div className="live-score__box">
                    <Team team={match.homeTeam} />
                    <div className="live-score__middle-zone">
                        <p className="live-score__time">
                            {time}
                        </p>
                        <div className="live-score__score-box">
                            <p className="live-score__score-home">
                                {match.score.fullTime.home !== null ? match.score.fullTime.home : '-'}
                            </p>
                            <span className="live-score__score-sep">:</span>
                            <p className="live-score__score-away">
                                {match.score.fullTime.away !== null ? match.score.fullTime.away : '-'}
                            </p>
                        </div>
                        {match.status === "FINISHED" ? <p className="match__status">Окончен</p> : null}
                        {match.status === "PAUSED" ? <><MatchLoad status={match.status} /> <p className="match__status">Перерыв</p></>  : null}
                        {match.status === "IN_PLAY" ? <MatchLoad status={match.status} /> : null}
                    </div>
                    <Team team={match.awayTeam} />
                </div>
                <div className="live-score__ad">
                    <Image src={match.competition.emblem} alt="emblem" className="live-score__comp-emblem" />
                </div>
            </div>
        </div>
    )
}

export default LiveScore