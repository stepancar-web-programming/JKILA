/* eslint-disable */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import '../style/index.css';
import '../style/App.css';
import '../style/Elements.css';
import '../style/margins.css';

import jkilaLogo from '../pictures/JKILA.png';
import {
  BOARD, LOGIN_ROUTE, WORKSPACES,
} from '../utils/consts';

// import { authRoutes } from '../routes';

// TODO
// Buttons instead of links or not?
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.setItem('token', null);
  }
  console.log(user.isAuth);
  return (
    <div className="App">
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">

        <p className="h5 my-0 me-md-3 fw-normal">
         <NavLink to={WORKSPACES} className="h1 text-dark text-decoration-none"> JKILA </NavLink>
        </p>
        <img src={jkilaLogo} className="App-logo2 my-0 me-md-auto fw-normal" alt="" />
        <p className="h4 text-dark text-decoration-none me-md-4">{user.user.username}</p>

        {user.isAuth
          ? (
            <nav className="my-2 my-md-0 me-md-3">
              <NavLink to={LOGIN_ROUTE} className="btn btn-outline-primary ml-5" onClick={() => logOut()}> Sign Out </NavLink>
            </nav>
          )
          : <NavLink to={LOGIN_ROUTE} className="btn btn-outline-primary ml-5"> Sign In </NavLink>}
      </div>
    </div>
  );
}
);

export default NavBar;
