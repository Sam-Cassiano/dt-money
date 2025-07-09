import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  HttpException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionService.create(createTransactionDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: transaction,
    };
  }

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const skipNumber = isNaN(Number(skip)) ? 0 : Number(skip);
    const takeNumber = isNaN(Number(take)) ? 10 : Number(take);

    const result = await this.transactionService.findAll(skipNumber, takeNumber);

    return {
      statusCode: HttpStatus.OK,
      ...result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionService.findOne(id);
    if (!transaction) {
      throw new HttpException('Transação não encontrada', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      data: transaction,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const updated = await this.transactionService.update(id, updateTransactionDto);
    return {
      statusCode: HttpStatus.OK,
      data: updated,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.transactionService.remove(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Transação removida com sucesso',
    };
  }
}
