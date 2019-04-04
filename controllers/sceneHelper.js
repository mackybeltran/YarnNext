import { readFromCollection } from '../models/yarnModel.js'

export const readAllSceneDataHelper = (yarnId) => {
    var array = [];
    return readFromCollection('scenes', 'yarnId', yarnId)
        .then(snapshot => {
            snapshot.map(scene => {
                array.push(scene.data())
            });
        return array
    });   
};

export const getFirstSceneHelper = (scenes) => {
    const firstScene = scenes.filter(scene => scene.index === 1)[0];
    return firstScene
};


export const getChildrenHelper = (scenes, childrenIndex) => {
    const childrenArray = [];
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

export const assignOrgChartHelper = (scenes, scene, childrenIndex) => {

    let childrenObjects = [];
    getChildrenHelper(scenes, scene.children).forEach(child => {
        console.log('38', child.children)       
        if (child.children) {            
            childrenObjects.push({
                index: child.index,
                title: child.title,
                children: assignOrgChartHelper(scenes, child, child.children)
            });
        } else {
            console.log('40')
            childrenObjects.push({
                index: child.index,
                title: child.title
            })
        }
    }); return childrenObjects
};