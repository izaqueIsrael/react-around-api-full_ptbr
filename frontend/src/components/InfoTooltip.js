import React from 'react';
import closeButton from '../images/close.png';

function InfoTooltip({ className, popupIsOpen, handleClose, modalIcon, modalText }) {
  const handleCloseModal = () => handleClose();
  const handleModalOnKeyDown = e => e.key === 'Escape' && handleClose(false);
  return (
    <>
      <div className={className} tabIndex={0} onKeyDown={handleModalOnKeyDown}>
        <button className="button popup__close" id="add__close" onClick={handleCloseModal}><img className="popup__icon" alt="close" src={closeButton} /></button>
        <form className="form modal" id="form__add" name="formAdd">
          <img className='modal__status' alt='Status' src={modalIcon} />
          <p className='subtitle modal__text'>{modalText}</p>
        </form>
      </div>
      <div className={`${popupIsOpen ? 'fade' : 'fade fade_closed'}`} onClick={handleCloseModal} />
    </>
  );
}

export default InfoTooltip;
