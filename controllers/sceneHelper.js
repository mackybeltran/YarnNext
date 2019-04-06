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
        let title
        child.title ? title = child.title : title = `Scene # ${child.index}`     
        if (child.children) {            
            childrenObjects.push({
                title: title,
                index: child.index,
                expanded: true,
                userId: child.userId,
                yarnId: child.yarnId,
                backgroundImg: child.backgroundImg,
                children: assignOrgChartHelper(scenes, child, child.children)
            });
        } else {
            childrenObjects.push({
                title: title,
                index: child.index,
                userId: child.userId,
                yarnId: child.yarnId,
                backgroundImg: child.backgroundImg,
                expanded: true
            })
        }
    }); return childrenObjects
};

export const getChildrenFromTreeObjectHelper = (childrenArray) => {
    let result = []
    childrenArray.forEach(childObject => {
        result.push(childObject,index)
    }); return result
};
//for flattening data to save to database
export const flattenTreeObjectHelper = (tree) => {
    let result = []
    tree.forEach(treeObject => {
        if (treeObject.children){
            let childrenArray = []            
            result.push({
                backgroundImg: treeObject.backgroundImg,
                index: treeObject.index,
                title: treeObject.title,
                userId: treeObject.userId,
                yarnId: treeObject.yarnId,
                children: getChildrenFromTreeObjectHelper(treeObject.children)
            }); flattenTreeObjectHelper(treeObject.children)
        } else {
            let childrenArray = []            
            result.push({
                backgroundImg: treeObject.backgroundImg,
                index: treeObject.index,
                title: treeObject.title,
                userId: treeObject.userId,
                yarnId: treeObject.yarnId
            });
        };
    }); return result
};