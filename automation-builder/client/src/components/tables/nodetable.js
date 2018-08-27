import React from 'react';
import 'whatwg-fetch';

import DataDisplayTable from './datadisplaytable';


const nodeData = [
    { id: '1', numeric: false, key: 'name',  label: 'Config Name' },
    { id: '2', numeric: false, key: 'vm',    label: 'VM' },
    { id: '3', numeric: false, key: 'user',  label: 'User' },
    { id: '4', numeric: true,  key: 'count', label: 'Behaviors' },
];

class NodeTable extends React.Component{
    render() {
        return(
            <div>
                <DataDisplayTable {...this.props} columnData={nodeData} />
            </div>
        );
    }
}

export default NodeTable;