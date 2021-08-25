import React, { Component, useEffect, useState } from "react";
// import * as $ from 'jquery';
import $ from 'jquery';
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
import {Icon, Style} from 'ol/style';
import Overlay from 'ol/Overlay';


export default function PublicMap() {
  const [center, setCenter] = useState([0, 0])
  const [zoom, setZoom] = useState(1)

  const [myView] = useState(new OlView({
    center: center,
    zoom: zoom
  }))
  const [olmap] = useState(new OlMap({
    target: null,
    layers: [
      new OlLayerTile({
        source: new OlSourceOSM()
      }),
    ],
    view: myView
  }))

  const iconFeature = new Feature({
    geometry: new Point(fromLonLat([-74.006,40.7127])),
    name: 'Null Island',
    population: 4000,
    rainfall: 500,
  });
  
  const iconStyle = new Style({
    image: new Icon({
      // size: [100, 100],
      scale: 0.05,
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    }),
  });
  
  iconFeature.setStyle(iconStyle);

  useEffect(() => {
    olmap.setTarget("map");

    // Listen to map changes
    olmap.on("moveend", () => {
      let newCenter = olmap.getView().getCenter()
      let newZoom = olmap.getView().getZoom()
      setCenter(newCenter)
      setZoom(newZoom)
    });

    const marker = new Feature({
      geometry: new Point(
        fromLonLat([-74.006,40.7127])
      ),  // Cordinates of New York's Town Hall
    });
    const vectorSource = new SourceVector({
      features: [marker, iconFeature]
    });
    const markerVectorLayer = new LayerVector({
      source: vectorSource,
    });

    olmap.addLayer(markerVectorLayer);
  }, [])

  const userAction = () => {
    olmap.getView().animate({ zoom: 9 }, { center: fromLonLat([-74.006,40.7127]) }, { duration: 2000 });
  }

  
  const [showingPopup, setShowingPopup] = useState(false)
  

  // display popup on click
  olmap.on('click', function (evt) {
    const element = document.getElementById('hello-popup');
    const popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: true,
    });
    olmap.addOverlay(popup);
    const feature = olmap.forEachFeatureAtPixel(evt.pixel, function (feature) {
      console.log(feature);
      return feature;
    });
    if (feature) {
      setShowingPopup(true)
      popup.setPosition(evt.coordinate);
    }
  });

  myView.on('change:resolution', function () {
    setShowingPopup(false)
  });

  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}>
      <button onClick={() => userAction()}>setState on click</button>
      <h1 id="kay">kay</h1>
      {/* <div id="popup">asdfasdfasdfasdf</div> */}
      <PopupElement showingPopup={showingPopup} />
    </div>
  );
}

const PopupElement = ({ showingPopup }) => {
  return(
    <div 
      id="hello-popup"
      style={{ height:"100px", width:"100px", backgroundColor:"grey", display:`${showingPopup ? "block" : "none"}`, transform:"translateY(-20px)"}}
      onClick={() => {
        console.log("HI 1")
      }}
    >
      <button onClick={() => {
        console.log("HI")
      }}>hiiiiiiii</button>
    </div>
    
  )
}