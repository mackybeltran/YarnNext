import './YarnChart.scss';
import './React-Sortable-Tree.scss';
import { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree'




class YarnChart extends Component {

    componentDidUpdate(prevProps){
        console.log(this.props)
       console.log(prevProps)

       if (this.props !== prevProps){
           console.log(this.props.treeData)
       }
    }

    render(){
        console.log(this.props)
        
        return <div className='YarnChart'>
            <SortableTree treeData={this.props.treeData} 
                onChange={treeData => this.props.handleTreeData(treeData)}
                />
         
        </div>
    };
};

export default YarnChart