import { Currency } from "@/utils/currency";

export default function CurrencyValue({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <>
      <div className={`flex gap-2 ${className} -book-value`}>
        {Currency.DecimalToUSD(parseFloat(value.toString()))}
      </div>
    </>
  );
}
