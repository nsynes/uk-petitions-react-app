import React from 'react'
import '../leafletMap/LeafletMap.css';
import { Map as LeafletMap, TileLayer, Popup, GeoJSON } from 'react-leaflet';
import ukRegions from '../../data/UK-region-polygon/uk-region.json';

class Map extends React.Component {

    constructor(props) {
        super(props)
    }

    getColor = (feature) => {
        return (
            this.props.signatureCount.find((element) => {
                return (element.name === feature.properties.CTRY18NM)
            }).color
        )
    }

    style = (feature) => {
        return {
            fillColor: this.getColor(feature),
            stroke: false,
            opacity: 1,
            fillOpacity: 0.7
        };
    }

    stylePopups = (feature, layer) => {
        layer.bindPopup('<p>'+feature.properties.CTRY18NM+'</p>');
    }

    render() {

        return (
        <LeafletMap
            center={[55.8, -4.5]}
            zoom={5}
            maxZoom={10}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
        >
            <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <GeoJSON
                data={ukRegions}
                style={this.style}
                onEachFeature={(feature, layer) => {this.stylePopups(feature, layer)}}
                onClick={(event) => {console.log(event)}}
            >
            </GeoJSON>
        </LeafletMap>
        );
    }
}

export default Map