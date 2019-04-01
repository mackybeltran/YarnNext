import firebase from 'firebase/app';
import 'firebase/firestore';


export const createNewYarn = (url, title, user) => {         
    return firebase.firestore().collection('yarns').add({
            cover: url,
            title: title,
            userId: user
    })
}
    
export const addCoverToYarn = (file, title, user) => {
    const storageRef = firebase.storage().ref().child(`/yarnImages/${user}/${title}/${file.name}`)
    return storageRef.put(file)
    .then(snapshot => {
        return storageRef.getDownloadURL()
    })
}

export const readFromCollection = (collection, key, value) => {
    return firebase.firestore().collection(`${collection}`).where(`${key}`, '==', value).get()
    .then(snapshot => {
        return snapshot.docs
    })    
}

export const readAllCollection = (collection) => {
    return firebase.firestore().collection(`${collection}`).get()
    .then((snapshot) => {
        return snapshot.docs
    })
}

export const readUserIdFromYarn = async (yarnId) => {
    const response = await firebase.firestore().collection('yarns').doc(`${yarnId}`).get()
    // console.log('37', response.data().userId)
    return response.data().userId
    // return firebase.firestore().collection('yarns').doc(`${yarnId}`).get()
    // .then(snapshot => {
    //     if (snapshot.exists){
    //         return snapshot.data().userId
    //     }else {
    //         consosle.log('document doesnt exist')
    //     }
    // })
}