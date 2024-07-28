import { baseReturnType } from "src/abstract/base.types";
import { CollectorProfile } from "../collector_profile.entity";

export class getAllCollectorsReturnDto extends baseReturnType {
  collectors: CollectorProfile[];
}
export class getCollectorProfileReturnDto extends baseReturnType {
  collector: CollectorProfile;
}
export class updateCollectorProfileReturnDto extends getCollectorProfileReturnDto {}
export class deleteCollectorProfileReturnDto extends baseReturnType {}
