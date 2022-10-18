import httpClient from "../Common/utils/httpClient";
import { IPokemonFullConstructorArgs } from "./Ipokemon";
class PokemonMinimal {
  public PokemonName: string;
  public PokemonURL: string;
  public PokemonIndex: number;
  public PokemonInfo?: IPokemonFullConstructorArgs;
  public constructor(name: string, URI: string) {
    this.PokemonName = name;
    this.PokemonURL = URI;
    const urlArr = this.PokemonURL.split("/");
    this.PokemonIndex = Number(urlArr[urlArr.length - 2]);
  }
  public async fullPokeReq() {
    const pokemonInfoRequest = await httpClient.get(this.PokemonURL);
    const pokemonInfo = await pokemonInfoRequest.data;
    this.PokemonInfo = pokemonInfo;
  }
}
export default PokemonMinimal;
