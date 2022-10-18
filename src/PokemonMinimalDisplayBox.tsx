import { Box, ThemeProvider, createTheme } from "@mui/system";
import PokemonMinimal from "./PokeClassLib/PokeMonMin";

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
}
interface IPokemonMinimalArrayProps {
  PokemonObjs: PokemonMinimal[];
}
function PokemonMinimalDisplayBox(props: IPokemonMinimalDisplayBoxProps) {
  return (
    <div className="projects">
      <div className="centerDiv--viewCatches">
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
const MapPokemonMinimalToBoxes = (props: IPokemonMinimalArrayProps) => {
  const allPokesMin = props.PokemonObjs;
  return (
    <div>
      {allPokesMin.map((Element) => {
        return <PokemonMinimalDisplayBox PokemonOBJ={Element} />;
      })}
    </div>
  );
};
export default MapPokemonMinimalToBoxes;
