import React from 'react';
import 'whatwg-fetch';

import DataDisplayTable from './datadisplaytable';


const websiteData = [
    { id: '1', numeric: false, kvalue: 'domain',    label: 'Domain' },
    { id: '2', numeric: false, kvalue: 'ipaddress',  label: 'IP Address' },
    { id: '3', numeric: false, kvalue: 'webType', label: 'Website Type' }
];

class WebsiteTable extends React.Component{
    render() {
        return(
            <div>
                <DataDisplayTable {...this.props} columnData={websiteData} />
            </div>
        );
    }
}

export default WebsiteTable;