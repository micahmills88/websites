import React from 'react';
import DataDisplayTable from './datadisplaytable';

const deviceData = [
    { id: '1', numeric: false, kvalue: 'vm',         label: 'VM' },
    { id: '2', numeric: false, kvalue: 'device',     label: 'Device Type' },
    { id: '3', numeric: false, kvalue: 'os',         label: 'OS Type' },
    { id: '4', numeric: true,  kvalue: 'interfaces', label: 'Interfaces' },
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