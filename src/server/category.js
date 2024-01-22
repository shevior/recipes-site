import axios from 'axios';
import * as actions from '../store/action';

export const getCategories = () => {
    return dispatch => {
        axios.get('http://localhost:8080/api/category')
            .then((c) => {
                dispatch({ type: actions.SET_CATEGORIES, data: c.data })
            })
            .catch((err) => {
                console.error(err)
            })
    }
}

export const addCategory = (name) => {
    return dispatch => {
        axios.post('http://localhost:8080/api/category', { Name: name })
            .then((d) => {
                dispatch({ type: actions.ADD_CATEGORY, data: d.data })
                dispatch(getCategories())
            }).catch((err) => {
                console.error(err)
            })
    }
}