import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('urls')
export class Url {
	// @PrimaryGeneratedColumn('uuid')
	// id: string;
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	originalUrl: string;

	@Column({ unique: true })
	shortCode: string;

	@Column({ nullable: true })
	title: string;

	@Column({ default: 0 })
	clickCount: number;

	@CreateDateColumn()
	createdAt: Date;
}
