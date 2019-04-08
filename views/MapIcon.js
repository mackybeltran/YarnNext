import { Component } from 'react';
import './Mapicon.scss'

class MapIcon extends Component {

    render(){
        return <div className={this.props.chartOn ? '_chartOn' : 'MapIcon'} onClick={this.props.handleChartOn}>
            </div>
    }
}

export default MapIcon