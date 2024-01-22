import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import { Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import HomePage from './component/HomePage';
import MyRecipes from './recipe/MyRecipes';
import ShoppingCart from './component/ShoppingCart';
import RecipesList from './recipe/RecipeList';
import RecipeForm from './recipe/FormToAddOrEdit';
import 'semantic-ui-css/semantic.min.css';
import Categories from './component/categories';

function App() {
  return (
    <div class="contaiter">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/homepage" element={<HomePage />}/>
        <Route path="/myrecipes" element={<MyRecipes/>}/>
        <Route path="/recipeform" element={<RecipeForm/>}/>
        <Route path="/recipes" element={<RecipesList/>}/>
        <Route path="/shoppingcart" element={<ShoppingCart/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Routes>
    </div>
  );
}

export default App;
