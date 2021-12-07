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

@Entity({ name: 'jobs' })
export class Job {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @ManyToOne(() => Occupation, (o) => o.jobs, {
        nullable: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    occupation?: Occupation;

    @ManyToOne(() => Company, (c) => c.jobs, {
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
