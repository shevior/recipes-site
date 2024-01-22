import React, { useEffect } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormField, Input } from "semantic-ui-react";
import { addRecipe, editRecipe } from '../server/recipe';
import { getCategories } from '../server/category';

const difficulties = [{ id: 1, value: "easy" }, { id: 2, value: "medium" }, { id: 3, value: "hard" }];

const schema = yup.object({
    Name: yup.string().required('This field is required'),
    Img: yup.string().url(),
    Description: yup.string(),
    Duration: yup.number().integer('Duration must be an integer').positive('Duration must be positive').required('This field is required'),
    Difficulty: yup.string().oneOf(difficulties.map((d) => d.value)),
    Category: yup.string().required('This field is required'),
    Ingredient: yup.array().of(
        yup.object().shape({
            Count: yup.string().matches(/^[\d]+[\./\\]?[\d]*$/).required('This field is required'),
            Type: yup.string().required('This field is required'),
            Name: yup.string().required('This field is required'),
        }).required(),
    ),
    Instructions: yup.array().of(yup.string().required()).min(1, 'At least one instruction is required'),
});

const FormToAddOrEdit = () => {
    const selectedRecipe = useSelector(state => state.selectedRecipe);
    const user = useSelector(state => state.user);
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const { handleSubmit, register, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    useEffect(() => {
        if (!categories.length)
            dispatch(getCategories());
    }, []);

    const { fields, append } = useFieldArray({
        control,
        name: "Ingredient",
        defaultValue: selectedRecipe ? selectedRecipe.Ingredient : [{ count: "", kind: "", product: "" }]
    });
    const { fields: fieldsInstructions, append: appendInstructions } = useFieldArray({
        control,
        name: "Instructions"
    });

    const onSubmit = (data) => {
        if (selectedRecipe) {
            // If in edit mode, call editRecipe function
            dispatch(editRecipe(data, selectedRecipe));
        } else {
            // If in add mode, call addRecipe function
            dispatch(addRecipe(data));
        }
    };

    return <>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField required={true} error={errors.name?.message}>
                <label id='text'>recipe name</label>
                <input {...register("Name")} defaultValue={selectedRecipe ? selectedRecipe.Name : ''} />
                <p className="error">{errors.Name?.message}</p>
            </FormField>

            <FormField required={true} error={errors.Description?.message}>
                <label id='text'>tell us about your recipe</label>
                <input {...register("Description")} defaultValue={selectedRecipe ? selectedRecipe.Description : ''} />
                <p className="error">{errors.Description?.message}</p>
            </FormField>

            <FormField required={true} error={errors.level?.message} id='text'>
                <label id='text'>difficulty level</label>
                <input {...register('Difficulty')} type='radio' name='Difficulty' value='1' defaultChecked={selectedRecipe && selectedRecipe.Difficulty == 1 ? true : false} /> easy
                <input {...register('Difficulty')} type='radio' name='Difficulty' value='2' defaultChecked={selectedRecipe && selectedRecipe.Difficulty == 2 ? true : false} /> medium
                <input {...register('Difficulty')} type='radio' name='Difficulty' value='3' defaultChecked={selectedRecipe && selectedRecipe.Difficulty == 3 ? true : false} /> hard
                <p className="error">{errors.level?.message}</p>
            </FormField>

            <FormField required={true} error={errors.Duration?.message}>
                <label id='text'>duration of preparation</label>
                <input {...register("Duration")} defaultValue={selectedRecipe ? selectedRecipe.Duration : ''} />
                <p className="error">{errors.Duration?.message}</p>
            </FormField>

            <FormField required={true} error={errors.Img?.message}>
                <label id='text'>url for image</label>
                <input {...register("Img")} defaultValue={selectedRecipe ? selectedRecipe.Img : ''} />
                <p className="error">{errors.Img?.message}</p>
            </FormField>

            <FormField required={true} width={8} inline error={errors.categories?.message}>
                <label id='text'>category</label>
                <select {...register('Category')} >
                    {categories?.map((x, i) =>
                        <option key={i} value={x.Id} selected={selectedRecipe && x.Id == selectedRecipe.CategoryId}>{x.Name} </option>)}
                </select>
                <p className="error">{errors.categories?.message}</p>
            </FormField>

            <div>
                <label>ingredients</label>
                {fields.map((field, index) => (
                    <div>
                        <input placeholder="count" {...register(`Ingredient.${index}.Count`)} />
                        <p>{errors.Ingreident?.[index]?.count?.message}</p>
                        <input placeholder="type" {...register(`Ingredient.${index}.Type`)} />
                        <p>{errors.Ingredient?.[index]?.kind?.message}</p>
                        <input placeholder="product name" {...register(`Ingredient.${index}.Name`)} />
                        <p>{errors.Ingredient?.[index]?.Name?.message}</p>
                    </div>
                ))}
                <Button onClick={() => append({})}>+</Button>
            </div>

            <div>
                {fieldsInstructions.map((field, index) => (
                    <>
                        <input placeholder="instruction" {...register(`Instructions.${index}.instruction`)} />
                        <p>{errors.Instructions?.[index]?.instruction?.message}</p>
                    </>
                ))}
                <Button onClick={() => appendInstructions({})}>+</Button>
            </div>
            <input type="submit" />
        </Form>
    </>;
};
export default FormToAddOrEdit;