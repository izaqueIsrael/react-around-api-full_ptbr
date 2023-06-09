import React, { useState, useContext } from 'react';
import trashIcon from '../images/trash.svg'
import useCard from '../hooks/UseCard';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, handleCardClick, handleDeleteCardClick, handleDeleteCard, liking, disliking }) {
  const { _id, link, likes, name, owner } = card;
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(likes.some(i => i._id === currentUser._id));
  const { cardImage, cardText, deleteButton, likeButton } = useCard();

  const handleDelete = () => {
    handleDeleteCardClick();
    handleDeleteCard(_id);
  }
  const handleClick = () => handleCardClick(cardImage, cardText);
  const checkOwner = () => (owner._id !== currentUser._id && deleteButton.current) && deleteButton.current.remove();
  const handleCardLike = () => isLiked ? isDisliking() : isLiking();

  const isLiking = async () => {
    setIsLiked(true);
    await liking(_id);
  };

  const isDisliking = async () => {
    setIsLiked(false);
    await disliking(_id);
  };

  return (
    <div className='post'>
      {checkOwner()}
      <img className='post__image' alt={name} src={link} ref={cardImage} onClick={handleClick} />
      <button ref={deleteButton} className='button post__delete'><img className='post__delete__image' alt='delete post' src={trashIcon} onClick={handleDelete} /></button>
      <div className='post__container'>
        <h2 className='title post__title' ref={cardText}>{name}</h2>
        <div className='info'>
          <button className={isLiked ? 'button post__button button__image post__button_active' : 'button post__button button__image'} ref={likeButton} onClick={handleCardLike}></button>
          <p className='like'>{likes.length}</p>
        </div>
      </div>
    </div >
  );
}

export default Card;
