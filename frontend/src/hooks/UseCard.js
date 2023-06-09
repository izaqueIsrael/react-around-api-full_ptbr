import { useRef } from 'react';

function useCard() {
  const cardImage = useRef();
  const cardText = useRef();
  const deleteButton = useRef();
  const likeButton = useRef();
  return { cardImage, cardText, deleteButton, likeButton }
}

export default useCard;