import React from 'react';
import Vis from 'vis';

class VisEditor extends React.Component {

    componentDidMount = () => {
        var nodes = new Vis.DataSet([
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
        ]);

        var edges = new Vis.DataSet([
            {from: 1, to: 3},
            {from: 2, to: 4},
            {from: 2, to: 5}
        ]);

        var data = {
            nodes: nodes,
            edges: edges
        };

        var options = {
            clickToUse: true,
            interaction: {
                zoomView: false,
                navigationButtons: true,
                selectable: true
            }
        };

        new Vis.Network(this.visdiv, data, options);

    }

    render = () => {
        return (
            <div className="editor" style={{ marginTop: 5 }}>
                <div id="viscontainer">
                    <div id="visdiv" ref={(d) => { this.visdiv = d }}></div>
                </div>
            </div>
        );
    };
}

export default VisEditor;