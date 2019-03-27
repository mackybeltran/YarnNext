import React, { PureComponent } from 'react';
import './LoginModal.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import { signIn, register } from '../firebase/firebase.js'


class LoginModal extends PureComponent {
    constructor(props){
        super(props);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.state = {
            email: '',
            pass: ''
        }
    }

    handleChangeEmail(event){
        this.setState({
            email: event.target.value
        })
        console.log(this.state.email)
    }

    handleChangePassword(event){
        this.setState({
            pass: event.target.value
        })
        
    }

    handleRegistration(){
        console.log('login fired')
        const email = this.state.email;
        const pass = this.state.pass;
        const callback = () => {
            if (this.props.isAuthenticated) {
                this.props.loginModalChange(false)
            }
        }
        register(email, pass, callback)

       
   
    }

    handleLogin(){
        
        console.log('login fired')
        const email = this.state.email;
        const pass = this.state.pass;
     
        signIn(email, pass, this.props.loginModalChange(false))
    }

    handleSignIn(event){
        event.preventDefault()
        if (this.props.signInMode === 'login' ) {
            this.handleLogin()
        } else {
            this.handleRegistration()
        }
        
    }

    render(){
        return <div className={this.props.loginModalOn ? 'LoginModal' : 'none'}>
                <div className='_title'>
                    {this.props.signInMode}
                </div>
                <form className='_form' onSubmit={this.handleSignIn}>
                    <input type='text' 
                        className='_input' 
                        onChange={this.handleChangeEmail} 
                        value={this.state.email}
                        placeholder='email'/>
                    <input type='password' 
                        className='_input' 
                        onChange={this.handleChangePassword} 
                        value={this.state.pass}
                        placeholder='password'/>
                    <input type='submit' 
                        className='_input'>
                    </input>
                </form>
                <div 
                    className='_close-btn'
                    onClick={() => this.props.loginModalChange(false)}>
                    close
                </div>
            </div>
    }
}

export default LoginModal