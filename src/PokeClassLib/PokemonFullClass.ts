import {
  Iability,
  IgameVersions,
  Imoves,
  IPokemonFullConstructorArgs,
  Istats,
  Itype,
} from "./Ipokemon";
class PokemonFull {
  Id: number;
  PokemonName: string;
  BaseXP: number;
  Height: number;
  Weight: number;
  Abilties: Iability[];
  GameVersions: IgameVersions[];
  Moves: Imoves[];
  Types: Itype[];
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
    this.Types = pokemonDetails.types;
    this.Stats = pokemonDetails.stats;
  }
}
export default PokemonFull;
