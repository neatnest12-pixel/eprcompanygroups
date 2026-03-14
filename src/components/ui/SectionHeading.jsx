export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base text-gray-500 leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
