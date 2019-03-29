import firebase from 'firebase'

export const addNewScene = (index, yarnId) => {
    return firebase.firestore().collection('scenes').add({
        backgroundImg: '',
        children: [],
        index: index,
        name: '',
        yarnId: yarnId
    })
}