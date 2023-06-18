import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import Header from './Header';
import dotAnimation from '../images/simple_loading.gif';

function Register({ setSend }) {
  const { register, formState: { errors, isValid }, setError } = useForm({ criteriaMode: 'all', mode: 'onChange' });
  const form = useRef();
  const [sending, setSending] = useState(false);
  const formSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await setSend(form.current.elements);
    setSending(false);
  }

  const validateEmail = (value) => {
    if (value && !isEmail(value)) {
      setError('email', {
        type: 'manual',
        message: 'Digite um endereço de e-mail válido',
      });
    }
  };

  return (
    <>
      <Header linkText='Faça o Login' linkRoute='/signin' place='register' />
      <section className='source'>
        <h1 className='title source__title'>Inscrever-se</h1>
        <form className='form source__form' onSubmit={formSubmit} ref={form}>
          <input
            className={!errors.mail?.message ? 'source__input source__text' : 'source__input source__text form__input_error'}
            type='email'
            placeholder='E-mail'
            id='mail'
            autoComplete='email'
            required
            {...register('email', {
              required: 'Preencha esse campo',
              validate: () => validateEmail,
            })
            }
          />
          <input
            className='source__input source__text'
            type='password'
            placeholder='Senha'
            id='password'
            autoComplete='current-password'
            required
            {...register('password', {
              required: 'Preencha esse campo',
              minLength: {
                value: 8,
                message: `Sua senha deve ter no mínimo 8 digitos`,
              },
              maxLength: {
                value: 40,
                message: 'Esse campo deve ter no máximo 40 digitos',
              },
            })
            }
          />
          <label htmlFor='password' className='form__description source__description_error'>
            {!isValid && errors.password?.message}
          </label>
          <button className={!isValid ? 'button source__button source__button__text' : 'button source__button source__button__text modal__button_disabled'} disabled={!isValid}>
            <span id='source__button_text' className={`button__text source__button_text ${!isValid ? '' : 'button__text_disabled'}`}>
              {sending ? (
                <>Salvando <img className='form__animation' alt='loading' src={dotAnimation} /></>
              ) : (
                'Registre-se'
              )}
            </span>
          </button>
          <Link className='subtitle source__link' to='/signin'>Já é um membro? Então faça login aqui!</Link>
        </form>
      </section>
    </>
  );
}

export default Register;