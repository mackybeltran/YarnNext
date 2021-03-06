import './Yarnlist.scss'
import { Component } from 'react'
import { loadFirebase, getUser } from '../models/userModel.js';
import { readUsersYarnsAction, readAllYarnsAction} from '../controllers/yarnController'
import Nav from './NavLogoutOnly.js'
import Link from 'next/link'

class Yarnlist extends Component {
    constructor(props){
        super(props);
      
        this.state = {
            yarns: [],
        }
    }
    componentDidUpdate(prevProps){    
        if (!(this.props.appState.isAuthenticated) && (!prevProps.appState.isAuthenticated)){
            location.assign('/')
        }

        if ((this.props.appState.isAuthenticated !== prevProps.appState.isAuthenticated) &&
        (this.props.allYarns === false)) {   
        readUsersYarnsAction(this.props.appState.isAuthenticated)
        .then(data => {
            this.setState({
                yarns: data
            })
        })
    }   if ((this.props.appState.isAuthenticated !== prevProps.appState.isAuthenticated) &&
        (this.props.allYarns === true)) {
        readAllYarnsAction()
        .then(data => {
            this.setState({
                yarns: data
            })
        })
    }       
}

   
    render(){
        
        return <div className='Yarnlist'>
            <Nav 
                isAuthenticated={this.props.appState.isAuthenticated}               
            />
            <div className='_yarn-container'>
            {this.state.yarns.map((yarn, index) => {
        
                return <Link 
                    key={index}
                    href={this.props.allYarns ? '/' : `edit?id=${yarn.id}`}>                
                    <a className='_yarn-card'>
                        <div className='_img-container'>
                            <img 
                                src={yarn.data().cover}
                                className='_yarn-cover w3-image'
                                alt={yarn.data().title}/>
                        </div>
                        <div className='_title-container'>
                            {yarn.data().title}
                        </div>
                    </a>
                </Link>
            })}
            </div>
        </div>
    }
}

export default Yarnlist