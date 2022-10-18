import {
  Iability,
  IgameVersions,
  Imoves,
  IPokemonFullConstructorArgs,
  Istats,
} from "./Ipokemon";
import Type from "./PokemonTypeClass";
class PokemonFull {
  Id: number;
  PokemonName: string;
  BaseXP: number;
  Height: number;
  Weight: number;
  Abilties: Iability[];
  GameVersions: IgameVersions[];
  Moves: Imoves[];
  Types: Type[];
  Stats: Istats[];
  constructor(pokemonDetails: IPokemonFullConstructorArgs) {
    this.Id = pokemonDetails.id;
    this.PokemonName = pokemonDetails.name;
    this.BaseXP = pokemonDetails.base_experience;
    this.Height = pokemonDetails.height;
    this.Weight = pokemonDetails.weight;
    this.Abilties = pokemonDetails.abilities;
    this.GameVersions = pokemonDetails.game_indices;
    this.Moves = pokemonDetails.moves;
    this.Types = pokemonDetails.types.map((element) => {
      return new Type(element);
    });
    this.Stats = pokemonDetails.stats;
  }
  async getTypeEffectives() {
    for (const type of this.Types) {
      await type.getTypeInfoRequest();
    }
  }
}
export default PokemonFull;
