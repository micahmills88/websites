import React from 'react';

import DataDisplayTable from './datadisplaytable';

const deviceData = [
    { id: 'vm', numeric: false, disablePadding: false, label: 'VM' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Device Type' },
    { id: 'user', numeric: false, disablePadding: false, label: 'OS Type' },
    { id: 'behaviors', numeric: true, disablePadding: false, label: 'Interfaces' },
];

class DeviceTable extends React.Component {

    render() {
                
        return (
            <div>
                <DataDisplayTable {...this.props} columnData={deviceData}/>
            </div>
        );
    }
}

export default DeviceTable;