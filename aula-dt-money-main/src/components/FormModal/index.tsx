"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { date, InferType, number, object, string } from "yup";

import { Input } from "../Form/Input";
import { TransactionSwitcher } from "../TransactionSwitcher";
import { ITransaction } from "@/types/transaction";

export interface IFormModalProps {
  formTitle: string;
  closeModal: () => void;
  onSubmitTransaction: (transaction: ITransaction) => void;
  defaultValues?: ITransaction;
}

const transactionSchema = object({
  title: string()
    .required("O Título é obrigatório")
    .min(5, "O Título deve ter pelo menos 5 caracteres"),
  type: string()
    .required("O Tipo é obrigatório")
    .oneOf(["INCOME", "OUTCOME"], 'O tipo deve ser "INCOME" ou "OUTCOME"'),
  category: string().required("A Categoria é obrigatória"),
  price: number()
    .required("O Preço é obrigatório")
    .positive("O preço deve ser positivo")
    .min(0.01, "O preço deve ser maior que zero"),
  data: string().required("A Data é obrigatória"), // usando string para conversão manual depois
});

type ITransactionForm = InferType<typeof transactionSchema>;

export function FormModal({
  formTitle,
  closeModal,
  onSubmitTransaction,
  defaultValues,
}: IFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ITransactionForm>({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      title: "",
      type: "INCOME",
      category: "",
      price: 0,
      data: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        type: defaultValues.type,
        category: defaultValues.category,
        price: defaultValues.price,
        data: new Date(defaultValues.data).toISOString().split("T")[0],
      });
    }
  }, [defaultValues, reset]);

  const type = watch("type");

  const handleTypeChange = (selectedType: "INCOME" | "OUTCOME") => {
    setValue("type", selectedType);
  };

  const onSubmit = (formData: ITransactionForm) => {
    const transactionToSubmit: ITransaction = {
      ...formData,
      id: defaultValues?.id,
      data: new Date(formData.data + "T00:00:00"), // converte a string para Date
    };

    onSubmitTransaction(transactionToSubmit);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-600"
          onClick={closeModal}
          aria-label="Fechar modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-title mb-6">{formTitle}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input type="text" placeholder="Título" {...register("title")} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <Input type="number" step="0.01" placeholder="Preço" {...register("price")} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <TransactionSwitcher type={type as "INCOME" | "OUTCOME"} setType={handleTypeChange} />
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

          <div>
            <Input type="text" placeholder="Categoria" {...register("category")} />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div>
            <Input type="date" {...register("data")} />
            {errors.data && <p className="text-red-500 text-sm">{errors.data.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-income px-4 py-3 font-semibold text-white hover:opacity-90"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}
