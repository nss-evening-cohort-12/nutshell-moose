import firebase from 'firebase/app';
import 'firebase/auth';

const logoutButton = $('#logout-button');
const loginButton = $('#login-button');
const authOnly = $('.auth-only');

// call this to appropriately hide or display everything with '.auth-only' class:
const secureButtons = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authOnly.removeClass('hide');
    } else {
      authOnly.removeClass('hide');
      authOnly.addClass('hide');
    }
  });
};

// call this to check if user is authorized before running secure actions (returns boolean)
const checkAuth = () => {
  firebase.auth().onAuthStateChanged((user) => (!!user));
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logoutButton.removeClass('hide');
      loginButton.addClass('hide');
    } else {
      logoutButton.addClass('hide');
      loginButton.removeClass('hide');
    }
  });
};

export default { checkLoginStatus, secureButtons, checkAuth };
