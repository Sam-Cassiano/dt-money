interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export function ConfirmModal({ isOpen, onConfirm, onCancel, message }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
        <p className="mb-6">{message || "Tem certeza que deseja excluir esta transação?"}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
