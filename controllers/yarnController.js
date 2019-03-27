import firebase from 'firebase';

export const addNewYarn = (user, title, file) => {
    const storageRef = firebase.storage().ref().child(`/yarnImages/${user}/${title}/${file.name}`)
    storageRef.put(file).on('state_changed',
        snapshot => {
            console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        }, (error) => {
            console.log(error)
        },() => {
            return storageRef.getDownloadURL()
                .then(url =>            
                firebase.firestore().collection('yarns').add({
                    title: title,
                    user: user,
                    cover: url
        })).then(result => {
            location.assign('/myyarns')
        })
    })
}

export const getUsersYarns = (user) => {
    return firebase.firestore().collection('yarns').where('user', '==', user).get()
    .then((snapshot) => {
        return snapshot.docs
    })    
}

export const getAllYarns = () => {
    return firebase.firestore().collection('yarns').get()
    .then((snapshot) => {
        console.log(snapshot)
        return snapshot.docs
    })
}

