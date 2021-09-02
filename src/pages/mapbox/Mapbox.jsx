import React, { useState, useEffect, useRef } from 'react'
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "../../data/skateboard-parks.json";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Mapbox() {
  const mapContainer = useRef(null);
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });
  const [selectedPark, setSelectedPark] = useState(null);

  const REACT_APP_MAPBOX_TOKEN = "pk.eyJ1IjoicG9pbnRtZWtpbiIsImEiOiJja3NtcHNqbWEwMTZ5MnVsdzhkZ2Rlemx3In0.IFgugxbVSiUrLl4UtfRdWA"

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);
    // console.log(mapContainer.current.getMap())
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const [style, setStyle] = useState(undefined)

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle= {style}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        ref={mapContainer}
      >
        {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
          >
            <div style={{backgroundColor:"grey"}}>
              <h2 >{selectedPark.properties.NAME}</h2>
              <p >{selectedPark.properties.DESCRIPTIO}</p>
              <button
                type="button"
                tabIndex="1"
                onClick={() => {
                  setSelectedPark(null);
                  setStyle("mapbox://styles/pointmekin/ckt1w5nzp1eol18pbvfmyjjv7")
                  // console.log(ReactMapGL.getMap())
                }}
              >Alert hi</button>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}