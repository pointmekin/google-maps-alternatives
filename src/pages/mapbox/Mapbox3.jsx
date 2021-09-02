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
  const MAPBOX_STYLE = "mapbox://styles/pointmekin/ckt1bmjq70urh18pbyk3c9rhn";


  const [myStyle, setMyStyle] = useState(MAPBOX_STYLE);
  const onLoad = () => {
    fetch(
      `https://api.mapbox.com/styles/v1/${MAPBOX_STYLE.replace(
        "mapbox://styles/",
        ""
      )}?access_token=${REACT_APP_MAPBOX_TOKEN}`
    )
      .then(res => res.json())
      .then(res => {
        /**
         * Add the entire style to state, plus add the geojson
         * source for use later on (inline source doesn't work)
         * with react-map-gl, requires a string.
         */
         setMyStyle({
          ...res,
          sources: {
            ...res.sources,
          }
        });
      });
  };

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
        mapStyle= {myStyle}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        onLoad={onLoad}
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