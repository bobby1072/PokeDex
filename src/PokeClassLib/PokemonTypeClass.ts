import httpClient from "../utils/httpClient";
import { Itype, IdamageRelations } from "./Ipokemon";
class Type {
  TypeName: string;
  TypeURL: string;
  DamageRelations?: IdamageRelations;
  constructor(type: Itype) {
    this.TypeName = type.type.name;
    this.TypeURL = type.type.url;
  }
  async getTypeInfoRequest() {
    const typeInfoRequest = await httpClient.get(this.TypeURL);
    const typeInfoResp = await typeInfoRequest.data;
    this.DamageRelations = typeInfoResp.damage_relations;
  }
}
export default Type;
