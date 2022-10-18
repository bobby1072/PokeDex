import httpClient from "../utils/httpClient";
import { IPokemonFullConstructorArgs } from "./Ipokemon";
class PokemonMinimal {
  PokemonName: string;
  PokemonURL: string;
  PokemonIndex: number;
  PokemonInfo?: IPokemonFullConstructorArgs;
  constructor(name: string, URI: string) {
    this.PokemonName = name;
    this.PokemonURL = URI;
    const urlArr = this.PokemonURL.split("/");
    this.PokemonIndex = Number(urlArr[urlArr.length - 2]);
  }
  async fullPokeReq() {
    const pokemonInfoRequest = await httpClient.get(this.PokemonURL);
    const pokemonInfo = await pokemonInfoRequest.data;
    this.PokemonInfo = pokemonInfo;
  }
}
export default PokemonMinimal;
