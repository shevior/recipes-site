import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/action';
import { Menu, MenuItem } from 'semantic-ui-react';
// import Language from './Language';


const Header = () => {
  const user = useSelector(initialState => initialState.user);
  const dispatch = useDispatch();
  return (
    <div class="header">
      <h1>recipes site</h1>
      <Menu>
        {(user == null) ? <>
          <MenuItem>
            <Link to="/login">log in</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/signup">sign up</Link>
          </MenuItem>
        </> : <>
          <MenuItem>
            <Link to="/homepage">home page</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/myrecipes">my recipes</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/recipes">recipes</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/shoppingcart">shopping cart</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/categories">categories</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/" onClick={() => dispatch({ type: actions.SET_USER, data: null })}>log out</Link>
          </MenuItem>
          {/* <MenuItem><Language/></MenuItem> */}
        </>}
      </Menu>
    </div>
  );
};

export default Header;
