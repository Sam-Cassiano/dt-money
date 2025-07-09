interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  isPreviousData?: boolean;
}

export function Pagination({ page, setPage, isPreviousData }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="bg-button text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-title text-lg font-medium">Página {page}</span>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={isPreviousData}
        className="bg-button text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
