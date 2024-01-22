import * as actions from './action'
import { getCart } from '../server/cart';

const initialState = {
    language: 'English',
    user: null,
    recipes: [],
    categories: [],
    selectedRecipe: null,
    shoppingCart: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_LANG:
            return { ...state, language: action.data }
        case actions.SET_RECIPES:
            return { ...state, recipes: action.data }
        case actions.ADD_RECIPE: {
            const recipes = initialState.recipes;
            recipes.push(action.data);
            return { ...state, recipes }
        }
        case actions.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id === action.recipe.Id);
            recipes[findIndex] = action.recipe;
            return { ...state, recipes }
        }
        case actions.DELETE_RECIPE: {
            const recipes = state.recipes.filter(x => x.id !== action.id);
            return { ...state, recipes }
        }
        case actions.SET_SELECTED_RECIPE:
            return { ...state, selectedRecipe: action.data }
        case actions.SET_USER: {
            return { ...state, user: action.data }
        }
        case actions.SET_CATEGORIES:
            return { ...state, categories: action.data }
        case action.ADD_CATEGORY:
            return { ...state, category: action.data }
        case actions.SET_PRODUCTS:
            return { ...state, shoppingCart: action.data }
        case actions.ADD_PRODUCT:
            {
                const shoppingCart = state.shoppingCart;
                let i = shoppingCart.findIndex(p => p.Name == action.data.Name)
                if (i >= 0)
                    shoppingCart[i].Count += 1;
                else shoppingCart.push(action.data)
                return { ...state, shoppingCart }
            }
        case actions.EDIT_PRODUCT: {
            const shoppingCart = [...state.shoppingCart];
            const i = shoppingCart.findIndex(x => x.Id == action.data.Id);
            if (i >= 0)
                shoppingCart[i] = action.data;
            else shoppingCart.push(action.data)
            return { ...state, shoppingCart }
        }
        case actions.DELETE_PRODUCT: {
            const shoppingCart = [...initialState.shoppingCart]
            const findIndex = shoppingCart.findIndex(x => x.Name === action.data?.Name);
            shoppingCart.splice(findIndex, 1);
            return { ...state, shoppingCart }
        }
        default: return { ...state }
    }
}

export default reducer;