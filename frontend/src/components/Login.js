import React, { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from './Header';

function Login({ setSend, loggedIn }) {
  const form = useRef();
  const formSubmit = (e) => {
    e.preventDefault();
    setSend(form.current.elements);
  }

  return (
    <>
      <Header linkText='Faça o Login' linkRoute='/signin' place='register' />
      {
        !loggedIn ? (
          < section className='source'>
            <h1 className='title source__title'>Entrar</h1>
            <form className='form source__form' ref={form}>
              <input className='source__input source__text' type='email' placeholder='E-mail' id='mail' autoComplete='email' required></input>
              <input className='source__input source__text' type='password' placeholder='Senha' id='password' autoComplete='current-password' required></input>
              <button className='button source__button source__button__text' onClick={formSubmit}>Entrar</button>
              <Link className='subtitle source__link' to='/signup'>Ainda não é membro? Inscreva-se aqui!</Link>
            </form>
          </section >) : <Navigate to='/' />
      }
    </>
  );
}

export default Login;