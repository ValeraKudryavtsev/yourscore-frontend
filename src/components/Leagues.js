import {useState} from "react";
import { useEffect } from "react"
import Loader from "./Loader";

const Leagues = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [err, setErr] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetch("https://api.football-data.org/v4/competitions/CL/standings", {
                headers: {
                    'X-Auth-Token': 'fe382c8a16f0430ca32f601d38888099'
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    // setData(data.standings[0].table)
                    setData(data)
                    console.log(data)
                })
                .catch(err => {
                    setErr(err)
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 1500)
    }, []);

    return (
        <div>
            {loading ? <Loader /> :
                <div>
                {
                    // data.map((e, id) => <img key={id} src={e.team.crest}/>)
                }
                </div>
            }
        </div>
    )
}

export default Leagues