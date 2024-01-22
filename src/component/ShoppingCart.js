import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Icon, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, Button } from "semantic-ui-react";
import { addProduct, deleteProduct, editProduct, getCart } from '../server/cart';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state?.shoppingCart);
    const user = useSelector(state => state?.user);

    useEffect(() => {
        if (!cart.length)
            dispatch(getCart(user));
    }, [cart]);

    const deleteProductFromCart = (product) => {
        dispatch(deleteProduct(user, product));
    }

    return (<>
        <Table celled columns={3} textAlign="center" style={{ width: '60vw' }}>
            < TableHeader>
                <TableHeaderCell>name</TableHeaderCell>
                <TableHeaderCell>count</TableHeaderCell>
                <TableHeaderCell>   </TableHeaderCell>
            </TableHeader>
            <TableBody>
                {cart.map((p) =>
                    <TableRow key={p.Id}>
                        <TableCell>{p.Name}</TableCell>
                        <TableCell><Button basic color='green' onClick={() => { dispatch(editProduct(user, p, -1)) }}>-</Button>   {p.Count}  <Button basic color='green' onClick={() => { dispatch(editProduct(user, p, 1))}} >+</Button></TableCell>
                        <TableCell>
                            <Icon name="trash alternate" onClick={() => {
                                deleteProductFromCart(p);
                            }}>
                            </Icon>
                        </TableCell>
                    </TableRow>)}
            </TableBody>
        </Table>
        {/* <label>name</label>
        <input></input>
        <label>count</label>
        <input></input>
        <Button onClick={() => { dispatch(addProduct(user)) }}>add product</Button> */}
    </>);
}

export default ShoppingCart;