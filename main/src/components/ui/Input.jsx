import { cn } from "../../lib/utils";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100",
        className
      )}
      {...props}
    />
  );
}
