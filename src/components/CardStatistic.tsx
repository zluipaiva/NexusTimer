import Clock from "@/icons/Clock";

export default function CardStatistic({
  label,
  total,
  className,
}: {
  label: string;
  total: number | string;
  className?: string;
}) {
  return (
    <>
      <div
        className={
          "border border-zinc-800 rounded-lg flex justify-between items-center p-3 " +
          className
        }
      >
        <div className="grow">
          <div className="text-3xl font-medium">{total}</div>
          <div className="text-md mt-3">{label}</div>
        </div>
        <Clock />
      </div>
    </>
  );
}