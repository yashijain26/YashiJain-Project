import React from 'react'
import Contact from './screens/Contact'
import Home from './screens/Home'
import Notification from './screens/Notification'
import Hospitals from './screens/Hospitals'
import Medical from './screens/Medical'
import Comparision from './screens/Comparision'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/notification" component={Notification} />
          <Route path="/hospitals" component={Hospitals} />
          <Route path="/medical" component={Medical} />
          <Route path="/comparision" component={Comparision} />
        </Switch>
      </Router>
    </>
  );
}

export default App
