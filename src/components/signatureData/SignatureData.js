import React from 'react'
import PetitionPlot from '../petitionPlot/PetitionPlot.js'
import '../signatureData/SignatureData.css'
import Map from '../leafletMap/LeafletMap.js'
import constituencyLookup from '../../data/constituency-to-District-to-upper-tier-district-lookup-UK-December_2018.json'



class SignatureData extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            mode: 'plot',
            maxCount: 0,
            groupSignatureCount: []
        }

    }

    componentDidMount() {

        var { constituencySignatureCount } = this.props
        //'country': 'CTRY18NM',
        //'region': 'GOR10NM',
        //'county': 'UTLA17NM'

        const group = 'CTRY18NM'

        // merge country, region and county data to the constituency signature count data
        if (constituencySignatureCount ) {
            constituencySignatureCount.map(
                result => (result.location = (
                    ({ CTRY18NM, GOR10NM, UTLA17NM }) => ({ CTRY18NM, GOR10NM, UTLA17NM }))(constituencyLookup.find(
                        function(element) { return element.PCON17CD === result.ons_code })
                    )
                )
            )

            // sort the signature data by the grouping location variable (country, region, county, or constituency)
            constituencySignatureCount.sort((a,b) => (a.location[group] > b.location[group]) ? 1 : ((b.location[group] > a.location[group]) ? -1 : 0));

            var groupSum = {};
            constituencySignatureCount.forEach(function(item) {
                if ( groupSum.hasOwnProperty(item.location[group]) ) {
                    groupSum[item.location[group]] = groupSum[item.location[group]] + item.signature_count
                } else {
                    groupSum[item.location[group]] = item.signature_count
                }
            });

            var groupSignatureCount = []
            Object.keys(groupSum).forEach(function(item) {
                groupSignatureCount.push({name:item, count: groupSum[item]})
            })
            const maxCount = Math.max.apply(Math, groupSignatureCount.map((item) => item.count))

            this.setState({ maxCount: maxCount, groupSignatureCount: groupSignatureCount })
        }

    }

    perc2color = (value) => {
        const percentage = (value / this.state.maxCount) * 100

        const g = Math.round(255 - 2.5 * percentage);
        const r = 255;
        const b = 0
        const h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }
    /*function perc2color(perc) {
        var r, g, b = 0;
        if(perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }*/

    handleRadioClick = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    render() {

        if ( this.state.maxCount > 0 ) {
            this.state.groupSignatureCount.map((item) => {
                item.color = this.perc2color(item.count)
                return item
            })
        }

        if ( this.state.groupSignatureCount.length > 0) {
            return (
                <div style={{width:'100%'}}>
                    <form style={{paddingBottom:'1em'}}>
                        <label style={{marginRight:'1em'}}>
                            <input
                                type='radio'
                                className='Radio-map-plot'
                                name='mode'
                                checked={this.state.mode === 'plot'}
                                value='plot'
                                onChange={this.handleRadioClick}
                            /> Plot
                        </label>
                        <label>
                            <input
                                type='radio'
                                className='Radio-map-plot'
                                name='mode'
                                checked={this.state.mode === 'map'}
                                value='map'
                                onChange={this.handleRadioClick}
                            /> Map
                        </label>
                    </form>
                    { this.state.mode === 'plot' ?
                        <PetitionPlot signatureCount={this.state.groupSignatureCount} /> :
                        <Map signatureCount={this.state.groupSignatureCount}/> }
                </div>
            )
        } else {
            return ('No data available')
        }
    }
}

export default SignatureData