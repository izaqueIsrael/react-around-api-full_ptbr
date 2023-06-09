import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePostModal({ className, deleteIsOpen, setDeleteIsOpen, currentCard, handleSetCards, handleDeleteCardClick, deletingCard }) {
  const handleCloseModal = () => handleDeleteCardClick();
  const handleModalOnKeyDown = e => e.key === 'Escape' && setDeleteIsOpen(false);

  return (
    <PopupWithForm
      formType={'delete'}
      className={className}
      children={null}
      title={'Tem certeza?'}
      buttonText={'Sim'}
      popupIsOpen={deleteIsOpen}
      handleCloseModal={handleCloseModal}
      handleModalOnKeyDown={handleModalOnKeyDown}
      currentCard={currentCard}
      handleSetCards={handleSetCards}
      setterInApi={deletingCard}
    />
  );
}

export default DeletePostModal;