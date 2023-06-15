import React, { useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeletePostModal from './DeletePostModal';
import ImagePopup from './ImagePopup';
import useApp from '../hooks/UseApp';
import Footer from './Footer';

function Home({ logout, editingProfile, addingCard, changingAvatar, deletingCard, liking, disliking, setCurrentUser, cards, setCards }) {
  // Current User
  const currentUser = useContext(CurrentUserContext);
  const { currentCard, setCurrentCard, editIsOpen, setEditIsOpen, addIsOpen, setAddIsOpen, avatarModalIsOpen, setAvatarModalIsOpen, deleteIsOpen, setDeleteIsOpen, imageModalIsOpen, setImageModalIsOpen } = useApp();
  const handleCurrentUser = (user) => setCurrentUser(user);
  const handleSetCards = (cards) => setCards(cards);

  // Edit Profile Modal Functions
  const handleEditProfileClick = () => setEditIsOpen(!editIsOpen);

  // Add Post Modal Functions
  const handleAddPlaceClick = () => setAddIsOpen(!addIsOpen);

  // Change Avatar Modal Functions
  const handleEditAvatarClick = () => setAvatarModalIsOpen(!avatarModalIsOpen);

  // Delete Post Modal
  const handleDeleteCardClick = () => setDeleteIsOpen(!deleteIsOpen);
  const handleDeleteCard = (card) => setCurrentCard(card);

  // Image Modal
  const [selectedCard, setSelectedCard] = useState({ text: '', link: '' });

  const handleCardClick = (cardImage, cardText) => {
    setImageModalIsOpen(!imageModalIsOpen);
    setSelectedCard({ link: cardImage.current.src, text: cardText.current.textContent });
  }

  return (
    <>
      <Header
        linkText='Sair'
        logout={logout}
        place='home'
        currentUser={currentUser}
        linkRoute={'/signin'}
      />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        handleCardClick={handleCardClick}
        handleDeleteCardClick={handleDeleteCardClick}
        cards={cards}
        handleDeleteCard={handleDeleteCard}
        liking={liking}
        disliking={disliking}
      />
      <EditProfilePopup
        className={`${editIsOpen ? 'popup popup-image' : 'popup popup_closed popup-image'}`}
        editIsOpen={editIsOpen}
        setEditIsOpen={setEditIsOpen}
        handleCurrentUser={handleCurrentUser}
        editingProfile={editingProfile}
      />
      <AddPlacePopup
        className={`${addIsOpen ? 'popup popup-image' : 'popup popup_closed popup-image'}`}
        addIsOpen={addIsOpen}
        setAddIsOpen={setAddIsOpen}
        handleAddPlaceClick={handleAddPlaceClick}
        handleSetCards={handleSetCards}
        addingCard={addingCard}
      />
      <EditAvatarPopup
        className={`${avatarModalIsOpen ? 'popup popup-image' : 'popup popup_closed popup-image'}`}
        avatarModalIsOpen={avatarModalIsOpen}
        onEditAvatarClick={setAvatarModalIsOpen}
        handleEditAvatarClick={handleEditAvatarClick}
        changingAvatar={changingAvatar}
      />
      <ImagePopup
        className={`${imageModalIsOpen ? 'popup popup-image' : 'popup popup_closed popup-image'}`}
        imageModalIsOpen={imageModalIsOpen}
        setImageModalIsOpen={setImageModalIsOpen}
        handleCardClick={handleCardClick}
        selectedCard={selectedCard}
      />
      <DeletePostModal
        className={`${deleteIsOpen ? 'popup popup-image popup_delete' : 'popup popup_closed popup-image popup_delete'}`}
        deleteIsOpen={deleteIsOpen}
        setDeleteIsOpen={setDeleteIsOpen}
        currentCard={currentCard}
        handleSetCards={handleSetCards}
        handleDeleteCardClick={handleDeleteCardClick}
        deletingCard={deletingCard}
      />
      <Footer />
    </>
  );
}

export default Home;