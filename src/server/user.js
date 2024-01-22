import axios from 'axios';
import * as actions from '../store/action';

export const setUser = (user, navigate) => {
    return dispatch => {
        if (user != null) {
            axios.post('http://localhost:8080/api/user/login',
            { Username: user.Username, Password: user.Password })
            .then((d) => {
                dispatch({ type: actions.SET_USER, data: d.data })
                navigate("/homepage")
            }).catch((err) => {console.error(err)})
        }
        else {
            dispatch({ type: actions.SET_USER, user: null })
            navigate("../")
        }
    }
}
export const addUser = (user, navigate) => {
    return dispatch =>
        axios.post('http://localhost:8080/api/user/sighin', user)
            .then((d) => {
                dispatch({ type: actions.SET_USER, data: d.data })
                navigate("/homepage")
            })
            .catch((err) => console.error(err))
}
