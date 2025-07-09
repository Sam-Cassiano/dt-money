import { IsOptional, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export enum TransactionType {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsDateString()
  data?: string;
}
