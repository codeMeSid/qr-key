import React from "react";

import { Switch, Route } from "react-router-dom";
import EncryptPanel from "./EncryptPanel";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={EncryptPanel} />
    </Switch>
  );
}

export default App;
