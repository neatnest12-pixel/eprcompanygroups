import { cn } from "../../lib/utils";

export default function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100",
        className
      )}
      {...props}
    />
  );
}
