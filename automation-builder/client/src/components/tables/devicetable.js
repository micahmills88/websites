import React from 'react';
import DataDisplayTable from './datadisplaytable';

const deviceData = [
    { id: '1', numeric: false, key: 'vm',         label: 'VM' },
    { id: '2', numeric: false, key: 'device',     label: 'Device Type' },
    { id: '3', numeric: false, key: 'os',         label: 'OS Type' },
    { id: '4', numeric: true,  key: 'interfaces', label: 'Interfaces' },
];

class DeviceTable extends React.Component {

    render() {
                
        return (
            <div>
                <DataDisplayTable {...this.props} columnData={deviceData} />
            </div>
        );
    }
}

export default DeviceTable;