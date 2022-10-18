import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import AllPoke from "./PokeClassLib/AllPokemonClass";
import PokemonMinimal from "./PokeClassLib/PokeMonMin";
import MapPokemonMinimalToBoxes from "./PokemonMinimalDisplayBox";
const title = require("./images/title.png");
function MainPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [foundPokes, setFoundPokes] = React.useState<PokemonMinimal[]>();
  const [searchButtonLoading, setSearchButtonLoading] = React.useState(false);
  const searchButtonPress = async () => {
    setSearchButtonLoading(true);
    if (searchTerm) {
      const allPokes = new AllPoke();
      setFoundPokes(allPokes.searchPokemon(searchTerm));
    }
    setSearchButtonLoading(false);
    /*
      await myPokes[555].fullPokeReq();
      const myPoke =
        allPokes.AllPokemonArray[555].PokemonInfo &&
        new PokemonFull(allPokes.AllPokemonArray[555].PokemonInfo);
      await myPoke?.getTypeEffectives();
      console.log(myPoke);
      */
  };
  return (
    <div>
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
            <TextField
              style={{
                backgroundColor: "white",
              }}
              sx={{ mr: 2 }}
              value={searchTerm}
              id="outlined-basic"
              label="Pokemon name"
              variant="outlined"
              onChange={(search) => {
                setSearchButtonLoading(false);
                setSearchTerm(search.target.value);
              }}
              InputProps={{ style: { color: "red" } }}
            />
            <LoadingButton
              sx={{ width: 100 }}
              loading={searchButtonLoading}
              variant="contained"
              onClick={searchButtonPress}
            >
              Search
            </LoadingButton>
          </Box>
        </div>
      </div>
      {foundPokes && <MapPokemonMinimalToBoxes PokemonObjs={foundPokes} />}
    </div>
  );
}
export default MainPage;
