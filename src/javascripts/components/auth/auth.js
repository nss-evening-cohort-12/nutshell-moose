import firebase from 'firebase/app';
import 'firebase/auth';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const logoutEvent = () => {
  firebase.auth().signOut();
  $('#console').empty();
};

export default { signMeIn, logoutEvent };
