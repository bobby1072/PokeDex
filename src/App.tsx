import React from "react";
import MainPage from "./Components/MainPage";
import { HashRouter, Route, Routes } from "react-router-dom";
function App(): JSX.Element {
  React.useEffect(() => {
    document.title = "Pokedex";
  });
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainPage />} path="/" />
      </Routes>
    </HashRouter>
  );
}

export default App;
