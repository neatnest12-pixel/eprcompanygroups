export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-sm text-gray-500">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />
      <span>{label}</span>
    </div>
  );
}
