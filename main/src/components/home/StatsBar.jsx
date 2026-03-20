const stats = [
  { label: "Property categories", value: "6+" },
  { label: "Live listings", value: "25+" },
  { label: "Buyer enquiries supported", value: "100+" },
  { label: "Primary market focus", value: "OMR / ECR" }
];

export default function StatsBar() {
  return (
    <section className="container-shell relative z-10 -mt-10">
      <div className="grid gap-4 rounded-xl bg-slate-900 p-6 text-white shadow-xl md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/10 p-5">
            <p className="text-3xl font-semibold text-orange-300">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
