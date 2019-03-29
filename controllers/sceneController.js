import firebase from 'firebase'
import  scene  from '../models/sceneModel.js'

export const addNewScene = (array) => {
    return firebase.firestore().collection('scenes').add(
        scene
    ).then(result => {
        array.forEach(arrayObject => {
            
            firebase.firestore().collection('scenes').doc(result.id).set(
                arrayObject, {merge: true}
            )
        })
    })
}

export const getAllScenes = (yarnId) => {
    return firebase.firestore().collection('scenes').where('yarnId', '==', yarnId).get()
}