import {useEffect, useState} from "react";
import axios from "axios";

function User(){

    const [users, setUser] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:9000/test").then((res)=>{
            console.log(res)
        })
    },[])

    return <div>
        HI USER
    </div>
}
export default User;