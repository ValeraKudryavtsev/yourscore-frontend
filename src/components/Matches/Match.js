import Image from "../Image";
import Game from "./Game";

const Match = (props) => {
    const {match, setId, id} = props

    function changeItem() {
        setId(id)
    }

    return(
        <li className="matches__item">
            <div className="matches__item-box">
                <div className="matches__item-heading">
                    <Image src={match.area.flag} alt="competition emblem" className="matches__item-emblem" />
                    <h3 className="matches__item-title">
                        <span className="matches__item-subtitle">{match.area.name}</span>
                        {match.competition.name}
                    </h3>
                </div>

                <button className="changeIdButton" onClick={changeItem} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className="changeIdButton__icon"
                         viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path
                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                </button>
            </div>
            <Game match={match} />
        </li>
    )
}

export default Match