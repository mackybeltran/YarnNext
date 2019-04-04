import './YarnChart.scss'
import OrgChart from 'react-orgchart';
import { Component } from 'react';
import { readFromCollection } from '../models/yarnModel.js'
import { createOrgChartPropAction } from '../controllers/sceneController.js'

const MyNodeComponent = ({node}) => {
    return (
        <div className="initechNode" onClick={() => console.log("Click fired for : " + node.index)}>{ node.index }</div>
    );
};

class YarnChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            orgChartObject: {}
        }
    }

    componentDidMount(){
        createOrgChartPropAction(this.props.yarnId)
        .then(result => {
            this.setState({
                orgChartObject: result
            })
        })
    }
    render(){
        console.log(this.state.orgChartObject)
        
        return <div className='YarnChart'>
        </div>
    }
}

export default YarnChart