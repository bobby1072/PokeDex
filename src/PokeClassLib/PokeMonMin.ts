class PokemonMinimal {
  PokemonName: string;
  PokemonURL: string;
  constructor(name: string, URI: string) {
    this.PokemonName = name;
    this.PokemonURL = URI;
  }
  async fullPokeReq() {}
}
export default PokemonMinimal;
