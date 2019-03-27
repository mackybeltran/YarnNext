import { Component } from 'react'
import { loadFirebase, getUser } from '../firebase/firebase.js'

import { getUsersYarns } from '../controllers/yarnController'
import Nav from './Nav.js'

class Yarnlist extends Component {
    constructor(props){
        super(props);
        this.signInModeChange = this.signInModeChange.bind(this);
        this.loginModalChange = this.loginModalChange.bind(this);
        this.state = {
            yarns: [],
            signInMode: 'login',
            loginModalOn: false
        }
    }
    componentDidUpdate(prevProps){    
        console.log('19', prevProps)
        if (this.props.appState.isAuthenticated !== prevProps.appState.isAuthenticated) {   
        getUsersYarns(this.props.appState.isAuthenticated)
        .then(data => {
            this.setState({
                yarns: data
            })
        })
    }}

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
    render(){
       console.log(this.props.appState.isAuthenticated)
        return <div className='Yarnlist'>
            <Nav 
                signInModeChange={this.signInModeChange}
                isAuthenticated={this.props.appState.isAuthenticated}
                loginModalChange={this.loginModalChange}
            />
            {this.state.yarns.map((yarn, index) => {
                  
                return <div key={index}>
                      {yarn.data().title}
                    </div>
            })}
            </div>
    }
}

export default Yarnlist