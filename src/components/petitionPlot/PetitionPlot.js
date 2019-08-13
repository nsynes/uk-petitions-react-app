import React from 'react';
import Plot from 'react-plotly.js';
import '../petitionPlot/PetitionPlot.css';

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
                    layout={ {
                        width: xData.length*120,
                        height: 450,
                        margin: {
                            l: 30,
                            r: 30,
                            b: 30,
                            t: 0,
                            pad: 0
                        },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        title: ''
                    } }
                    config={ {displayModeBar: false, responsive: true} }/>
                <br />
            </div>
        )
    }
}

export default PetitionPlot;