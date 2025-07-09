"use client";

import { useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";

import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { DeleteModal } from "@/components/DeleteModal";

import { useTransaction } from "@/hooks/transactions";
import { ITransaction, ITotal } from "@/types/transaction";

export default function Home() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useTransaction().listAll(page, limit);
  const transactions = data?.transactions ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);
  const totalsFromApi = data?.totals;

  const { mutateAsync: createTransaction } = useTransaction().create;
  const { mutateAsync: updateTransaction } = useTransaction().update;
  const { mutateAsync: removeTransaction } = useTransaction().remove;

  const handleOpenFormToCreate = () => {
    setTransactionToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenFormToEdit = (transaction: ITransaction) => {
    setTransactionToEdit(transaction);
    setIsFormModalOpen(true);
  };

  const handleCloseForm = () => {
    setTransactionToEdit(null);
    setIsFormModalOpen(false);
  };

  const handleCreate = async (transaction: ITransaction) => {
    try {
      await createTransaction(transaction);
      toast.success("Transação criada com sucesso");
    } catch {
      toast.error("Erro ao criar a transação");
    }
  };

  const handleUpdate = async (transaction: ITransaction) => {
    if (!transaction.id) {
      toast.error("ID da transação não encontrado");
      return;
    }

    const transactionToSend = {
      ...transaction,
      data: transaction.data instanceof Date ? transaction.data : new Date(transaction.data),
    };

    try {
      await updateTransaction({ id: transaction.id, data: transactionToSend });
      toast.success("Transação atualizada com sucesso");
    } catch {
      toast.error("Erro ao atualizar a transação");
    }
  };

  const handleFormSubmit = (transaction: ITransaction) => {
    if (transactionToEdit) {
      // Garante o ID correto para edição
      const updatedTransaction = { ...transaction, id: transactionToEdit.id };
      handleUpdate(updatedTransaction);
    } else {
      handleCreate(transaction);
    }
    handleCloseForm();
  };

  const handleRequestDelete = (id: string) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await removeTransaction(selectedId);
      toast.success("Transação excluída com sucesso");
    } catch {
      toast.error("Erro ao excluir a transação");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedId(null);
    }
  };

  const total: ITotal = useMemo(() => {
    if (totalsFromApi) return totalsFromApi;
    return transactions.reduce(
      (acc, { type, price }) => {
        if (type === "INCOME") {
          acc.totalIncome += price;
          acc.total += price;
        } else {
          acc.totalOutcome += price;
          acc.total -= price;
        }
        return acc;
      },
      { totalIncome: 0, totalOutcome: 0, total: 0 }
    );
  }, [transactions, totalsFromApi]);

  if (isLoading) return <div className="p-4 text-center">Carregando...</div>;

  return (
    <div>
      <ToastContainer />
      <Header openModal={handleOpenFormToCreate} />
      <BodyContainer>
        <CardContainer totals={total} />
        <Table
          data={transactions}
          onDeleteTransaction={handleRequestDelete}
          onEditTransaction={handleOpenFormToEdit}
        />

        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="flex items-center font-semibold">
            Página {page} de {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>

        {isFormModalOpen && (
          <FormModal
            closeModal={handleCloseForm}
            formTitle={transactionToEdit ? "Editar Transação" : "Adicionar Transação"}
            onSubmitTransaction={handleFormSubmit}
            defaultValues={transactionToEdit}
          />
        )}

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </BodyContainer>
    </div>
  );
}
