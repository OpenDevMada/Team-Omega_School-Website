import { format } from "date-fns";
import { Label } from "./ui/label";
import { fr } from "date-fns/locale";
import type { Course } from "@/types/course";
import { Link } from "react-router-dom";

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string | Date | Course[];
};

export function InfoItem({ icon, label, value }: InfoItemProps) {
  const renderValue = () => {
    if (value instanceof Date) {
      return format(value, "PPP", { locale: fr });
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return "Aucun";

      const firstTwo = value.slice(0, 2);
      const remaining = value.length - firstTwo.length;

      return (
        <>
          {firstTwo.map((item, idx) => (
            <span key={idx}>{item.title}{idx < firstTwo.length - 1 ? ", " : ""}</span>
          ))}
          {remaining > 0 && <span> +{remaining}</span>}
        </>
      );
    }

    if (typeof value === "string" && value.includes("@")) {
      return (
        <Link to={`mailto:${value}`} className="underline">
          {value}
        </Link>
      );
    }

    return value;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full border border-(--yellow) p-4">{icon}</div>
      <span className="flex flex-col gap-2">
        <Label className="text-(--blue)">{label}</Label>
        <span className="text-sm">{renderValue()}</span>
      </span>
    </div>
  );
}