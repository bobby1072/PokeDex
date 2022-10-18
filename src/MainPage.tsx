import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import AllPoke from "./PokeClassLib/AllPokemonClass";
import PokemonMinimal from "./PokeClassLib/PokeMonMin";
import MapPokemonMinimalToBoxes from "./PokemonMinimalDisplayBox";
import PokemonFull from "./PokeClassLib/PokemonFullClass";
const title = require("./images/title.png");
function MainPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [foundPokes, setFoundPokes] = React.useState<PokemonMinimal[]>();
  const [chosePokemon, setChoosePokemon] = React.useState<
    PokemonFull | boolean
  >(false);
  const [searchButtonLoading, setSearchButtonLoading] = React.useState(false);
  const searchButtonPress = async () => {
    setChoosePokemon(false);
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
          <Box
            component="img"
            sx={{
              height: 233,
              width: 550,
            }}
            src={title}
            alt="title"
          />
          <Box
            component="form"
            sx={{ display: "flex", mb: 1, mt: 4 }}
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
                setChoosePokemon(false);
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
      {foundPokes && !chosePokemon && (
        <MapPokemonMinimalToBoxes
          PokemonObjs={foundPokes}
          goBackOrSetNewFish={(args) => {
            setChoosePokemon(args);
          }}
        />
      )}
    </div>
  );
}
export default MainPage;
