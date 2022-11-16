import httpClient from "../Common/utils/httpClient";
import { Itype, IdamageRelations } from "./Ipokemon";
class Type {
  public TypeName: string;
  public TypeURL: string;
  public DamageRelations?: IdamageRelations;
  public constructor(type: Itype) {
    this.TypeName = type.type.name;
    this.TypeURL = type.type.url;
  }
  public async getTypeInfoRequest(): Promise<void> {
    const typeInfoRequest = await httpClient.get(this.TypeURL);
    const typeInfoResp = await typeInfoRequest.data;
    this.DamageRelations = typeInfoResp.damage_relations;
  }
}
export default Type;
