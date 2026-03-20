import { cn } from "../../lib/utils";

export default function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
