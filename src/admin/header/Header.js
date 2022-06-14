import "./header.css";
import {useEffect, useState} from "react";
import axios from "axios";

const logout = () => {
  localStorage.clear();
  window.location.href = 'http://localhost:3000'
}


function Header() {

  const [pictureUrl, setPictureUrl] = useState("");
  const [username, setUsername] = useState("")


  useEffect(() => {
    let phoneNumber = localStorage.getItem("phoneNumber")
    axios.get('http://localhost:9000/api/v1/user/' + phoneNumber).then(res => {
      setUsername(res.data.firstName)
      setPictureUrl(res.data.imageUrl)
      console.log(res)
    })
  });

  return (
    <div>
      <header>
        <div className="container">
          <ul>
            <li>{(username === "") ? <span>User</span> : username}</li>
            <li>{
              (pictureUrl === "") ? <img src="/images.png" alt="Avatar" className="avatar"/> :
                <img src={pictureUrl} alt="Avatar" className="avatar" alt="Avatar" className="avatar"/>}</li>
            <li>
              <a href="#" className="btn btn-info" onClick={logout}>
                <span className="glyphicon glyphicon-log-out"/> Log out
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header;
