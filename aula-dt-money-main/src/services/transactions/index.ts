import { ITransaction, ITotal } from "@/types/transaction";
import { api } from "../api";

export async function getTransactions(page = 1, limit = 10): Promise<{
  transactions: ITransaction[];
  totalCount: number;
  page: number;
  totalPages: number;
  totals: ITotal;
}> {
  try {
    const params = new URLSearchParams({
      skip: String((page - 1) * limit),
      take: String(limit),
    });

    const response = await api.get(`/transaction?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(
      "Erro ao buscar transações: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function createTransaction(transaction: ITransaction) {
  try {
    const response = await api.post("/transaction", transaction);
    return response.data;
  } catch (error) {
    throw new Error(
      "Erro ao criar transação: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function updateTransaction({
  id,
  data,
}: {
  id: string;
  data: Partial<ITransaction>;
}) {
  if (!id) {
    throw new Error("ID da transação não informado");
  }

  try {
    const response = await api.patch(`/transaction/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      "Erro ao atualizar transação: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function deleteTransaction(id: string) {
  if (!id) {
    throw new Error("ID da transação não informado");
  }

  try {
    const response = await api.delete(`/transaction/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      "Erro ao excluir transação: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}
