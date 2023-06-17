import React, { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from './Header';
import dotAnimation from '../images/simple_loading.gif';

function Login({ setSend, loggedIn }) {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const formSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await setSend(form.current.elements);
    setSending(false);
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
              <button className='button source__button source__button__text' onClick={formSubmit}>
                <span id='form__button_text' className='button__text'>
                  {sending ? (
                    <>Entrando <img className='form__animation' alt='loading' src={dotAnimation} /></>
                  ) : (
                    'Entrar'
                  )}
                </span>
              </button>
              <Link className='subtitle source__link' to='/signup'>Ainda não é membro? Inscreva-se aqui!</Link>
            </form>
          </section >) : <Navigate to='/' />
      }
    </>
  );
}

export default Login;