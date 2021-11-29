import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'jobs' })
export class Job {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    orderNumber!: number;
}
