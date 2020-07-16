import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import clickEvents from './helpers/clickEvents';
import reservations from './components/reservations/reservations';
import navbar from './components/navbar/navbar';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  clickEvents.clickEvents();
  reservations.reservationsPage();
  navbar.buildNavbar();
};

init();
