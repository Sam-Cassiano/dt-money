import { formatCurrency } from "@/utils";
import Image from "next/image";

export interface ICardProps {
  title: string;
  value: number;
  type: "income" | "outcome" | "total";
}

export function Card({ title, type, value }: ICardProps) {
  let cardBgColor = "bg-white";
  let cardIcon = "/income.png";
  let cardTextColor = "text-title";

  if (type === "income") {
    cardIcon = "/income.png";
  } else if (type === "outcome") {
    cardIcon = "/outcome.png";
  } else if (type === "total") {
    cardBgColor = value >= 0 ? "bg-income" : "bg-outcome";
    cardIcon = "/total.png";
    cardTextColor = "text-white";
  }

  return (
    <div className={`w-[352px] h-[136px] ${cardBgColor} rounded-md`}>
      <div className="flex items-center justify-between px-8 py-6">
        <span className={`text-[16px] ${cardTextColor}`}>{title}</span>
        <Image src={cardIcon} width={32} height={32} alt="Card Icon" />
      </div>
      <span className={`px-8 pt-4 text-4xl ${cardTextColor}`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}
