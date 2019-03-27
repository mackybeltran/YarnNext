import { Component } from 'react';

import firebase from 'firebase';
import 'firebase/auth'
import { loadFirebase } from '../firebase/firebase.js'
import './App.scss'


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated:  null
        }
        loadFirebase()
    }

    componentDidMount(){
    
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({
                isAuthenticated: user.uid,
            })
            : this.setState({
                isAuthenticated: false
            }); 
        });
    }

    render(){
        return <div>
                {this.props.children(this.state)}
            </div>
    }
}

export default App