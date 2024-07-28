import { BaseEntity } from "src/abstract/base.entity";
import { baseRoles } from "src/abstract/base.types";
import { Company } from "src/company/company.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class CompanyProfile extends BaseEntity<CompanyProfile> {
  @Column()
  company_name: string;
  @Column()
  company_email: string;
  @Column()
  company_phone: string;
  @Column()
  company_address: string;
  @Column()
  responsable_name: string;
  @Column()
  responsable_phone: string; //  to be replaced by json object {email , phone}
  @Column()
  responsable_role: string;
  @Column()
  company_website: string;
  @Column()
  company_field: string;
  @Column()
  notes: string;
  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;
  @Column({
    default: baseRoles.company,
  })
  role: string;
}
