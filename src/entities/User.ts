import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    address?: string;

    @Column({ type: 'decimal', nullable: true })
    latitude?: number;

    @Column({ type: 'decimal', nullable: true })
    longitude?: number;

    @Column({ nullable: true })
    pushToken?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
