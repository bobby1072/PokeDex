import PokemonFull from "../PokeClassLib/PokemonFullClass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface IPokemonInfoPropsArgs {
  PokemonObj: PokemonFull;
  goBack: () => void;
}
function PokemonInfo(props: IPokemonInfoPropsArgs): JSX.Element {
  return (
    <div className="topLevelDiv">
      <div className="DisplayAllPokesDiv">
        <ArrowBackIcon onClick={props.goBack} fontSize="large" />
        <div className="topLevelDiv">
          <p>boi</p>
        </div>
      </div>
    </div>
  );
}
export default PokemonInfo;
