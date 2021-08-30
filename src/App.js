import React from "react";
import { BrowserRouter as  Router, Route, Switch } from "react-router-dom";
import Mapbox from "./pages/mapbox/Mapbox";
import MapboxGLJS from "./pages/mapbox/MapboxGLJS";
import OpenLayers from "./pages/openlayers/OpenLayers";

export default function App() {
  const routes = [
    {
      path: 'mapbox',
      title: 'mapbox (ReactMapGl)'
    },
    {
      path: 'mapboxgljs',
      title: 'mapbox (mapboxgl)'
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
        <Route path="/mapboxgljs" component={MapboxGLJS} />
        <Route path="/openlayers" component={OpenLayers} />
        <Route path="/openlayers" component={OpenLayers} />
      </Switch>
    </Router>
  )
}
