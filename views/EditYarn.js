import { Component } from 'react';
import Nav from './NavLogoutOnly';
import YarnChart from './YarnChart.js';
import './EditYarn.scss';
import { createOrgChartPropAction } from '../controllers/sceneController.js'

class EditYarn extends Component {
    constructor(props){
        super(props);
        this.handleTreeData = this.handleTreeData.bind(this)
        this.state = {
            scenes: [],
            treeData: []
        }
    }

    componentDidUpdate(prevProps){    
        if (!(this.props.appState.isAuthenticated) && (!prevProps.appState.isAuthenticated)){
            location.assign('/')
        };
    };

    componentDidMount(){
        createOrgChartPropAction(this.props.yarnId)
        .then(result => {
            this.setState({
                treeData: result.treeData,
                scenes: result.scenes
            });
        });
    };

    handleTreeData(treeData){
        this.setState({
            treeData: treeData
        })
    }

    render(){
        return <div className='EditYarn'>
            <Nav 
                isAuthenticated={this.props.appState.isAuthenticated}               
            />
            <YarnChart 
                appState={this.props.appState}
                yarnId={this.props.yarnId}
                scenes={this.state.scenes}
                treeData={this.state.treeData}
                handleTreeData = {this.handleTreeData}/>
            </div>
    }
}

export default EditYarn