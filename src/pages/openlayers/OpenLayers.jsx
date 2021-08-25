import React, { Component } from "react";
// import * as ol from "ol";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Vector as LayerVector} from 'ol/layer';
import { Vector as SourceVector } from 'ol/source';
import {fromLonLat} from 'ol/proj';

class PublicMap extends Component {
  constructor(props) {
    super(props);

    this.state = { center: [0, 0], zoom: 1 };

    this.olmap = new OlMap({
      target: null,
      layers: [
        new OlLayerTile({
          source: new OlSourceOSM()
        }),
      ],
      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });

    const marker = new Feature({
      geometry: new Point(
        fromLonLat([-74.006,40.7127])
      ),  // Cordinates of New York's Town Hall
    });
    const vectorSource = new SourceVector({
      features: [marker]
    });
    const markerVectorLayer = new LayerVector({
      source: vectorSource,
    });

    this.olmap.addLayer(markerVectorLayer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [546000, 6868000], zoom: 5 });
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map" style={{ width: "100%", height: "100vh" }}>
        <button onClick={e => this.userAction()}>setState on click</button>
      </div>
    );
  }
}

export default PublicMap;
