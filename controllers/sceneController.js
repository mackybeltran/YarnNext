import firebase from 'firebase/app'
import 'firebase/firestore'
import { createNewScene, readAllScenes } from '../models/sceneModel.js';
import { readFromCollection } from '../models/yarnModel.js'


export const createFirstSceneAction = (userId, yarnId) => {
    return createNewScene('', null, 1, userId, yarnId, '')
}

export const readAllSceneDataAction = (yarnId) => {
    var array = []
    return readFromCollection('scenes', 'yarnId', yarnId)
        .then(snapshot => {
            snapshot.map(scene => {
                array.push(scene.data())
            })
        return array
    })   
}

export const getFirstSceneAction = (scenes) => {
    const firstScene = scenes.filter(scene => scene.index === 1)[0]
    return firstScene
}


const getChildrenAction = (scenes, childrenIndex) => {
    const childrenArray = []
    const pushChildrenAction = (scenes, childrenIndex) => {  
        childrenIndex.forEach(childIndex => {
            scenes.forEach(scene => {
                if (scene.index === childIndex){
                childrenArray.push(scene)
                };
            });
        }); 
    };  pushChildrenAction(scenes, childrenIndex)
        return childrenArray
};

const assignOrgChartAction = (scenes, scene, childrenIndex) => {

    let childrenObjects = [];
    getChildrenAction(scenes, scene.children).forEach(child => {
        if (child.children === []){
            childrenObjects.push({
                index: child.index,
                title: child.title
            })
        }else {
            
            childrenObjects.push({
                index: child.index,
                title: child.title,
                children: assignOrgChartAction(scenes, child, child.children)
            });
        };
    }); return childrenObjects
};
export const createOrgChartPropAction = (yarnId) => {
    return readAllSceneDataAction(yarnId)
        
        .then(result => {
            const scenes = result
            const firstScene = getFirstSceneAction(scenes)
            if (firstScene.children === []){
                return {
                    index: firstScene.index,
                    title: firstScene.title
                }
            } return {
                index: firstScene.index,
                title: firstScene.title,
                children: assignOrgChartAction(scenes, firstScene, firstScene.children)
            }

        });
};
