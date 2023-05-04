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
        fetch("http://localhost:8080/team/list", {
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
    return (
        followedTeams.error ? navigate("/login") :
            loading ? <Loader /> :
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
                    <FollowedMatches code={currentPathName} />
                </div>
    )
}

export default FollowedPage