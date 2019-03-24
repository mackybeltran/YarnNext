import React, { PureComponent } from 'react';
import './Nav.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
const logo = 'https://firebasestorage.googleapis.com/v0/b/yarn-3c8e6.appspot.com/o/logo%2Fyarnlogo.png?alt=media&token=6e974dca-657d-4f5a-a7f6-59acea6f464e'

class Nav extends PureComponent {
    constructor(props){
        super(props);
        this._handleLogout = this._handleLogout.bind(this);
                
    }

    _handleLogout(){
        console.log('logout fired')
        firebase.auth().signOut();

    }

    render(){
        return <div className='Nav'>
                <a href='/' className='_logo-container'>
                    <img src={logo} className='_logo'/>        
                </a>
                <div className='_lr-container'>
                    <div 
                        className={this.props.isAuthenticated ? 'none' : '_login _signInSwitch' } 
                        onClick={() => {
                            this.props.signInModeChange('login')
                            this.props.loginModalChange('true')
                            }}>
                        LOGIN
                    </div>
                    <div 
                        className={this.props.isAuthenticated ? 'none' : '_register _signInSwitch' }
                        onClick={() => {
                            this.props.signInModeChange('register')
                            this.props.loginModalChange(true)
                        }}>
                        REGISTER
                    </div>
                    <div className='_logout _signInSwitch' onClick={this._handleLogout}>
                        LOGOUT
                    </div>   
                </div>
            </div>
    }
}

export default Nav