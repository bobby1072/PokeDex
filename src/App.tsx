import React from "react";
import MainPage from "./MainPage";
function App() {
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
