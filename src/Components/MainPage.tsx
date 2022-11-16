import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import AllPoke from "../PokeClassLib/AllPokemonClass";
import PokemonMinimal from "../PokeClassLib/PokeMonMin";
import MapPokemonMinimalToBoxes from "./PokemonMinimalDisplayBox";
import PokemonFull from "../PokeClassLib/PokemonFullClass";
import PokemonInfo from "./PokemonDisplayPage";
import FSTextField from "../Common/TextBoxStyle";
const title = require("../images/title.png");
function MainPage(): JSX.Element {
  const allPokes = new AllPoke();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [foundPokes, setFoundPokes] = React.useState<PokemonMinimal[]>();
  const [chosePokemon, setChoosePokemon] = React.useState<
    PokemonFull | boolean
  >(false);
  const [searchButtonLoading, setSearchButtonLoading] =
    React.useState<boolean>(false);
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
            <FSTextField
              sx={{ mr: 2, width: 150 }}
              label="Pokemon name or index"
              onChange={(search): void => {
                setChoosePokemon(false);
                setSearchButtonLoading(false);
                setSearchTerm(search.target.value);
              }}
            />
            <LoadingButton
              sx={{ width: 100 }}
              loading={searchButtonLoading}
              variant="contained"
              onClick={async (): Promise<void> => {
                setSearchButtonLoading(true);
                setChoosePokemon(false);
                if (searchTerm) {
                  setFoundPokes(allPokes.searchPokemon(searchTerm));
                }
                setSearchButtonLoading(false);
              }}
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
      {chosePokemon instanceof PokemonFull && (
        <PokemonInfo
          PokemonObj={chosePokemon}
          goBack={() => {
            setChoosePokemon(false);
          }}
        />
      )}
    </div>
  );
}
export default MainPage;
