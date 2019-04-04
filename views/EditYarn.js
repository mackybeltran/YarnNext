import { Component } from 'react';
import Nav from './NavLogoutOnly';
import YarnChart from './YarnChart.js';
import './EditYarn.scss';

class EditYarn extends Component {
    constructor(props){
        super(props);
        this.state = {
            scenes: []
        }
    }

    componentDidUpdate(prevProps){    
        if (!(this.props.appState.isAuthenticated) && (!prevProps.appState.isAuthenticated)){
            location.assign('/')
        }
    }

    render(){
        return <div className='EditYarn'>
            <Nav 
                isAuthenticated={this.props.appState.isAuthenticated}               
            />
            <YarnChart 
                appState={this.props.appState}
                yarnId={this.props.yarnId}/>
            </div>
    }
}

export default EditYarn