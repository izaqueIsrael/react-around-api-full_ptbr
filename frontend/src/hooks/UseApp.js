import { useState } from 'react';

function useApp() {
  const [update, setUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [currentCard, setCurrentCard] = useState();
  const [cards, setCards] = useState([]);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [avatarModalIsOpen, setAvatarModalIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [requisitionStatus, setRequisitionStatus] = useState(false);
  const [statsModal, setStatsIcon] = useState(false);
  const sucessText = 'Vitória, sua requisição foi um sucesso';
  const failText = 'Ops, algo saiu deu errado! Por favor, tente novamente.';

  return {
    update,
    setUpdate,
    currentUser,
    setCurrentUser,
    cards,
    setCards,
    currentCard,
    setCurrentCard,
    editIsOpen,
    setEditIsOpen,
    addIsOpen,
    setAddIsOpen,
    avatarModalIsOpen,
    setAvatarModalIsOpen,
    deleteIsOpen,
    setDeleteIsOpen,
    imageModalIsOpen,
    setImageModalIsOpen,
    requisitionStatus,
    setRequisitionStatus,
    statsModal,
    setStatsIcon,
    sucessText,
    failText,
  }
}

export default useApp;