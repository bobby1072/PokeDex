import {
  Iability,
  IFrontShinyAndDefault,
  IgameVersions,
  IKilosAndGrams,
  IMetersAndCentiMeters,
  Imoves,
  IPokemonFullConstructorArgs,
  ISprites,
  Istats,
  IstatsWithAvgAndTotal,
} from "./Ipokemon";
import Type from "./PokemonTypeClass";
class PokemonFull {
  public readonly Id: number;
  public readonly PokemonName: string;
  public readonly BaseXP: number;
  public readonly SpriteImageUrl: IFrontShinyAndDefault;
  public readonly Height: IMetersAndCentiMeters;
  public readonly Weight: IKilosAndGrams;
  public readonly Abilties: Iability[];
  public readonly GameVersions: IgameVersions[];
  public readonly Moves: Imoves[];
  public readonly Types: Type[];
  public readonly Stats: IstatsWithAvgAndTotal;
  private workOutHeightInCentiMeters(height: number): IMetersAndCentiMeters {
    const cmHeight = height / 10;
    let ms = 0;
    if (cmHeight >= 1) ms = Math.floor(cmHeight);
    return {
      meters: ms,
      centiMeters: Math.floor((cmHeight - Math.floor(cmHeight)) * 100),
    };
  }
  private workOutWeightInKilosAndGrams(weight: number): IKilosAndGrams {
    const gramWeight = weight * 100;
    let kilos = 0;
    if (gramWeight >= 1000) kilos = Math.floor(weight / 10);
    return {
      kilos: kilos,
      grams: gramWeight % (kilos * 1000),
    };
  }
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
  private getSpriteUrls(sprites: ISprites): IFrontShinyAndDefault {
    const spriteObj: IFrontShinyAndDefault = {};
    if (sprites.front_default) spriteObj.frontDefault = sprites.front_default;
    if (sprites.front_shiny) spriteObj.frontShiny = sprites.front_shiny;
    else if (!spriteObj.frontDefault) {
      const spriteArray = Object.values(sprites);
      spriteObj.frontDefault = spriteArray.find((ele) => ele);
    }
    return spriteObj;
  }
  public constructor(pokemonDetails: IPokemonFullConstructorArgs) {
    this.SpriteImageUrl = this.getSpriteUrls(pokemonDetails.sprites);
    this.Id = pokemonDetails.id;
    this.PokemonName = pokemonDetails.name;
    this.BaseXP = pokemonDetails.base_experience;
    this.Height = this.workOutHeightInCentiMeters(pokemonDetails.height);
    this.Weight = this.workOutWeightInKilosAndGrams(pokemonDetails.weight);
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
