import './EditYarn.scss';
import { Component } from 'react';
import { createOrgChartPropAction, getSceneIdOfCurrentScene } from '../controllers/sceneController.js';
import { getAllPanelsAction } from '../controllers/panelController.js';
import Nav from './NavLogoutOnly';
import YarnChart from './YarnChart.js';
import EditPanel from './EditPanel.js'
import MapIcon from './MapIcon.js';

class EditYarn extends Component {
    constructor(props){
        super(props);
        this.handleTreeData = this.handleTreeData.bind(this);
        this.handleChartOn = this.handleChartOn.bind(this);
        this.state = {
            scenes: [],
            treeData: [],
            chartOn: true,
            currentScene: 1,
            panels: [],
            currentPanel: 1
        }
    }

    componentDidUpdate(prevProps){    
        if (!(this.props.appState.isAuthenticated) && (!prevProps.appState.isAuthenticated)){
            location.assign('/')
        } 
    };

    componentDidMount(){
        createOrgChartPropAction(this.props.yarnId)
        .then(result => {
            this.setState({
                treeData: result.treeData,
                scenes: result.scenes
            }); 
            getAllPanelsAction(this.state.scenes, this.state.currentScene)
                .then(allPanels => {
                    console.log('41', allPanels)
                })
        }); 

        
    };

    handleTreeData(treeData){
        this.setState({
            treeData: treeData
        })
    }

    handleChartOn(){
        this.setState({
            chartOn: !this.state.chartOn
        })
    }

    render(){
        return <div className='EditYarn'>
            <Nav 
                isAuthenticated={this.props.appState.isAuthenticated}               
            />
            <div className='_layout'>
                <MapIcon 
                    chartOn={this.state.chartOn}
                    handleChartOn={this.handleChartOn}/>
                <YarnChart 
                    appState={this.props.appState}
                    yarnId={this.props.yarnId}
                    scenes={this.state.scenes}
                    treeData={this.state.treeData}
                    handleTreeData={this.handleTreeData}
                    chartOn={this.state.chartOn}
                    handleChartOn={this.handleChartOn}
                    />
                <EditPanel
                    chartOn={this.state.chartOn}
                    scenes={this.state.scenes}
                    currentScene={this.state.currentScene}
                    panels={this.state.panels}
                    currentPanel={this.state.currentPanel}/>
            </div>
        </div>
    }
}

export default EditYarn