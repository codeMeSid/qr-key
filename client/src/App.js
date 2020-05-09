import React from "react";

import { Switch, Route } from "react-router-dom";
import EncryptPanel from "./EncryptPanel";
import DecryptPanel from "./DecryptPanel";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={EncryptPanel} />
      <Route exact path="/:id" component={DecryptPanel} />
    </Switch>
  );
}

export default App;
