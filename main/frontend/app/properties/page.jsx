import Link from "next/link";
import PropertiesCatalog from "../../components/PropertiesCatalog";
import { company } from "../../lib/content";

export const metadata = {
  title: "Properties in Chennai | Land, Flats, Rentals and Commercial Deals | Richman Maker",
  description:
    "Browse premium Chennai property deals with Richman Maker including land, flats, rentals, and commercial opportunities across OMR, Tambaram, Guduvanchery, Chengalpattu, Padur, and more.",
  keywords:
    "land for sale Chennai, OMR property deals, Padur flats for rent, commercial land Pudhupakkam, plots in Tambaram"
};

export default function PropertiesPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Property Listings</p>
          <h1 className="section-title mt-3">
            Premium Chennai property listings across land, flats, rentals, and commercial deals
          </h1>
          <p className="mt-5 max-w-5xl text-base leading-8 text-[#6B7280]">
            This listing page now combines premium plotted opportunities, apartment deals, rental
            inventory, and commercial land so serious buyers and tenants can compare everything in
            one place. Whether you are looking for a lowest-price OMR land deal, a gated-community
            rental in Padur, a branded apartment buy, or a commercial frontage asset, every card is
            presented with the practical details that matter before you make a call.
          </p>
        </div>

        <div className="card-white p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-[#1E3A5F]">
                Not sure which location fits your budget best?
              </h2>
              <p className="mt-4 text-base leading-8 text-[#6B7280]">
                Many buyers start with a general idea like "Tambaram or Guduvanchery" but need
                help narrowing the right project. Richman Maker can help you compare location
                quality, future value, documentation comfort, and affordability before you waste
                time on the wrong site visit.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href={company.phoneHref} className="btn-gold">
                Call for Shortlist Help
              </a>
              <Link href="/contact" className="btn-outline">
                Request Callback
              </Link>
            </div>
          </div>
        </div>

        <PropertiesCatalog />

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">Why our properties are better</h2>
          <div className="mt-5 space-y-4">
            <p className="text-base leading-8 text-[#6B7280]">
              Many buyers are not simply looking for land. They are looking for land that feels safe
              to buy, easy to understand, and sensible to hold. That is why Richman Maker focuses on
              property opportunities that match real buyer priorities such as legal awareness,
              location growth, approach road quality, and long-term resale psychology.
            </p>
            <p className="text-base leading-8 text-[#6B7280]">
              We also present property details in a more useful way. Instead of just quoting a rate,
              we explain why a location matters, who the likely buyer profile is, and what kind of
              investment logic supports the purchase. That helps clients compare properties based on
              actual value rather than excitement alone.
            </p>
          </div>
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">
            Investment benefits of plots vs flats
          </h2>
          <div className="mt-5 space-y-4">
            <p className="text-base leading-8 text-[#6B7280]">
              Plots often appeal to buyers who want maximum flexibility. You can hold land for future
              appreciation, build when the time is right, or keep the asset as part of a long-term
              family strategy. Flats may offer immediate usage, but plots give you more control over
              timing, design, and future decision-making.
            </p>
            <p className="text-base leading-8 text-[#6B7280]">
              In growth corridors such as Tambaram, Guduvanchery, Vandalur, and Chengalpattu, land
              also carries a different kind of upside. When surrounding infrastructure improves and
              residential activity increases, plotted assets can become significantly more desirable,
              especially if entry was made before broader price acceleration.
            </p>
            <p className="text-base leading-8 text-[#6B7280]">
              Flats are often easier to compare, but plots are often better for buyers who care about
              long-term appreciation, lower dependency on building management, and the freedom to
              develop later. That is one reason land continues to attract serious investors across
              Chennai outskirts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
