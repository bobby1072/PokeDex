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
      <Table sx={{ minWidth: 350, maxWidth: 750, maxHeight: 200 }}>
        <TableHead>
          <TableRow>
            <TableCell>Stat name</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stat.stats.stats.map((element: Istats) => {
            return (
              <TableRow
                key={element.stat.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
            <TableCell align="right">{stat.stats.average}</TableCell>
          </TableRow>
          <TableRow
            key="Total"
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>
              <h4>Total</h4>
            </TableCell>
            <TableCell align="right">{stat.stats.total}</TableCell>
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
      await Pokemon.getTypeEffectives();
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
          <h3>
            Height: {Pokemon.Height.meters > 0 && `${Pokemon.Height.meters}m `}
            {Pokemon.Height.centiMeters > 0 &&
              `${Pokemon.Height.centiMeters}cm`}
          </h3>
          <h3>
            Weight: {Pokemon.Weight.kilos > 0 && `${Pokemon.Weight.kilos}kg `}
            {Pokemon.Weight.grams > 0 && `${Pokemon.Weight.grams}g`}
          </h3>
          <StatTable stats={Pokemon.Stats} />
        </div>
      </div>
    </div>
  );
}
export default PokemonInfo;
