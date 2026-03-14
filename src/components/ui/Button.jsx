import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const variants = {
  primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm",
  secondary: "border border-slate-200 bg-white text-slate-900 hover:bg-gray-50",
  outline: "border border-slate-200 bg-transparent text-slate-900 hover:bg-gray-50",
  ghost: "bg-transparent text-slate-700 hover:bg-gray-50"
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base"
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}) {
  const isDisabled = Boolean(props.disabled);

  return (
    <motion.button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={isDisabled ? undefined : { scale: 1.05 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      {...props}
    />
  );
}
