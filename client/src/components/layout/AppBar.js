import React from 'react';
import { Link } from 'react-router-dom';
import { icSearch2x, logoMl2x } from '../../assets/icon';
import './AppBar.scss';

const AppBar = () => {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <form className="search-container" action="/items" method="get">
          <Link to="/">
            <img
              src={logoMl2x}
              alt="Logo Mercado Libre"
              className="header-logo"
            />
          </Link>

          <input
            name="search"
            placeholder="Nunca dejes de buscar"
            className="search-input"
          />

          <button className="search-button">
            <img src={icSearch2x} alt="Buscar" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default AppBar;
