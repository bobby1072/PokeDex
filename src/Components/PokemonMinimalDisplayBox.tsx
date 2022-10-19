import { Box, ThemeProvider, createTheme } from "@mui/system";
import PokemonFull from "../PokeClassLib/PokemonFullClass";
import PokemonMinimal from "../PokeClassLib/PokeMonMin";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#009688",
    },
  },
});
interface IPokemonMinimalDisplayBoxProps {
  PokemonOBJ: PokemonMinimal;
  goBackOrSetNewFish: (args: PokemonFull | boolean) => void;
}
interface IPokemonMinimalArrayProps {
  PokemonObjs: PokemonMinimal[];
  goBackOrSetNewFish: (args: PokemonFull | boolean) => void;
}
function PokemonMinimalDisplayBox(
  props: IPokemonMinimalDisplayBoxProps
): JSX.Element {
  return (
    <div className="projects">
      <div
        className="centerDiv--viewCatches"
        onClick={async () => {
          await props.PokemonOBJ.fullPokeReq();
          props.PokemonOBJ.PokemonInfo &&
            props.goBackOrSetNewFish(
              new PokemonFull(props.PokemonOBJ.PokemonInfo)
            );
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 300,
            }}
          >
            <Box sx={{ color: "text.secondary" }}>
              {props.PokemonOBJ.PokemonIndex}
            </Box>
            <Box
              sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}
            >
              {props.PokemonOBJ.PokemonName}
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    </div>
  );
}
const MapPokemonMinimalToBoxes = (
  props: IPokemonMinimalArrayProps
): JSX.Element => {
  const allPokesMin = props.PokemonObjs;
  return (
    <div className="topLevelDiv">
      <div className="DisplayAllPokesDiv">
        {allPokesMin.map((Element) => {
          return (
            <PokemonMinimalDisplayBox
              PokemonOBJ={Element}
              goBackOrSetNewFish={props.goBackOrSetNewFish}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MapPokemonMinimalToBoxes;
