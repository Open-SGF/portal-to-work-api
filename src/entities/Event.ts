import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Company } from './Company';
import { Location } from './Location';
import { Occupation } from './Occupation';

@Entity({ name: 'events' })
export class Event {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ nullable: true })
    link?: string;

    @Column()
    startAt!: Date;

    @Column()
    endAt!: Date;

    @ManyToOne(() => Company, (c) => c.events, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    company?: Company;

    @ManyToOne(() => Location, (l) => l.jobs, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    location?: Location;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
