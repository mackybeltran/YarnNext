import './YarnChart.scss';
import './React-Sortable-Tree.scss';
import { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import { getTreeFromFlatData, getFlatDataFromTree, walk } from 'react-sortable-tree'




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
        
        return <div className='YarnChart'>
            <SortableTree treeData={this.props.treeData} 
                onChange={treeData => this.props.handleTreeData(treeData)}
                className='_tree'
                generateNodeProps={rowInfo => ({
                    buttons: [
                      <button onClick={() => console.log(rowInfo)}>i</button>,
                    ],
                  })}
                canDrop={({ nextParent }) => !(nextParent === null) }
                  
                />
         
        </div>
    };
};

export default YarnChart