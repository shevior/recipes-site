import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import React from 'react'
import { ModalContent, ModalActions, Button, Header, Modal, Input } from 'semantic-ui-react'
import { getCategories, addCategory } from '../server/category';

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    useEffect(() => {
        if (!categories.length)
            dispatch(getCategories());
    }, []);

    const [newCategory, setNewCategory] = useState("");
    const [open, setOpen] = React.useState(false);

    const add = (c) => {
        dispatch(addCategory(c));
    }

    return <>
        <Modal
            closeIcon
            open={open}
            trigger={<Button>add category</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header content='add new category' />
            <ModalContent>
                <p>
                    Enter category`s name
                </p>
                <Input onChange={(e) => { setNewCategory(e.target.value) }}></Input>
            </ModalContent>
            <ModalActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                    setOpen(false)
                    add(newCategory)
                }} positive>
                    Ok
                </Button>
            </ModalActions>
        </Modal>
        <div>
            {categories?.map((c) => (
                <div>{c.Name}</div>
            ))}
        </div>
    </>
}
export default Categories;