import { config } from '../.env/config.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


export const loadFirebase = () => {
  
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    return firebase
}

export const signOut = () => {
    firebase.auth().signOut();
    return firebase
}

export const signIn = (email, pass, callback) => {    
    return firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(response => {
        callback
    }).catch((error) =>  {
            console.log(error);
    });
}

export const register = (email, pass, callback) => {
    return firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(response => {
        callback
    }).catch((error) =>  {
        console.log(error);
    });
}
     
export const getUser = () => {
   console.log(firebase.auth().currentUser)    
}