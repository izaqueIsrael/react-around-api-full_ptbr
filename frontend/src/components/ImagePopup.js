import React, { useRef } from 'react';
import closeButton from '../images/close.png';

function ImagePopup({ className, imageModalIsOpen, setImageModalIsOpen, selectedCard }) {
  const handleCloseImageCard = () => setImageModalIsOpen(!imageModalIsOpen);
  const handleFadeClick = () => setImageModalIsOpen(!imageModalIsOpen);
  const handleModalOnKeyDown = e => e.key === 'Escape' ? setImageModalIsOpen(false) : null;
  const buttonRef = useRef();
  const imageRef = useRef();
  const adjustImageWidth = () => buttonRef.current.style.width = `${imageRef.current.clientWidth + 80}px`;

  return (
    <>
      <div className={className} id='image__modal' tabIndex={10} onKeyDown={handleModalOnKeyDown}>
        <div className='popup-image__close' id='image__modal_close' ref={buttonRef} >
          <button className='popup__button button popup__close' id='image__close' onClick={handleCloseImageCard}>
            <img className='popup__icon' alt='close' src={closeButton} />
          </button>
        </div>
        <div>
          <img
            className='popup__image'
            alt='Garithos Did Nothing Wrong'
            id='modal__image'
            src={selectedCard.link}
            ref={imageRef}
            onLoad={adjustImageWidth}
          />
          <h2 className='title popup__text' id='modal__description' >{selectedCard.text}</h2>
        </div>
      </div>
      <div className={`${imageModalIsOpen ? 'fade' : 'fade fade_closed'}`} onClick={handleFadeClick} />
    </>
  );
}

export default ImagePopup;