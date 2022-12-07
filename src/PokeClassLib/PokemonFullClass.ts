import {
  Iability,
  IgameVersions,
  Imoves,
  IPokemonFullConstructorArgs,
  Istats,
  IstatsWithAvgAndTotal,
} from "./Ipokemon";
import Type from "./PokemonTypeClass";
class PokemonFull {
  public readonly Id: number;
  public readonly PokemonName: string;
  public readonly BaseXP: number;
  public readonly SpriteImageUrl: string;
  public readonly Height: number;
  public readonly Weight: number;
  public readonly Abilties: Iability[];
  public readonly GameVersions: IgameVersions[];
  public readonly Moves: Imoves[];
  public readonly Types: Type[];
  public readonly Stats: IstatsWithAvgAndTotal;
  private getStatAverage(stats: Istats[]): number {
    let statAvg = 0;
    stats.forEach((element: Istats) => {
      statAvg = statAvg + element.base_stat;
    });
    statAvg = Math.round((statAvg / stats.length) * 100) / 100;
    return statAvg;
  }
  private getStatTotal(allStats: Istats[]): number {
    let statTotal = 0;
    allStats.forEach((element: Istats) => {
      statTotal = statTotal + element.base_stat;
    });
    return statTotal;
  }
  private getStatTotalAndAvg(allStats: Istats[]): IstatsWithAvgAndTotal {
    return {
      stats: allStats,
      total: this.getStatTotal(allStats),
      average: this.getStatAverage(allStats),
    };
  }
  public constructor(pokemonDetails: IPokemonFullConstructorArgs) {
    this.SpriteImageUrl = pokemonDetails.sprites.front_default;
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
    this.Stats = this.getStatTotalAndAvg(pokemonDetails.stats);
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
