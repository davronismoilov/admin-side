import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css'
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import store from "./store/store";
import {ToastContainer} from "react-toastify";
import reportWebVitals from "./reportWebVitals";

import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <ToastContainer/>
                <App/>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);

reportWebVitals();