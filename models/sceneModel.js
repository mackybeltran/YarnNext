//belongs to yarns
//belongs to users

import firebase from 'firebase/app';
import 'firebase/firestore';

export const createNewScene = (backgroundImg, children, index, userId, yarnId, title) => {
    return firebase.firestore().collection('scenes').add({
        backgroundImg: backgroundImg,
        children: children,
        index: index,
        userId: userId,
        yarnId, yarnId,
        title, title
    })
}

export const readAllScenes = (yarnId) => {
    
    return firebase.firestore().collection('scenes').where('yarnId', '==', `${yarnId}`).get()
    .then(snapshot => {
        return snapshot.docs
        }
    ) 
}
