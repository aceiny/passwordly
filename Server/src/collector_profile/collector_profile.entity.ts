import { BaseEntity } from "src/abstract/base.entity";
import { Collector } from "src/collector/collector.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class CollectorProfile extends BaseEntity<CollectorProfile> {
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  birth_date: Date;
  @Column()
  phone_number: string;
  @Column({
    default: false,
  })
  verified: boolean;
  @Column({
    default: "",
  })
  identity_card: string;
  @Column({
    default: 0,
  })
  balance : number;
  @Column({
    default: false,
  })
  receiving_emails: boolean;
  @Column({
    default: true,
  })
  agreed_to_terms: boolean;
  @Column({
    default: "",
  })
  profile_picture: string;
  @OneToOne(() => Collector, { onDelete: "CASCADE" })
  @JoinColumn()
  collector: Collector;
}
