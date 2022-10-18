interface IlowLevelRef {
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
  base_stat: string;
  stat: IlowLevelRef;
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
  sprites: object;
  stats: Istats[];
  types: Itype[];
  weight: number;
}
