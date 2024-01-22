import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, Icon, Image } from "semantic-ui-react";
import { addProduct } from "../server/cart";
import { deleteRecipe } from "../server/recipe";
import * as actions from '../store/action';

const difficulties = [{ key: 1, value: "easy" }, { key: 2, value: "medium" }, { key: 3, value: "hard" }];

const Recipe = ({ recipe }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const addToCart = (productName) => {
        if (productName == 'ביצה')
            productName = 'ביצים';
        dispatch(addProduct(user, productName, 1));
    }
    return (
        <Card key={recipe.Id} class="recipe">
            <CardContent>
                <CardHeader>
                    {recipe?.Name}
                </CardHeader>
                <Image src={recipe?.Img} bordered />
                <CardDescription>
                    {recipe?.Description}
                </CardDescription>
                <Icon name='clock outline'></Icon>Duration: {(recipe?.Duration) >= 60 ? <>{(recipe.Duration) / 60} hour</> : <>{recipe?.Duration} minutes</>}

                <div>
                    {difficulties?.map((d) => (
                        (d.key == recipe?.Difficulty) ? <>
                            <Icon name='signal'></Icon> Difficulty: {d.value}
                        </> : null
                    ))}
                </div>

                <div>
                    {recipe?.Ingredient?.map((p, i) => <div key={i}>
                        <Icon circular name='plus cart' onClick={() => { addToCart(p.Name); }}></Icon> {p.Count} {p.Type} {p.Name}
                    </div>)}
                </div>

                <div>
                    {recipe?.Instructions?.map((item, i) => <div key={i}>
                        <div> {item} </div>
                    </div>)}
                </div>
                
            </CardContent>
            {
                (user && recipe.UserId === user.Id) ? <CardContent extra>
                    <Icon name='edit outline' size='large' circular onClick={() => { dispatch({ type: actions.SET_SELECTED_RECIPE, data: recipe }); navigate("/recipeform"); }} />
                    <Icon name='trash alternate outline' size='large' circular onClick={() => { dispatch(deleteRecipe(user, recipe)); }} />
                </CardContent> : null
            }

        </Card >);
}

export default Recipe;