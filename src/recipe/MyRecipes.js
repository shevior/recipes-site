import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { Button } from 'semantic-ui-react';
import Recipe from './Recipe';
import * as actions from '../store/action';

const MyRecipes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user);
    const recipes = useSelector(state => state?.recipes);

    return (<>
        <Button onClick={() => {
            dispatch({ type: actions.SET_SELECTED_RECIPE, data: null })
            navigate("/recipeform");//פופאפ instead
        }
        }>Add new recipe</Button>

        <div>
            {recipes?.map((r) => (
                 
                (user && r.UserId == user.Id) ?
                    <>
                        <Recipe recipe={r} />
                    </> : null
            ))}
        </div>
    </>);
}

export default MyRecipes;