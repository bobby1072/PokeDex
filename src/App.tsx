import { Box, Button } from "@mui/material";
import React from "react";
import FSTextField from "./Common/TextBoxStyle";
import AllPoke from "./PokeClassLib/AllPokemonClass";
import PokemonFull from "./PokeClassLib/PokemonFullClass";
const title = require("./images/title.png");
function App() {
  React.useEffect(() => {
    document.title = "Pokedex";
  });
  const buttonPress = async () => {
    const allPokes = new AllPoke();
    await allPokes.AllPokemonArray[151].fullPokeReq();
    const myPoke =
      allPokes.AllPokemonArray[151].PokemonInfo &&
      new PokemonFull(allPokes.AllPokemonArray[151].PokemonInfo);
    console.log(myPoke);
  };
  return (
    <div className="topLevelDiv">
      <div className="MainBox">
        <img src={title} alt="title" />
        <Box
          component="form"
          sx={{ display: "flex", mb: 1 }}
          noValidate
          autoComplete="off"
          className="centerDiv--DictVersion"
        >
          <FSTextField
            sx={{ mr: 2, width: 350 }}
            id="reddit-input"
            label="Pokemon name"
            variant="filled"
          />
          <Button onClick={buttonPress}>Search</Button>
        </Box>
      </div>
    </div>
  );
}

export default App;
