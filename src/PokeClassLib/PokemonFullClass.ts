import {
  Iability,
  IdamageRelations,
  IgameVersions,
  IlowLevelRef,
  Imoves,
  IPokemonDamageRelations,
  IPokemonFullConstructorArgs,
  Istats,
  IstatsWithAvgAndTotal,
} from "./Ipokemon";
import Type from "./PokemonTypeClass";
interface ITypeDamageScore {
  score: number;
  TypeName: string;
}
interface ITypeAndGroup {
  TypeName: string;
  Group: string;
}
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
  public DamageEffectives?: IPokemonDamageRelations | IdamageRelations;
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
    if (this.Types.length === 1) {
      await this.Types[0].getTypeInfoRequest();
    } else {
      for (const type of this.Types) {
        typeTaskList.push(type.getTypeInfoRequest());
      }
      await Promise.all(typeTaskList);
    }
  }
  public async workOutFinalTypeEffectives(): Promise<PokemonFull> {
    await this.getTypeEffectives();
    if (this.Types.length <= 1) {
      this.DamageEffectives = this.Types[0].DamageRelations;
      return this;
    } else if (this.Types.length === 2) {
      const damageMap: Map<string, number> = new Map<string, number>();
      const damageCatIndex: Map<number, string> = new Map<number, string>();
      damageCatIndex.set(2, "double_damage_from");
      damageCatIndex.set(4, "four_times_damage_from");
      damageCatIndex.set(2, "double_damage_to");
      damageCatIndex.set(4, "four_times_damage_to");
      damageCatIndex.set(1, "half_damage_from");
      damageCatIndex.set(-1, "half_damage_to");
      this.Types.forEach((element: Type) => {
        element.DamageRelations &&
          element.DamageRelations.double_damage_from.forEach(
            (ele: IlowLevelRef) => {
              const checkIfDamageAlreadyExists: number | undefined =
                damageMap.get(ele.name);
              if (!checkIfDamageAlreadyExists) damageMap.set(ele.name, 1 * 2);
              else damageMap.set(ele.name, checkIfDamageAlreadyExists * 2);
            }
          );
        element.DamageRelations &&
          element.DamageRelations.double_damage_to.forEach(
            (ele: IlowLevelRef) => {
              const checkIfDamageAlreadyExists: number | undefined =
                damageMap.get(ele.name);
              if (!checkIfDamageAlreadyExists) damageMap.set(ele.name, 1 / 2);
              else damageMap.set(ele.name, checkIfDamageAlreadyExists / 2);
            }
          );
      });
      const typeDamageScore: ITypeDamageScore[] = [];
      this.Types.forEach((element: Type) => {
        const damageRelTempObj: Object = element.DamageRelations || {};
        Object.values(damageRelTempObj)
          .flatMap((ele) => ele)
          .forEach((deepElement) => {
            const checkTypeExist: ITypeDamageScore | undefined =
              typeDamageScore.find((arrayEle) => {
                return arrayEle.TypeName === deepElement.name;
              });
            const damageMapRelation: number =
              damageMap.get(deepElement.name) || 0;
            if (!checkTypeExist) {
              typeDamageScore.push({
                TypeName: deepElement.name,
                score: damageMapRelation,
              });
            } else {
              const indexOfType: number =
                typeDamageScore.indexOf(checkTypeExist);
              typeDamageScore.splice(indexOfType, 1);
              typeDamageScore.push({
                TypeName: deepElement.name,
                score: checkTypeExist.score + damageMapRelation,
              });
            }
          });
      });
      const typeEffectiveWithGroups: (ITypeAndGroup | null)[] = typeDamageScore
        .map((element: ITypeDamageScore) => {
          const damageGroup: string | undefined = damageCatIndex.get(
            element.score
          );
          if (!damageGroup) return null;
          else {
            return { TypeName: element.TypeName, Group: damageGroup };
          }
        })
        .filter((ele) => {
          return ele !== null;
        });
      const buildGroup = (
        groupName: string,
        typeGroups: (ITypeAndGroup | null)[]
      ): (string | undefined)[] => {
        return (
          typeGroups
            .filter((element: ITypeAndGroup | null) => {
              return element?.Group === groupName;
            })
            .map((ele) => ele?.TypeName) || [undefined]
        );
      };
      const pokeDamageSet: IPokemonDamageRelations = {
        double_damage_from: buildGroup(
          "double_damage_from",
          typeEffectiveWithGroups
        ),
        double_damage_to: buildGroup(
          "double_damage_to",
          typeEffectiveWithGroups
        ),
        four_times_damage_from: buildGroup(
          "four_times_damage_from",
          typeEffectiveWithGroups
        ),
        four_times_damage_to: buildGroup(
          "four_times_damage_to",
          typeEffectiveWithGroups
        ),
        half_damage_from: buildGroup(
          "half_damage_from",
          typeEffectiveWithGroups
        ),
        half_damage_to: buildGroup("half_damage_to", typeEffectiveWithGroups),
      };
      this.DamageEffectives = pokeDamageSet;
    }
    return this;
  }
}
export default PokemonFull;
