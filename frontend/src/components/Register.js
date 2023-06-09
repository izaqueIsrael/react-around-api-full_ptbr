import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register({ setSend }) {
  const form = useRef();
  const formSubmit = (e) => {
    e.preventDefault();
    setSend(form.current.elements);
  }
  return (
    <>
      <Header linkText='Faça o Login' linkRoute='/signin' place='register' />
      <section className='source'>
        <h1 className='title source__title'>Inscrever-se</h1>
        <form className='form source__form' ref={form}>
          <input className='source__input source__text' placeholder='E-mail' type='email' id='mail' autoComplete='email' required></input>
          <input className='source__input source__text' placeholder='Senha' type='password' id='password' autoComplete='current-password' required></input>
          <button className='button source__button source__button__text' onClick={formSubmit}>Inscrever-se</button>
          <Link className='subtitle source__link' to='/signin'>Já é um membro? Faça o login aqui!</Link>
        </form>
      </section>
    </>
  );
}

export default Register;