import React from 'react';
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../Buscador/Buscador";
import "../Buscador/Buscador.css";

import './Navbar.css';

const storeLocation = {
  new: {
    pathname: "/createPokemon",
    state: { extraData: "newpokemon" },
  },
  home: {
    pathname: "/home",
    state: { extraData: "home" },
  }
  
};

export default function NavBar({ onSearch, active = '' }) {
  let location = useLocation();
    return (
    <ul>      
      <li ><Link to='/'>Start</Link></li>
      {(location.pathname.includes('home')) ? <li className={(active === 'newpokemon') ? "active" : null}><Link to={storeLocation.new}>New Pokemon</Link></li> : null}
      {(!location.pathname.includes('home')) ? <li className={(active === 'home') ? "active" : null}><Link to={storeLocation.home}>Home</Link></li> : null}
      {(location.pathname.includes('home')) ?
        <li style={{ float: 'right' }}>
          <SearchBar
              onSearch={onSearch}
              location={active}
          />
        </li>
      : null}
    </ul>
  );
}