import './App.scss';
import { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { loadFirebase } from '../models/userModel.js';
import { compareUserIdFromYarnToAuthId } from '../controllers/yarnController.js'


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated:  null,
            isValidUser: null
        }
        loadFirebase()
    }

    componentDidMount(){    
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                
                this.setState({
                    isAuthenticated: user.uid
                });
            } else {
                this.setState({
                    isAuthenticated: false
                }); 
            }
            
            
             
        });
    }

    componentDidUpdate(prevProps, prevState){         
        if ((this.state.isAuthenticated) && (!prevState.isAuthenticated) && (this.props.router)){
            compareUserIdFromYarnToAuthId(this.props.router, this.state.isAuthenticated)
            .then(result => {                  
                result ? this.setState({
                    isValidUser: true
                }) : this.setState({
                    isValidUser: false
                })
            }) 
        }
    }

    render(){
        return <div>
            {this.props.children(this.state)}
        </div>
    }
}

export default App