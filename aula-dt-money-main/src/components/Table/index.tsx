import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";

export interface ITableProps {
  data: ITransaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (transaction: ITransaction) => void;
}

export function Table({
  data,
  onDeleteTransaction,
  onEditTransaction,
}: ITableProps) {
  return (
    <div className="overflow-x-auto mt-16">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="px-6 py-3 text-table-header text-base font-medium">Título</th>
            <th className="px-6 py-3 text-table-header text-base font-medium">Preço</th>
            <th className="px-6 py-3 text-table-header text-base font-medium">Categoria</th>
            <th className="px-6 py-3 text-table-header text-base font-medium">Data</th>
            <th className="px-6 py-3 text-table-header text-base font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id} className="bg-white h-16 rounded-lg shadow-sm">
              <td className="px-6 py-4 text-title">{transaction.title}</td>
              <td
                className={`px-6 py-4 ${
                  transaction.type === "INCOME" ? "text-income" : "text-outcome"
                }`}
              >
                {formatCurrency(transaction.price)}
              </td>
              <td className="px-6 py-4 text-table">{transaction.category}</td>
              <td className="px-6 py-4 text-table">
                {transaction.data ? formatDate(new Date(transaction.data)) : "—"}
              </td>
              <td className="px-6 py-4 text-table">
                <div className="flex gap-4">
                  <button
                    onClick={() => onEditTransaction(transaction)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
