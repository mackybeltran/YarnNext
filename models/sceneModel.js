//belongs to yarns
//belongs to users

import firebase from 'firebase/app';
import 'firebase/firestore';

export const createNewScene = (backgroundImg, childOf, index, userId, yarnId) => {
    return firebase.firestore().collection('scenes').add({
        backgroundImg: backgroundImg,
        childOf: childOf,
        index: index,
        userId: userId,
        yarnId, yarnId
    })
}

export const readAllScenes = (yarnId) => {
    return firebase.firestore().collection('scenes').where('yarnId', '==', yarnId).get()
}