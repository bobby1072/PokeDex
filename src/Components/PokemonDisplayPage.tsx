import PokemonFull from "../PokeClassLib/PokemonFullClass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./PokemonDisplayType.css";
import { useEffect, useState } from "react";
interface IPokemonInfoPropsArgs {
  PokemonObj: PokemonFull;
  goBack: () => void;
}
function PokemonInfo(props: IPokemonInfoPropsArgs): JSX.Element {
  const Pokemon: PokemonFull = props.PokemonObj;
  const [typeReqStatus, setTypeReqStatus] = useState<boolean>(false);
  useEffect(() => {
    const getTypes = async () => {
      await Pokemon.getTypeEffectives();
    };
    getTypes();
    setTypeReqStatus(true);
  }, [Pokemon]);
  return (
    <div className="topLevelDiv">
      <div className="DisplayAllPokesDiv">
        <ArrowBackIcon onClick={props.goBack} fontSize="large" />
        <div className="pokemonDisplayPageDiv">
          <h1>Name: {Pokemon.PokemonName}</h1>
          <h2>Id: {Pokemon.Id}</h2>
          <div className="topLevelDiv">
            {Pokemon.Types.map((element) => {
              return (
                <p
                  style={{ margin: 1.5 }}
                  className={`type-icon type-${element.TypeName}`}
                >
                  {element.TypeName}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PokemonInfo;
