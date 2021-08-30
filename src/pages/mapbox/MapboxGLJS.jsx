import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoicG9pbnRtZWtpbiIsImEiOiJja3NtcHdhYTIwaGc5Mm9wZW1hazN4N2QwIn0.N8QRHcnhEWQAI2EfjmD9iQ';

export default function MapboxGLJS() {
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-70.9);
  const [lat] = useState(42.35);
  const [zoom] = useState(9);
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
  });

  return (
    <div className="gljs-container">
      <button
        onClick={() => {
          map.current.setLayoutProperty('country-label', 'text-field', [
            'get',
            `name_${"th"}`
          ]);
        }}
      >

      </button>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}