import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTransactionDto): Promise<any> {
    return this.prisma.transaction.create({ data });
  }

  async findAll(skip = 0, take = 10): Promise<{
    transactions: any[];
    totalCount: number;
    page: number;
    totalPages: number;
    totals: {
      totalIncome: number;
      totalOutcome: number;
      total: number;
    };
  }> {
    const [transactions, totalCount, incomeAgg, outcomeAgg] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        skip,
        take,
        orderBy: { data: 'desc' },
      }),
      this.prisma.transaction.count(),
      this.prisma.transaction.aggregate({
        _sum: { price: true },
        where: { type: 'INCOME' },
      }),
      this.prisma.transaction.aggregate({
        _sum: { price: true },
        where: { type: 'OUTCOME' },
      }),
    ]);

    const totalIncome = incomeAgg._sum.price ?? 0;
    const totalOutcome = outcomeAgg._sum.price ?? 0;

    return {
      transactions,
      totalCount,
      page: Math.floor(skip / take) + 1,
      totalPages: Math.ceil(totalCount / take),
      totals: {
        totalIncome,
        totalOutcome,
        total: totalIncome - totalOutcome,
      },
    };
  }

  async findOne(id: string): Promise<any | null> {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateTransactionDto): Promise<any> {
    const exists = await this.findOne(id);

    if (!exists) {
      throw new BadRequestException(`Transação com ID ${id} não encontrada`);
    }

    return this.prisma.transaction.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    const exists = await this.findOne(id);

    if (!exists) {
      throw new BadRequestException(`Transação com ID ${id} não encontrada`);
    }

    await this.prisma.transaction.delete({ where: { id } });
  }
}
