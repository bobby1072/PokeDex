import httpClient from "../utils/httpClient";
import { IPokemonFullConstructorArgs } from "./Ipokemon";
class PokemonMinimal {
  PokemonName: string;
  PokemonURL: string;
  PokemonInfo?: IPokemonFullConstructorArgs;
  constructor(name: string, URI: string) {
    this.PokemonName = name;
    this.PokemonURL = URI;
  }
  async fullPokeReq() {
    const pokemonInfoRequest = await httpClient.get(this.PokemonURL);
    const pokemonInfo = await pokemonInfoRequest.data;
    this.PokemonInfo = pokemonInfo;
  }
}
export default PokemonMinimal;
