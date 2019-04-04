import firebase from 'firebase/app'
import 'firebase/firestore'
import { createNewScene, readAllScenes } from '../models/sceneModel.js';
import { getFirstSceneHelper, readAllSceneDataHelper, assignOrgChartHelper } from './sceneHelper.js'


export const createFirstSceneAction = (userId, yarnId) => {
    return createNewScene('', null, 1, userId, yarnId, '')
}

export const createOrgChartPropAction = (yarnId) => {
    return readAllSceneDataHelper(yarnId)       
    .then(result => {
        const scenes = result
        const firstScene = getFirstSceneHelper(scenes)
        if (firstScene.children === []){
            return {
                index: firstScene.index,
                title: firstScene.title
            }
        } return {
            index: firstScene.index,
            title: firstScene.title,
            children: assignOrgChartHelper(scenes, firstScene, firstScene.children)
        }
    });
};
