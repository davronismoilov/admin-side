import React, {useReducer, useState} from 'react';
import './auth.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, [action.key]: action.value
            }
        default:
            return {};
    }
};

function Auth() {
    const [auth, dispatch] = useReducer(reducer, {phoneNumber: "", password: ""});
    const [success, setSuccess] = useState(false);


    let navigate = useNavigate();

    function handleInputChange(e) {
        dispatch({
            type: "LOGIN", key: e.target.name, value: e.target.value
        })
    }


    function login() {
        axios.post("http://localhost:9000/api/v1/auth/login", auth).then((res) => {
            // if (res.data.statusCode === 200) {
            if (res.data.statusCode === 200) {
                localStorage.setItem("accessToken", res.data.accessToken)
                localStorage.setItem("refreshToken", res.data.refreshToken);
                return navigate("/admin");
            }
        })
    }

    return <div>
         <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <div className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"/>
                            <input type="text" name="phoneNumber" className="login__input"
                                   placeholder="User name / Email"
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"/>
                            <input type="password" name="password" className="login__input" placeholder="Password"
                                   onChange={handleInputChange}/>
                        </div>
                        <button className="button login__submit" onClick={login}>
                            <span className="button__text">Log In Now</span>
                        </button>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"/>
                    <span className="screen__background__shape screen__background__shape3"/>
                    <span className="screen__background__shape screen__background__shape2"/>
                    <span className="screen__background__shape screen__background__shape1"/>
                </div>
            </div>
        </div>
    </div>

}

export default Auth;