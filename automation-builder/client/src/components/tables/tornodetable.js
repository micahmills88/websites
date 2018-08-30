import React from 'react';
import 'whatwg-fetch';

import DataDisplayTable from './datadisplaytable';


const nodeData = [
    { id: '1', numeric: false, kvalue: 'domain',    label: 'Domain' },
    { id: '2', numeric: false, kvalue: 'nickname',  label: 'Nickname' },
    { id: '3', numeric: false, kvalue: 'ipaddress',  label: 'IP Address' },
    { id: '4', numeric: false, kvalue: 'nodeType', label: 'Node Type' },
    { id: '5', numeric: false, kvalue: 'bridgeNode', label: 'Bridge' },
    { id: '6', numeric: false, kvalue: 'exitNode', label: 'Exit' },
    { id: '7', numeric: false, kvalue: 'rate', label: 'Rate' }
];

class TorNodeTable extends React.Component{
    render() {
        return(
            <div>
                <DataDisplayTable {...this.props} columnData={nodeData} />
            </div>
        );
    }
}

export default TorNodeTable;