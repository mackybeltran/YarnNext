import { config } from '../.env/config.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export function loadFirebase(){
  
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      }
    return firebase
  }