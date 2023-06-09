import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { sucessIcon, failIcon } from '../utils/constants';
import useApp from '../hooks/UseApp';
import auth from '../utils/auth';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api'

function App() {
  const { update, setUpdate, currentUser, setCurrentUser, cards, setCards, requisitionStatus, setRequisitionStatus, statsModal, setStatsIcon, sucessText, failText } = useApp();

  // loggin
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser(null);
  }

  // api
  const setUser = async () => {
    await api.getUserInfo()
      .then(user => setCurrentUser(user))
      .catch(err => err);
  }

  const login = async (userData) => {
    await auth.userLogin({ newPassword: userData.password.value, newEmail: userData.mail.value })
      .then(() => {
        setUser();
        setStatsIcon(true);
        setLoggedIn(true);
      })
      .catch(() => {
        setRequisitionStatus(!requisitionStatus);
        setStatsIcon(false);
      })
  }

  const register = async (userData) => {
    await auth.registerUser({ newPassword: userData.password.value, newEmail: userData.mail.value })
      .then(() => {
        setStatsIcon(true);
        setRequisitionStatus(!requisitionStatus);
      })
      .catch(() => {
        setStatsIcon(false);
        setRequisitionStatus(!requisitionStatus);
      })
  }

  const editingProfile = async (newProfile) => {
    await api.setUserInfo({ newName: newProfile.name.value, newAbout: newProfile.about.value })
      .then(() => setUpdate(!update))
      .catch(() => {
        setRequisitionStatus(!requisitionStatus);
        setStatsIcon(false);
      });
  }

  const addingCard = async (newCard) => {
    await api.updateCard({ newName: newCard.title.value, newLink: newCard.link.value })
      .then(() => setUpdate(!update))
      .catch(() => {
        setRequisitionStatus(!requisitionStatus);
        setStatsIcon(false);
      });
  }

  const changingAvatar = async (newAvatar) => {
    await api.setUserAvatar(newAvatar.avatar.value)
      .then(() => setUpdate(!update))
      .catch(() => {
        setRequisitionStatus(!requisitionStatus);
        setStatsIcon(false);
      });
  }

  const deletingCard = async (card) => {
    await api.deleteCard(card)
      .then(() => setUpdate(!update))
      .catch(() => {
        setRequisitionStatus(!requisitionStatus);
        setStatsIcon(false);
      });
  }

  const liking = async (like) => {
    await api.addLike(like)
      .then(() => setUpdate(!update))
      .catch(() => {
        setRequisitionStatus(!requisitionStatus);
        setStatsIcon(false);
      });
  }

  const disliking = async (dislike) => {
    await api.removeLike(dislike)
      .then(() => setUpdate(!update))
      .catch(() => {
        setRequisitionStatus(!requisitionStatus);
        setStatsIcon(false);
      });
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <ProtectedRoute loggedIn={loggedIn}
          children={
            <Home
              logout={logout}
              editingProfile={editingProfile}
              addingCard={addingCard}
              changingAvatar={changingAvatar}
              deletingCard={deletingCard}
              liking={liking}
              disliking={disliking}
              setCurrentUser={setCurrentUser}
              cards={cards}
              setCards={setCards}
            />
          }
        />,
    },
    {
      path: '/signin',
      element: <Login setSend={login} loggedIn={loggedIn} />,
    },
    {
      path: 'signup',
      element: <Register setSend={register} />,
    },
  ]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getUserCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => err);
  }, [loggedIn, update, setCurrentUser, setCards]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.validateUserToken(token)
        .then(() => setLoggedIn(true))
        .catch(() => setLoggedIn(false));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
      <InfoTooltip
        className={`${requisitionStatus ? 'popup popup-image' : 'popup popup_closed popup-image'}`}
        popupIsOpen={requisitionStatus}
        handleClose={setRequisitionStatus}
        modalIcon={`${statsModal ? sucessIcon : failIcon}`}
        modalText={`${statsModal ? sucessText : failText}`}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;