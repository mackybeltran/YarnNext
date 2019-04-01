import firebase from 'firebase/app'
import 'firebase/firestore'
import { createNewScene } from '../models/sceneModel.js';


export const createFirstSceneAction = (userId, yarnId) => {
    return createNewScene('', null, 1, userId, yarnId)
}