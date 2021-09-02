import React from "react";
import { BrowserRouter as  Router, Route, Switch } from "react-router-dom";
import Mapbox from "./pages/mapbox/Mapbox";
import Mapbox2 from "./pages/mapbox/Mapbox2";
import Mapbox3 from "./pages/mapbox/Mapbox3";
import MapboxGLJS from "./pages/mapbox/MapboxGLJS";
import MapboxGLJS2 from "./pages/mapbox/MapboxGLJS2";
import OpenLayers from "./pages/openlayers/OpenLayers";

export default function App() {
  const routes = [
    {
      path: 'mapbox',
      title: 'mapbox (ReactMapGl)'
    },
    {
      path: 'mapbox2',
      title: 'mapbox2 (ReactMapGl)'
    },
    {
      path: 'mapbox3',
      title: 'mapbox3 (ReactMapGl)'
    },
    {
      path: 'mapboxgljs',
      title: 'mapbox (mapboxgl)'
    },
    {
      path: 'mapboxgljs2',
      title: 'mapbox2 (mapboxgl)'
    },
    {
      path: 'openlayers',
      title: 'openlayers (default)'
    }
  ]

  return(
    <Router>
      {routes.map((route) => {
        return (
          <span style={{ padding:"10px"}}>
            <a href={route.path}>{route.title}</a>
          </span>
        )
      })}
      <Switch>
        <Route path="/mapbox" component={Mapbox} />
        <Route path="/mapbox2" component={Mapbox2} />
        <Route path="/mapbox3" component={Mapbox3} />
        <Route path="/mapboxgljs" component={MapboxGLJS} />
        <Route path="/mapboxgljs2" component={MapboxGLJS2} />
        <Route path="/openlayers" component={OpenLayers} />
        <Route path="/openlayers" component={OpenLayers} />
      </Switch>
    </Router>
  )
}
