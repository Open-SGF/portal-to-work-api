import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Event } from './Event';
import { Job } from './Job';

@Entity({ name: 'locations' })
export class Location {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    address!: string;

    @Column({ type: 'decimal' })
    latitude!: number;

    @Column({ type: 'decimal' })
    longitude!: number;

    @OneToMany(() => Job, (job) => job.location)
    jobs?: Job[];

    @OneToMany(() => Event, (event) => event.location)
    events?: Event[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
