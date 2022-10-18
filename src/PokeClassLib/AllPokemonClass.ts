import pokes from "./pokemon.json";
import PokemonMinimal from "./PokeMonMin";
class AllPoke {
  AllPokemonArray: PokemonMinimal[];
  constructor() {
    this.AllPokemonArray = pokes.results.map((element) => {
      return new PokemonMinimal(element.name, element.url);
    });
  }
}
export default AllPoke;
