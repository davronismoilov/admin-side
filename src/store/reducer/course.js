import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../action/api";
import {toast} from 'react-toastify';


const initialState = {courses: []}

const slice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        saveCourses: (state, {payload: {data}}) => {
            state.courses = data
        },
        onFail: (state, {payload}) => {
            toast.warning('Courses not found', {autoClose: 1500})
        },
    }
})


export const getCourses = (name) => apiCall({
    url: 'course/get?name=' + name,
    method: 'GET',
    onSuccess: slice.actions.saveCourses.type,
    onFail: slice.actions.onFail.type,
});

export const getList = () => apiCall({
    url: 'course/list',
    method: 'GET',
    onSuccess: slice.actions.saveCourses.type,
    onFail: slice.actions.onFail.type,
});


export default slice.reducer