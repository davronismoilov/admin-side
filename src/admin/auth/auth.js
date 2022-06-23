import React, {useState, useEffect} from 'react';
import './auth.css';
import {useNavigate} from "react-router";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {login} from "../../store/reducer/user";


function Auth({authorization, login}) {
    let navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (authorization)
            navigate('/')
    }, [authorization])


    function loginFunc() {
        if (phoneNumber && password) {
            login({phoneNumber, password})
        } else
            toast.error("You need to fill all blanks", {autoClose: 1500})
    }

    return <div>
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <div className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"/>
                            <input type="text" name="phoneNumber" className="login__input"
                                   value={phoneNumber}
                                   placeholder="User name / Email"
                                   onChange={({target: {value}}) => setPhoneNumber(value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"/>
                            <input type="password" name="password" className="login__input" placeholder="Password"
                                   value={password}
                                   onChange={({target: {value}}) => setPassword(value)}/>
                        </div>
                        <button className="button login__submit" onClick={loginFunc}>
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

export default connect(({user: {authorization}}) => ({authorization}), {login})(Auth);