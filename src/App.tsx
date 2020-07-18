import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BattleScene from "./components/scenes/battle";

function App() {
  return (
    <BrowserRouter>
      <Route path="*" component={BattleScene} />
    </BrowserRouter>
  );
}

export default App;
