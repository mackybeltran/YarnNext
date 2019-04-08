import { readFromCollection } from '../models/yarnModel.js';
import { getSceneIdHelper } from './sceneHelper.js';

export const getAllPanelsAction = (scenes, index) => {
    const sceneId = getSceneIdHelper(scenes, index)   
    return readFromCollection('panels', 'sceneId', sceneId)
    .then(result => {
        const allPanels = result.map(panel => {
            return panel.data()
        }); return allPanels
    });
};