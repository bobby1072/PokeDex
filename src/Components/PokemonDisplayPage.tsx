import PokemonFull from "../PokeClassLib/PokemonFullClass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./PokemonDisplayType.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { Istats, IstatsWithAvgAndTotal } from "../PokeClassLib/Ipokemon";
interface IPokemonInfoPropsArgs {
  PokemonObj: PokemonFull;
  goBack: () => void;
}
interface ITableArgs {
  stats: IstatsWithAvgAndTotal;
}
function StatTable(stat: ITableArgs): JSX.Element {
  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: 350, maxWidth: 750, mt: 1, maxHeight: 200 }}
    >
      <Table
        sx={{ minWidth: 350, maxWidth: 750, maxHeight: 200 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Stat name</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stat.stats.stats.map((element: Istats) => {
            return (
              <TableRow key={element.stat.name} sx={{ color: "#ba000d" }}>
                <TableCell>{element.stat.name}</TableCell>
                <TableCell align="right">{element.base_stat}</TableCell>
              </TableRow>
            );
          })}
          <TableRow
            key="Average"
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>
              <h4>Average</h4>
            </TableCell>
            <TableCell align="right">
              <h4>{stat.stats.average}</h4>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <h4>Total</h4>
            </TableCell>
            <TableCell align="right">
              <h4>{stat.stats.total}</h4>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function PokemonInfo(props: IPokemonInfoPropsArgs): JSX.Element {
  const Pokemon: PokemonFull = props.PokemonObj;
  useEffect(() => {
    const getTypes = async () => {
      await Pokemon.workOutFinalTypeEffectives();
    };
    getTypes();
  }, [Pokemon]);
  return (
    <div className="topLevelDiv">
      <div className="DisplayAllPokesDiv">
        <ArrowBackIcon onClick={props.goBack} fontSize="large" />
        <div className="pokemonDisplayPageDiv">
          <h1>Name: {Pokemon.PokemonName}</h1>
          <h2>Id: {Pokemon.Id}</h2>
          <img src={Pokemon.SpriteImageUrl} alt="PokemonImage" />
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
          <StatTable stats={Pokemon.Stats} />
        </div>
      </div>
    </div>
  );
}
export default PokemonInfo;
