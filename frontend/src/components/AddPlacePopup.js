import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';
import validator from 'validator';

function AddPlacePopup({ className, addIsOpen, setAddIsOpen, handleAddPlaceClick, handleSetCards, addingCard }) {
  const handleCloseModal = () => handleAddPlaceClick();
  const handleModalOnKeyDown = e => e.key === 'Escape' && setAddIsOpen(false);
  const { register, formState: { errors, isValid }, watch } = useForm({ criteriaMode: 'all', mode: 'onChange' });
  const titleValue = watch('title');

  const urlValidate = (url) => {
    return validator.isURL(url) || 'Insira um endereço web válido';
  }

  return (
    <PopupWithForm
      formType='add'
      className={className}
      children={
        <>
          <div>
            <input
              name='formTitle'
              id='title'
              className={!errors.title?.message ? 'form__input form__name' : 'form__input form__name form__input_error'}
              minLength={2}
              maxLength={30}
              type='text'
              placeholder='Ti&#769;tulo'
              required
              {...register('title', {
                required: 'Preencha esse campo',
                minLength: {
                  value: 2,
                  message: 'Esse campo deve ter de 2 a 30 caracteres. Esse campo possui 1 dígito',
                },
                maxLength: {
                  value: 30,
                  message: `Esse campo deve ter de 2 a 30 caracteres. Esse campo possui ${titleValue && titleValue.length} dígitos`,
                },
              })}
            />
            <label htmlFor='title' className='form__description form__description_error'>
              {errors.title?.message && errors.title?.message}
            </label>
          </div>
          <div>
            <input
              name='formLink'
              id='link'
              className={!errors.link?.message ? 'form__input form__name' : 'form__input form__name form__input_error'}
              type='url'
              placeholder='Link de imagem'
              required
              {...register('link', {
                required: 'Por favor, insira um endereço web',
                validate: (inputValue) => urlValidate(inputValue),
              })}
            />
            <label htmlFor='link' className='form__description form__description_error'>
              {errors.link?.message && errors.link?.message}
            </label>
          </div>
        </>
      }
      title={'Novo local'}
      buttonText={'Criar'}
      popupIsOpen={addIsOpen}
      handleModalOnKeyDown={handleModalOnKeyDown}
      handleCloseModal={handleCloseModal}
      handleSetCards={handleSetCards}
      setterInApi={addingCard}
      errors={!isValid}
    />
  );
}

export default AddPlacePopup;