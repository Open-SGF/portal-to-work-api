import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Event } from './Event';
import { Job } from './Job';

@Entity({ name: 'companies' })
export class Company {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Job, (job) => job.company)
    jobs?: Job[];

    @OneToMany(() => Event, (event) => event.company)
    events?: Event[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
