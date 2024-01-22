import axios from 'axios';
import * as actions from '../store/action';

export const getRecipes = () => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/recipe`)
            .then((res) => {
                dispatch({ type: actions.SET_RECIPES, data: res.data })
            })
            .catch((err) =>
                console.error(err)
            )
}

export const addRecipe = (data) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe', data)
        .then(() => {
            dispatch({ type: actions.ADD_RECIPE, data: data })
        })
        .catch((err) => {
            console.error(err)
        })
}

export const editRecipe = (data, selectRecipe) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe/edit', { ...data, UserId: selectRecipe?.UserId, Id: selectRecipe?.Id })
        .then((res) => {
            dispatch({ type: actions.EDIT_RECIPE, data: res.data })
        }).catch((err) => { console.error(err) })
}

export const deleteRecipe = (user, recipe) => {

    return dispatch => axios.post(`http://localhost:8080/api/recipe/delete/${user.Id}`, recipe.Id)
        .then(() => {
            dispatch({ type: actions.DELETE_RECIPE, data: recipe })
        }).catch((err) => console.error(err))

}
