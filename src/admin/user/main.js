import {useEffect, useState} from "react";
import axios from "axios";

function User(){

    let [users, setUser] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:9000/api/v1/user?page=0").then((res)=>{
            console.log(res.data)
        })
    },[])

    return <div>
        Hello
    </div>
}
export default User;