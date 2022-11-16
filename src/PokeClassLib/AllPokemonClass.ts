import pokes from "./pokemon.json";
import PokemonMinimal from "./PokeMonMin";
class AllPoke {
  public AllPokemonArray: PokemonMinimal[];
  public constructor() {
    this.AllPokemonArray = pokes.results.map((element) => {
      return new PokemonMinimal(element.name, element.url);
    });
  }
  private isNumeric(value: string | number): boolean {
    if (typeof value === "string") {
      return /^-?\d+$/.test(value);
    } else if (typeof value === "number") {
      return true;
    } else {
      return false;
    }
  }
  public searchPokemon(searchTerm: string | number): PokemonMinimal[] | [] {
    let foundPokemonArr: PokemonMinimal[] | [] = [];
    if (typeof searchTerm === "string" && !this.isNumeric(searchTerm)) {
      foundPokemonArr = this.AllPokemonArray.filter((element) => {
        if (
          element.PokemonName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      }).map((element) => {
        return element;
      });
    } else if (this.isNumeric(searchTerm)) {
      const foundIndex: PokemonMinimal | undefined = this.AllPokemonArray.find(
        (element) => Number(searchTerm) === element.PokemonIndex
      );
      foundIndex instanceof PokemonMinimal && (foundPokemonArr = [foundIndex]);
    }
    return foundPokemonArr;
  }
}
export default AllPoke;
