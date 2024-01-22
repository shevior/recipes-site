import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import Recipe from "./Recipe";
import { getRecipes } from "../server/recipe";
import { getCategories } from "../server/category";

const RecipeList = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState();
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [level, setLevel] = useState();
    const [time, setTime] = useState();
    const difficulties = [{ id: 1, value: "easy" }, { id: 2, value: "medium" }, { id: 3, value: "hard" }];
    const durations = [{ id: 10, value: "10 minutes" }, { id: 15, value: "15 minutes" }, { id: 30, value: "half hour" }, { id: 60, value: "hour" }, { id: 200, value: "2 hours+" }];

    const recipes = useState(state => state.recipes);
    const categories = useState(state => state.categories);
    useEffect(() => {
        if (!categories.length)
            dispatch(getCategories());
    }, [])

    useEffect(() => {
        if (!recipes.length)
            dispatch(getRecipes());
    }, [])

    useEffect(() => {
        setFilteredRecipes(recipes.filter(r => (!category || r.CategoryId == category) && (!time || r.Duration <= time) && (!level || r.Difficulty == level)))
    }, [category, time, level])

    return <>
        <select name="selectCategory" defaultValue="selectCategory" onChange={(e) => setCategory(e.target.value)}>
            <option value="" >select category</option>
            {categories?.map((c) => (
                <option key={c.Id} value={c.Id}>
                    {c.Name}
                </option>
            ))}
        </select>
        <select name="selectDuration" onChange={(e) => setTime(e.target.value)}>
            <option value="" >select duration</option>
            {durations?.map((d) => (
                <option key={d.id} value={d.id}>
                    {d.value}
                </option>
            ))}
        </select>
        <select name="select difficulty" onChange={(e) => setLevel(e.target.value)}>
            <option value="" >select difficulty</option>
            {difficulties?.map((d) => (
                <option key={d.id} value={d.id}>
                    {d.value}
                </option>
            ))}
        </select>

        {filteredRecipes?.map((recipe) => (
            <Recipe recipe={recipe} />
        ))}
    </>

}
export default RecipeList

