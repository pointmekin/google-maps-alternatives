import React from "react";
import { BrowserRouter as  Router, Route, Switch } from "react-router-dom";
import Mapbox from "./pages/mapbox/Mapbox";
import OpenLayers from "./pages/openlayers/OpenLayers";

export default function App() {
  return(
    <Router>
      <Switch>
        <Route path="/mapbox" component={Mapbox} />
        <Route path="/openlayers" component={OpenLayers} />
      </Switch>
    </Router>
  )
}
