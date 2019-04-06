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
        let title
        firstScene.title ? title = firstScene.title : title = `Scene # ${firstScene.index}`
        if (firstScene.children === []){
            
            return [{
                title: title,
                expanded: true,
                index: firstScene.index,
                userId: firstScene.userId,
                yarnId: firstScene.yarnId,
                backgroundImg: firstScene.backgroundImg,
                canDrag: false,
                droppable: false
                
            }]
        } return {
            treeData: [{
                title: title,
                expanded: true,
                index: firstScene.index,
                userId: firstScene.userId,
                yarnId: firstScene.yarnId,
                backgroundImg: firstScene.backgroundImg,
                children: assignOrgChartHelper(scenes, firstScene, firstScene.children),
                canDrag: false,
                droppable: false
                

            }],
            scenes: scenes
        }
    });
};
