import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../action/api";
import {toast} from 'react-toastify';


const initialState = {user: {}, authorization: false}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onAuthSuccess: (state, {payload: {accessToken, refreshToken}}) => {
            localStorage.setItem('access-token', accessToken)
            localStorage.setItem('refresh-token', refreshToken)
            toast.success('Success', {autoClose: 500})
            state.authorization=true
        },
        onFail: (state, {payload: {data: {message}}}) => {
            toast.error(message, {autoClose: 1500})
        },
    }
})


export const login = (data) => apiCall({
    url: 'user/auth/login',
    method: 'POST',
    onSuccess: slice.actions.onAuthSuccess.type,
    onFail: slice.actions.onFail.type,
    data
});


export default slice.reducer