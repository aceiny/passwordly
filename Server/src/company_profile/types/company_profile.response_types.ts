import { baseReturnType } from "src/abstract/base.types";
import { CompanyProfile } from "../company_profile.entity";

export class getCompanyProfileReturnDto extends baseReturnType {
  company: CompanyProfile;
}
