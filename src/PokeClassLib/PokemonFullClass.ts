import {
  Iability,
  IgameVersions,
  Imoves,
  IPokemonFullConstructorArgs,
  Istats,
} from "./Ipokemon";
import Type from "./PokemonTypeClass";
class PokemonFull {
  public Id: number;
  public PokemonName: string;
  public BaseXP: number;
  public Height: number;
  public Weight: number;
  public Abilties: Iability[];
  public GameVersions: IgameVersions[];
  public Moves: Imoves[];
  public Types: Type[];
  public Stats: Istats[];
  public constructor(pokemonDetails: IPokemonFullConstructorArgs) {
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
  public async getTypeEffectives(): Promise<void> {
    const typeTaskList: Promise<void>[] = [];
    for (const type of this.Types) {
      typeTaskList.push(type.getTypeInfoRequest());
    }
    Promise.all(typeTaskList);
  }
}
export default PokemonFull;
