import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hamburguer, logo } from '../utils/constants';

function Header({ linkText, linkRoute, logout, place, email }) {
  const [renderOptionsOnTop, setRenderOptionOnTop] = useState(false);
  const [mediaQuery, setMediaQuery] = useState(window.matchMedia('(min-width: 20rem) and (max-width: 48rem)'));

  const renderOptions = () => {
    if (place === 'home') {
      return <Link className='tittle header__title' to={linkRoute} onClick={logout}>{linkText}</Link>;
    }
    if (place === 'register') {
      return <Link className='tittle header__title' to={linkRoute}>{linkText}</Link>;
    }
  }
  const userInfo = () => place === 'home' && <p className='subtitle header__title'>{email}</p>;

  const responsibleLayout = () => {
    if (mediaQuery.matches) {
      return <button className='button header__button' onClick={() => setRenderOptionOnTop(!renderOptionsOnTop)}><img alt='options' src={hamburguer} /></button>;
    } else {
      return (
        <div className='header__options'>
          {userInfo()}
          {renderOptions()}
        </div>
      );
    }
  }

  const optionsOnTop = () => {
    if (mediaQuery.matches) {
      return (
        <>
          {userInfo()}
          {renderOptions()}
        </>
      )
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setMediaQuery(window.matchMedia('(min-width: 20rem) and (max-width: 64rem)'));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {renderOptionsOnTop && optionsOnTop()}
      <header className='header' >
        <div className='header__container'>
          <img className='logo' alt='Logo Around The U.S.' src={logo} />
          <div className='header__contents'>
            {responsibleLayout()}
          </div>
        </div>
        <div className='line ' />
      </header>
    </>
  );
}

export default Header;