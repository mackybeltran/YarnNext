import firebase from 'firebase/app';
import 'firebase/firestore';
import { addNewScene } from './sceneController.js';
import { createNewYarn, addCoverToYarn, readFromCollection, readAllCollection, readUserIdFromYarn } from '../models/yarnModel.js';
import { createFirstSceneAction } from '../controllers/sceneController.js';

export const createNewYarnAction = (file, title, user) => {
    return addCoverToYarn(file, title, user)
    .then(url => {
        return createNewYarn(file, url, title, user)
        
    }).then(result => {
        createFirstSceneAction(user, result.id)
    })
}

export const readUsersYarnsAction = (user) => {
    return readFromCollection('yarns', 'userId', user) 
}

export const readAllYarnsAction = () => {
    return readAllCollection('yarns')
}

export const compareUserIdFromYarnToAuthId = async (yarnId, userId) => {
    const response = await readUserIdFromYarn(yarnId)
     if (`${response}` === `${userId}`){
        return true
    } else {
        return false        
    }
}