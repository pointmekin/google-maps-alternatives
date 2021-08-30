import React, { useEffect, useState } from "react";
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
  const [showingPopup, setShowingPopup] = useState(false)
  const [style, setStyle] = useState(localStorage.getItem('styleLink'))
  const [myView] = useState(new OlView({
    center: center,
    zoom: zoom
  }))

  const styles = [
    {
      link: "http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      title: "Basemaps (Light) (Free)"
    },
    {
      link: "http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      title: "Basemaps (Dark) (Free)"
    },
    {
      link: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest OpenCycleMap"
    },
    {
      link: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Transport"
    },
    {
      link: "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Landscape"
    },
    {
      link: "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Outdoors"
    },
    {
      link: "https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Transport Dark"
    },
    {
      link: "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Spinal Map"
    },
    {
      link: "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Pioneer"
    },
    {
      link: "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Mobile Atlas"
    },
    {
      link: "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Mobile Neighbourhood"
    },
    {
      link: "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=c237037ebf1c4f49b9a2df602e36313b",
      title: "thunderforest Atlas"
    },
  ]

  const [olmap] = useState(new OlMap({
    target: null,
    layers: [
      new OlLayerTile({
        source:  new OlSourceOSM({
          "url" : style
        })
      })
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
  
  const userAction = () => {
    olmap.getView().animate({ zoom: 9 }, { center: fromLonLat([-74.006,40.7127]) }, { duration: 2000 });
  }

  // display popup on click
  olmap.on('click', function (evt) {
    const element = document.getElementById('popup');
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

  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}>
      <button onClick={() => userAction()}>Move to location</button>
      <h2>Select openlayer tile styles</h2>
      {styles.map((style) => {
        return (
          <span style={{ padding:"10px"}}>
            <span>
              <button
                onClick={() => {
                  setStyle(style.link)
                  localStorage.setItem('styleLink', style.link)
                  console.log(style.link)
                  window.location.reload();
                }}
              >
                {style.title}
              </button>
            </span>
          </span>
        )
      })}
      <PopupElement showingPopup={showingPopup} />
    </div>
  );
}


const PopupElement = ({ showingPopup }) => {
  return(
    <div 
      id="popup"
      style={{ height:"100px", width:"100px", backgroundColor:"grey", display:`${showingPopup ? "block" : "none"}`, transform:"translateY(-20px)"}}
      onClick={() => {
        // do something else
      }}
    >
      <button onClick={() => {
        alert("hi")
      }}>hiiiiiiii</button>
    </div>
    
  )
}