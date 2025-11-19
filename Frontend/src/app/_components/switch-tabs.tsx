import { cn } from "@/lib/utils";
export type View = "groups" | "levels";

interface SwitchTabsOption {
  id: string;
  label?: string;
  icon?: React.ElementType;
}

interface SwitchTabsProps {
  options: SwitchTabsOption[];
  value: string;
  onChange: (value: View) => void;
  className?: string;
}

export function SwitchTabs({
  options,
  value,
  onChange,
  className,
}: SwitchTabsProps) {
  return (
    <div className={cn("flex gap-3 pb-3", className)}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const selected = value === opt.id;

        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id as View)}
            className={cn(
              "relative px-4 py-2 flex items-center gap-2 transition-all font-medium border-b-2",
              selected
                ? "border-(--yellow) text-(--yellow)"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {opt.label ?? opt.id.charAt(0).toUpperCase() + opt.id.slice(1)}

            {selected && (
              <span className="absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-(--yellow) rounded-full"></span>
            )}
          </button>
        );
      })}
    </div>
  );
}
