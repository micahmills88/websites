import React from 'react';
import 'whatwg-fetch';

import DataDisplayTable from './datadisplaytable';


const websiteData = [
    { id: '1', numeric: false, kvalue: 'hostname',    label: 'Hostname' },
    { id: '2', numeric: false, kvalue: 'ipaddress',  label: 'IP Address' }
];

class RedirectionTable extends React.Component{
    render() {
        return(
            <div>
                <DataDisplayTable {...this.props} columnData={websiteData} />
            </div>
        );
    }
}

export default RedirectionTable;