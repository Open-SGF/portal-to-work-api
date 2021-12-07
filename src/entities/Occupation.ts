import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Job } from './Job';

@Entity({ name: 'occupations' })
export class Occupation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @OneToMany(() => Job, (job) => job.occupation)
    jobs?: Job[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
