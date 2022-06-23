import axios from "axios";
import {apiCall} from "../action/api";


const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== apiCall.type) {
        next(action);
        return;
    }
    next(action)
    const {url, method, onSuccess, onFail, data, headers} = action.payload

    console.log(url)
    axios({
        baseURL: 'http://10.10.1.157:8080/api/v1',
        url,
        method,
        headers,
        data,
    }).then(res => {
        dispatch({
            type: onSuccess,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: onFail,
            payload: err.response
        })
    })
}

export default api;