import { TransactionType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsString({ message: 'O título deve ser uma string' })
  @MinLength(5, { message: 'O título deve ter pelo menos 5 caracteres' })
  title!: string;

  @IsString({ message: 'A categoria deve ser uma string' })
  category!: string;

  @IsDateString({}, { message: 'A data deve estar no formato ISO (YYYY-MM-DD)' })
  data!: Date;

  @Type(() => Number)
  @IsNumber({}, { message: 'O preço deve ser um número' })
  price!: number;

  @IsEnum(TransactionType, {
    message: 'O tipo deve ser "INCOME" ou "OUTCOME"',
  })
  type!: TransactionType;
}
