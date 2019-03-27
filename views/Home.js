import React, { PureComponent } from 'react';
import './Home.scss';
import Nav from './Nav.js'
import LoginModal from './LoginModal';
import NewYarnModal from './NewYarnModal'
import firebase from 'firebase/app';
import 'firebase/auth';
const bulb = 'https://firebasestorage.googleapis.com/v0/b/yarn-3c8e6.appspot.com/o/icons%2Fbulb.png?alt=media&token=abed59ea-78f3-4348-bf42-3339b260520c'
const controller = 'https://firebasestorage.googleapis.com/v0/b/yarn-3c8e6.appspot.com/o/icons%2Fcontroller.png?alt=media&token=42b7f2c9-b8b1-4894-b26a-d0c8690faf0b'

class Home extends PureComponent {
    constructor(props){
        super(props);
        this.signInModeChange = this.signInModeChange.bind(this);
        this.loginModalChange = this.loginModalChange.bind(this);
        this.createModeOn = this.createModeOn.bind(this);
        this.newYarnModalChange = this.newYarnModalChange.bind(this);
      
        this.state = {
            signInMode: 'login',
            loginModalOn: false,
            createModeOn: false,
            newYarnModalOn: false
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

    newYarnModalChange(mode){
        this.setState({
            newYarnModalOn: mode
        })
    }

    createModeOn(){
        if (this.state.createModeOn){
            this.setState({
                createModeOn: false
            })
        } else {
            this.setState({
                createModeOn: true
            })
        }
    }

    componentDidMount(){
        if (!!this.props.appState.isAuthenticated) {
            this.loginModalChange(false)
        }
    }

    render() {
        return <div className='Home'>
            <Nav 
                signInModeChange={this.signInModeChange}
                isAuthenticated={this.props.appState.isAuthenticated}
                loginModalChange={this.loginModalChange}
                />
            <main className='_main'>
                <div className='_use-modes'>
                    <div 
                        className={this.props.appState.isAuthenticated ? '_mode' : 'none'}
                        onClick={this.createModeOn}>
                        <img src={bulb}/>
                        CREATE
                    </div>
                    <div className='_mode'>
                        <img src={controller}/>
                        PLAY
                    </div>
                </div>
                <div className={this.props.appState.isAuthenticated ? '_create-modes' : 'none'}>
                    <div 
                        className={this.state.createModeOn ? '_mode' : 'none'}
                        onClick={() => this.newYarnModalChange(true)}>
                        NEW
                    </div>
                    <div className={this.state.createModeOn ? '_mode' : 'none'}>
                        EXISTING
                    </div>
                </div>
                <LoginModal 
                    signInMode={this.state.signInMode}
                    isAuthenticated={this.props.appState.isAuthenticated}
                    loginModalOn={this.state.loginModalOn}
                    loginModalChange={this.loginModalChange}
                />
                <NewYarnModal
                    newYarnModalChange={this.newYarnModalChange}
                    newYarnModalOn={this.state.newYarnModalOn}
                    isAuthenticated={this.props.appState.isAuthenticated}/>
            </main>
        </div>
    }

}

export default Home