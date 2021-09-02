import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom'
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoicG9pbnRtZWtpbiIsImEiOiJja3NtcHdhYTIwaGc5Mm9wZW1hazN4N2QwIn0.N8QRHcnhEWQAI2EfjmD9iQ";

export default function MapboxGLJS2() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-77.038659);
  const [lat] = useState(38.931567);
  const [zoom] = useState(9);

  const geojson =  {
    // This GeoJSON contains features that include an "icon"
    // property. The value of the "icon" property corresponds
    // to an image in the Mapbox Streets style's sprite.
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
            icon: "warning-sm",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.038659, 38.931567],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
            icon: "theatre-15",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.003168, 38.894651],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
            icon: "bar-15",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.090372, 38.881189],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
            icon: "art-gallery-15",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.111561, 38.882342],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
            icon: "bicycle-15",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.052477, 38.943951],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
            icon: "rocket-15",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.043444, 38.909664],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
            icon: "music-15",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.031706, 38.914581],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
            icon: "music-15",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.020945, 38.878241],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
            icon: "music-15",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [-77.007481, 38.876516],
          },
        },
      ],
    },
  }

  useEffect(() => {

    
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/pointmekin/ckt1bmjq70urh18pbyk3c9rhn",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addSource("places", {...geojson});
      // Add a layer showing the places.
      map.current.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "{icon}",
          "icon-allow-overlap": true,
        },
      });

      // for (const marker of geojson.data.features) {
      //   // Create a DOM element for each marker.
      //   const el = document.createElement('div');
      //   const width = marker.properties.iconSize[0];
      //   const height = marker.properties.iconSize[1];
      //   el.className = 'marker';
      //   el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
      //   el.style.width = `${width}px`;
      //   el.style.height = `${height}px`;
      //   el.style.backgroundSize = '100%';
          
      //   el.addEventListener('click', () => {
      //   // window.alert(marker.properties.message);
      //   });
          
      //   // Add markers to the map.
      //   new mapboxgl.Marker(el)
      //   .setLngLat(marker.geometry.coordinates)
      //   .addTo(map.current);
      //   }

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.current.on("click", "places", (e) => {
        setShowingPopup(true)
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const el = <PopupElement showingPopup={true} map={map.current} />
        const placeholder = document.createElement('div');
        ReactDOM.render(el, placeholder);

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          // .setHTML(description)
          .setDOMContent(placeholder)
          .addTo(map.current);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.current.on("mouseenter", "places", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.current.on("mouseleave", "places", () => {
        map.current.getCanvas().style.cursor = "";
      });
    });
  });

  const [showingPopup, setShowingPopup] = useState(false);
  const mapRef = useRef(null)

  return (
    <div className="gljs-container">
      <button
        onClick={() => {
          map.current.setLayoutProperty("country-label", "text-field", [
            "get",
            `name_${"th"}`,
          ]);
        }}
      ></button>
      <div ref={mapContainer} id="map" className="map-container" />
    </div>
  );
}

const PopupElement = ({ showingPopup, map }) => {
  return (
    <div
      id="popup"
      style={{
        width: "100px",
        backgroundColor: "grey",
        display: `${showingPopup ? "block" : "none"}`,
        transform: "translateY(-20px)",
      }}
      onClick={() => {
        // do something else
      }}
    >
      <button
        onClick={() => {
          const popup = document.getElementsByClassName('mapboxgl-popup');
          if ( popup.length ) {
              popup[0].remove();
          }
          alert("hi");
        }}
      >
        hiiiiiiii
      </button>
    </div>
  );
};
