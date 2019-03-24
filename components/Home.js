import React, { PureComponent } from 'react';
import './Home.scss';
import Nav from './Nav.js'
import LoginModal from './LoginModal';
import firebase from 'firebase/app';
import 'firebase/auth';
import loadFirebase from '../lib/firebase.js'

class Home extends PureComponent {
    constructor(props){
        super(props);
        this.signInModeChange = this.signInModeChange.bind(this);
        this.loginModalChange = this.loginModalChange.bind(this);
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.state = {
            signInMode: 'login',
            isAuthenticated: null,
            loginModalOn: false
        }
    }

    signInModeChange(mode){
        this.setState({
            signInMode: mode
        })
    }

    loginModalChange(mode){
        
        this.setState({
            loginModalOn: mode
        })
    }

    checkAuthentication(){
        this._removeListener = firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({
                isAuthenticated: !!user
            }) 
            : this.setState({
                isAuthenticated: false
            }); 
        });
    }

    componentWillMount(){

        this.checkAuthentication()
    }

    componentWillUnmount(){
        this._removeListener();
    }


    render() {
      
        return <div className='Home'>
            <Nav 
                signInModeChange={this.signInModeChange}
                isAuthenticated={this.state.isAuthenticated}
                loginModalChange={this.loginModalChange}
                checkAuthentication={this.checkAuthentication}/>
            <main className='_main'>
                <LoginModal 
                    signInMode={this.state.signInMode}
                    isAuthenticated={this.state.isAuthenticated}
                    loginModalOn={this.state.loginModalOn}
                    loginModalChange={this.loginModalChange}
                    checkAuthentication={this.checkAuthentication}/>
            </main>
        </div>
    }

}

export default Home