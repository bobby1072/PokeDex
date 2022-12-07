export interface IlowLevelRef {
  name: string;
  url: string;
}
export interface Iability {
  ability: IlowLevelRef;
  is_hidden: boolean;
  slot: number;
}
export interface IgameVersions {
  game_index: number;
  version: IlowLevelRef;
}
export interface Imoves {
  move: IlowLevelRef;
}
export interface Itype {
  slot: number;
  type: IlowLevelRef;
}
export interface Istats {
  base_stat: number;
  stat: IlowLevelRef;
}
export interface IstatsWithAvgAndTotal {
  stats: Istats[];
  average: number;
  total: number;
}
export interface IdamageRelations {
  double_damage_from: IlowLevelRef[];
  double_damage_to: IlowLevelRef[];
  half_damage_from: IlowLevelRef[];
  half_damage_to: IlowLevelRef[];
  no_damage_from: IlowLevelRef[];
  no_damage_to: IlowLevelRef[];
}
export interface IPokemonDamageRelations {
  double_damage_from: (string | undefined)[];
  double_damage_to: (string | undefined)[];
  half_damage_from: (string | undefined)[];
  half_damage_to: (string | undefined)[];
  no_damage_from?: (string | undefined)[];
  no_damage_to?: (string | undefined)[];
  four_times_damage_from: (string | undefined)[];
  four_times_damage_to: (string | undefined)[];
}
export interface IPokemonFullConstructorArgs {
  abilities: Iability[];
  base_experience: number;
  forms: [];
  game_indices: IgameVersions[];
  height: number;
  held_items: [];
  id: number;
  is_defualt: boolean;
  location_area_encounters: string;
  moves: Imoves[];
  name: string;
  order: number;
  past_types: [];
  species: object;
  sprites: ISprites;
  stats: Istats[];
  types: Itype[];
  weight: number;
}
export interface ISprites {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_female_shiny?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
}
