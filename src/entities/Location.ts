import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
