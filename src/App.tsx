import React from "react";
import MainPage from "./Components/MainPage";
function App(): JSX.Element {
  React.useEffect(() => {
    document.title = "Pokedex";
  });
  return (
    <div>
      <MainPage />
    </div>
  );
}

export default App;
