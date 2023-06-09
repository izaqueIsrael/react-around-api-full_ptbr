import React, { useRef, useState } from 'react';
import closeButton from '../images/close.png';
import dotAnimation from '../images/simple_loading.gif';

function PopupWithForm({ errors, formType, className, children, title, buttonText, popupIsOpen, handleModalOnKeyDown, handleCloseModal, setterInApi, currentCard, reset }) {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const formSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    formType === 'delete' ? await setterInApi(currentCard) : await setterInApi(form.current.elements).then(() => reset && reset());
    handleCloseModal();
    setSending(false);
  }

  return (
    <>
      <div className={className} id='add__modal' tabIndex={0} onKeyDown={handleModalOnKeyDown}>
        <button className='button popup__close' id='add__close' onClick={handleCloseModal} >
          <img className='popup__icon' alt='close' src={closeButton} />
        </button>
        <form className='form modal' ref={form} onSubmit={formSubmit} >
          <h2 className='title modal__title'>{title}</h2>
          {children}
          <button id='form__button' type='submit' className={!errors ? 'button modal__button' : 'button modal__button modal__button_disabled'} disabled={errors}>
            <span id='form__button_text' className={`button__text ${!errors ? '' : 'button__text_disabled'}`}>
              {sending ? (
                <>Salvando <img className='form__animation' alt='loading' src={dotAnimation} /></>
              ) : (
                buttonText
              )}
            </span>
          </button>
        </form>
      </div>
      <div className={`${popupIsOpen ? 'fade' : 'fade fade_closed'}`} onClick={handleCloseModal} />
    </>
  );
}

export default PopupWithForm;