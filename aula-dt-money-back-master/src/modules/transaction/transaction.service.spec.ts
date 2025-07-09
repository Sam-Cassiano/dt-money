import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { BadRequestException } from '@nestjs/common';

describe('TransactionService', () => {
  let service: TransactionService;

  const mockPrisma = {
    transaction: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      aggregate: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction', async () => {
    const dto: CreateTransactionDto = {
      title: 'Teste',
      category: 'Testes',
      price: 100,
      type: 'INCOME',
      data: new Date(),
    };
    mockPrisma.transaction.create.mockResolvedValue(dto);

    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(mockPrisma.transaction.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should return paginated transactions', async () => {
    const mockTransactions = [{ id: '1', title: 'T1' }];
    mockPrisma.$transaction.mockResolvedValue([
      mockTransactions,
      1,
      { _sum: { price: 200 } },
      { _sum: { price: 50 } },
    ]);

    const result = await service.findAll(0, 10);

    expect(result.transactions).toEqual(mockTransactions);
    expect(result.totalCount).toBe(1);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(1);
    expect(result.totals.total).toBe(150);
    expect(mockPrisma.$transaction).toHaveBeenCalled();
  });

  it('should find one transaction by ID', async () => {
    const transaction = { id: '1', title: 'T1' };
    mockPrisma.transaction.findUnique.mockResolvedValue(transaction);

    const result = await service.findOne('1');
    expect(result).toEqual(transaction);
    expect(mockPrisma.transaction.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should update a transaction', async () => {
    const existing = { id: '1', title: 'Old' };
    const updateDto: UpdateTransactionDto = { title: 'New' };
    const updated = { id: '1', title: 'New' };

    mockPrisma.transaction.findUnique.mockResolvedValue(existing);
    mockPrisma.transaction.update.mockResolvedValue(updated);

    const result = await service.update('1', updateDto);
    expect(result).toEqual(updated);
    expect(mockPrisma.transaction.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updateDto,
    });
  });

  it('should throw if transaction not found on update', async () => {
    mockPrisma.transaction.findUnique.mockResolvedValue(null);

    await expect(
      service.update('123', { title: 'Updated' }),
    ).rejects.toThrow(BadRequestException);

    expect(mockPrisma.transaction.update).not.toHaveBeenCalled();
  });

  it('should delete a transaction', async () => {
    const transaction = { id: '1' };
    mockPrisma.transaction.findUnique.mockResolvedValue(transaction);
    mockPrisma.transaction.delete.mockResolvedValue(undefined);

    await service.remove('1');
    expect(mockPrisma.transaction.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should throw if transaction not found on delete', async () => {
    mockPrisma.transaction.findUnique.mockResolvedValue(null);

    await expect(service.remove('999')).rejects.toThrow(BadRequestException);

    expect(mockPrisma.transaction.delete).not.toHaveBeenCalled();
  });
});
