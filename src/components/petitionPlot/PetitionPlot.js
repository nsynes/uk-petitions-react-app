import React from 'react';
import Plot from 'react-plotly.js';

class PetitionPlot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        var { signatureCount } = this.props;

        var xData=[], yData=[];
        for (var property in signatureCount) {
            if (signatureCount.hasOwnProperty(property)) {
                xData.push(property)
                yData.push(signatureCount[property]);
            }
        }

        return(
            <div>
                <Plot
                    className="plotly-graph"
                    data={[
                    {type: 'bar',
                    x: signatureCount.map(function(item) {return item.name}),
                    y: signatureCount.map(function(item) {return item.count}),
                    marker: {
                        color: signatureCount.map(function(item) {return item.color})
                    },
                    orientation: 'v'
                    }]}
                    useResizeHandler
                    layout={ {
                        margin: {
                            l: 30,
                            r: 30,
                            b: 80,
                            t: 0,
                            pad: 0
                        },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        title: '',
                        yaxis: {
                            fixedrange: true
                        },
                        xaxis : {
                            fixedrange: true
                        },
                        autosize: true
                    } }
                    style={{ width: '100%' }}
                    config={ {displayModeBar: false} }
                    />
                <br />
            </div>
        )
    }
}

export default PetitionPlot;