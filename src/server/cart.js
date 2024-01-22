import axios from 'axios';
import Swal from 'sweetalert2';
import * as actions from '../store/action';

export const getCart = (user) => {
    return dispatch =>
        axios.get(`http://localhost:8080/api/bay/${user.Id}`)
            .then((res) => {
                dispatch({ type: actions.SET_PRODUCTS, data: res.data })
            })
            .catch((err) =>
                console.error(err)
            )
}

export const deleteProduct = (user, product) => {
    return dispatch => axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`)
        .then(() => {
            dispatch({ type: actions.DELETE_PRODUCT, data: { Name: product.Name, UserId: user.Id, Id: product.Id } })
        }).catch((err) => { console.error(err) })
}

export function addProduct(user, productName, count) {
    return dispatch =>
        axios.post(`http://localhost:8080/api/bay/`, { Name: productName, UserId: user.Id, Count: count }).then((x) => {
            dispatch({ type: actions.ADD_PRODUCT, data: x.data })
            Swal.fire({
                position: "top",
                icon: "success",
                title: "the " + productName + " has been successfully added to your shopping cart"
            });
        }).catch((err) => { console.error(err) })
}

export function editProduct(user, product, count) {

    return dispatch => {
        if (product.Count + count == 0)
            dispatch(deleteProduct(user,product))
        else
            axios.post(`http://localhost:8080/api/bay/`, { Name: product.Name, UserId: user.Id, Count: count }).then((x) => {
                dispatch({ type: actions.EDIT_PRODUCT, data: x.data })
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "the " + product.Name + " has been successfully updated to your shopping cart"
                });
            }).catch((err) => { console.error(err) })
    }
}