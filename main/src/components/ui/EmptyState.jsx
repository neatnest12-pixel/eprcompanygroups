import Button from "./Button";

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
      <h3 className="text-3xl font-semibold text-slate-900">{title}</h3>
      <p className="max-w-xl text-sm text-gray-500 leading-relaxed">{description}</p>
      {actionLabel ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  );
}
