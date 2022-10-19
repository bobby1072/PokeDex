import pokes from "./pokemon.json";
import PokemonMinimal from "./PokeMonMin";
class AllPoke {
  public AllPokemonArray: PokemonMinimal[];
  public constructor() {
    this.AllPokemonArray = pokes.results.map((element) => {
      return new PokemonMinimal(element.name, element.url);
    });
  }
  public searchPokemon(searchTerm: string): PokemonMinimal[] | [] {
    const foundPokemonArr: PokemonMinimal[] | [] = this.AllPokemonArray.filter(
      (element) => {
        if (
          element.PokemonName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      }
    ).map((element) => {
      return element;
    });
    return foundPokemonArr;
  }
}
export default AllPoke;
