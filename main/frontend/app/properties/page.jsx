import PropertiesCatalog from "../../components/PropertiesCatalog";

export const metadata = {
  title: "Properties | ERP Group Company | Richman Maker",
  description:
    "Browse verified plots, flats, and rental properties across Chennai with ERP Group Company - Richman Maker.",
  keywords: "properties Chennai, plots in OMR, flats in Padur, rentals ECR"
};

export default function PropertiesPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Properties</p>
          <h1 className="section-title mt-3">Explore premium listings across Chennai</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#6B7280]">
            Filter by location, category, and budget to shortlist the best plots, flats, and rental
            opportunities. Every listing includes verified details to help you decide faster.
          </p>
        </div>
        <PropertiesCatalog />
      </div>
    </section>
  );
}
