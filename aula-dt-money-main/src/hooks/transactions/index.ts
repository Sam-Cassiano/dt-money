import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "@/services/transactions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITransaction } from "@/types/transaction";

const QUERY_KEY_BASE = ["transactions"];

export function useTransaction() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_BASE });
    },
  });

  const listAll = (page = 1, limit = 10) => {
    return useQuery({
      queryKey: [...QUERY_KEY_BASE, "list", page, limit],
      queryFn: () => getTransactions(page, limit),
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
    });
  };

  const update = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ITransaction>;
    }) => {
      if (!id) {
        throw new Error("ID da transação ausente na atualização");
      }
      return updateTransaction({ id, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_BASE });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => {
      if (!id) {
        throw new Error("ID da transação ausente na exclusão");
      }
      return deleteTransaction(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_BASE });
    },
  });

  return {
    create,
    listAll,
    update,
    remove,
  };
}
