import React from 'react';

import DataDisplayTable from './datadisplaytable';

const configData = [
  { id: '1', numeric: false, kvalue: 'name',  label: 'Config Name' },
  { id: '2', numeric: false, kvalue: 'vm',    label: 'VM' },
  { id: '3', numeric: false, kvalue: 'user',  label: 'User' },
  { id: '4', numeric: true,  kvalue: 'count', label: 'Behaviors' },
];

class ConfigsTable extends React.Component {

    render() {
        return (
            <div>
                <DataDisplayTable {...this.props} columnData={configData} />
            </div>
        );
    }
}

export default ConfigsTable;