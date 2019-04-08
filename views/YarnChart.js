import './YarnChart.scss';
import './React-Sortable-Tree.scss';
import { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import { getTreeFromFlatData, getFlatDataFromTree, walk } from 'react-sortable-tree';
import { FaArrowAltCircleRight } from 'react-icons/fa';



class YarnChart extends Component {
    constructor(props){
        super(props);
        this.handleButton = this.handleButton.bind(this);
    }

    componentDidUpdate(prevProps){
 
       if (this.props !== prevProps){
           
           this.props.chartOn
       }
    }

    handleButton(rowInfo){
        this.props.handleChartOn()
    }

    render(){

        // const alertNodeInfo = ({ node, path, treeIndex }) => {
        //     const objectString = Object.keys(node)
        //       .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
        //       .join(',\n   ');
        //       global.alert(
        //         'Info passed to the icon and button generators:\n\n' +
        //           `node: {\n   ${objectString}\n},\n` +
        //           `path: [${path.join(', ')}],\n` +
        //           `treeIndex: ${treeIndex}`
        //       );
        //     };
        
        return <div className={this.props.chartOn ? 'YarnChart' : 'none'}>
            <div className='_tree'>
                <SortableTree treeData={this.props.treeData} 
                    onChange={treeData => this.props.handleTreeData(treeData)}
                    generateNodeProps={rowInfo => ({
                        buttons: [
                        <button onClick={() => this.handleButton(rowInfo)}>
                            <div className='_right-arrow-icon'>
                                <FaArrowAltCircleRight />
                            </div>
                        </button>
                        ],
                    })}
                    canDrop={({ nextParent }) => !(nextParent === null) }
                    className='_chart'
                    />
            </div>
        </div>
    };
};

export default YarnChart