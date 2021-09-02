import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';


const Mapbox2 = () => {

  const AwesomeMap = new ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  });

  const changeMapLanguage = (map) => {
      map.getStyle().layers.forEach((layer) => {
          if (layer.id.endsWith('-label')) {
              map.setLayoutProperty(layer.id, 'text-field', [
                  'coalesce',
                  ['get', 'name_zh-Hant'],
                  ['get', 'name'],
              ]);
          }
      });
  };


  return (
    <AwesomeMap
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{ width: '100vw', height: '100vh' }}
        onStyleLoad={changeMapLanguage}
    >
        
    </AwesomeMap>
  )
}

export default Mapbox2;