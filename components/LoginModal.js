import React, { PureComponent } from 'react';
import './LoginModal.scss';
import firebase from 'firebase/app';
import 'firebase/auth';


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
            password: ''
        }
    }

    handleChangeEmail(event){
        this.setState({
            email: event.target.value
        })
    }

    handleChangePassword(event){
        this.setState({
            password: event.target.value
        })
        
    }

    handleRegistration(){
        console.log('login fired')
        const email = this.state.email;
        const pass = this.state.password;
        firebase.auth().createUserWithEmailAndPassword(email, pass);

        firebase.auth().onAuthStateChanged(user => {
            user ? console.log('logged in')
            : console.log('not logged in')

        })
   
    }

    handleLogin(){
        
        console.log('login fired')
        const email = this.state.email;
        const pass = this.state.password

        firebase.auth().signInWithEmailAndPassword(email, pass);
        
        
       
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.props.loginModalChange(false)
            : console.log('not logged in')
        
        })

    }

    handleSignIn(event){
        event.preventDefault()
        if (this.props.signInMode === 'login' ) {
            this.handleLogin()
        } else {
            this.handleRegistration()
        }
        
    }

    componentWillMount(){
        this._removeListener = firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({
                isAuthenticated: !!user
            })
            : this.setState({
                isAuthenticated: false
            }); 
        });
    }

    componentWillUnmount(){
        this._removeListener();
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
                        value={this.state.password}
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