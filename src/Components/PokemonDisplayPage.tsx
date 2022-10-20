import PokemonFull from "../PokeClassLib/PokemonFullClass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./PokemonDisplayType.css";
import { Stack } from "@mui/material";
interface IPokemonInfoPropsArgs {
  PokemonObj: PokemonFull;
  goBack: () => void;
}
function PokemonInfo(props: IPokemonInfoPropsArgs): JSX.Element {
  const Pokemon: PokemonFull = props.PokemonObj;
  return (
    <div className="topLevelDiv">
      <div className="DisplayAllPokesDiv">
        <ArrowBackIcon onClick={props.goBack} fontSize="large" />
        <div className="topLevelDiv">
          <h1>{Pokemon.PokemonName}</h1>
        </div>
        <div className="topLevelDiv">
          {Pokemon.Types.map((element) => {
            return (
              <div className="typeSpacing">
                <p className={`type-icon type-${element.TypeName}`}>
                  {element.TypeName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default PokemonInfo;
