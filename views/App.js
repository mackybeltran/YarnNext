import './App.scss';
import { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { loadFirebase } from '../models/userModel.js';



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