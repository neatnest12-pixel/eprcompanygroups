import PropertiesCatalog from "../../components/PropertiesCatalog";

export const metadata = {
  title: "Plots in Tambaram, Guduvanchery and Chennai | Richman Maker Properties",
  description:
    "Browse plots in Tambaram, Guduvanchery, Vandalur, and Chengalpattu with Richman Maker. Explore price ranges, plot sizes, benefits, and investment potential for Chennai land buyers.",
  keywords:
    "plots in Tambaram, DTCP plots Guduvanchery, land for sale Chennai, Chengalpattu plots, Vandalur plots"
};

export default function PropertiesPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Property Listings</p>
          <h1 className="section-title mt-3">
            Verified plot opportunities across Chennai's most searched growth locations
          </h1>
          <p className="mt-5 max-w-5xl text-base leading-8 text-white/82">
            Buyers searching for plots in Tambaram, land for sale in Chennai, DTCP plots in
            Guduvanchery, and plotted investments near Vandalur or Chengalpattu usually want three
            things: location growth, legal comfort, and a price point that still leaves room for
            appreciation. This properties page is built around that exact search behavior. The
            listings below are presented with practical details such as location, price range, plot
            size, buyer benefits, and an investment-focused explanation so you can compare more
            intelligently before you book a site visit.
          </p>
        </div>

        <PropertiesCatalog />

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-emerald-950">Why our properties are better</h2>
          <div className="mt-5 space-y-4">
            <p className="text-base leading-8 text-emerald-800">
              Many buyers are not simply looking for land. They are looking for land that feels safe
              to buy, easy to understand, and sensible to hold. That is why Richman Maker focuses on
              property opportunities that match real buyer priorities such as legal awareness,
              location growth, approach road quality, and long-term resale psychology.
            </p>
            <p className="text-base leading-8 text-emerald-800">
              We also present property details in a more useful way. Instead of just quoting a rate,
              we explain why a location matters, who the likely buyer profile is, and what kind of
              investment logic supports the purchase. That helps clients compare properties based on
              actual value rather than excitement alone.
            </p>
          </div>
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-emerald-950">
            Investment benefits of plots vs flats
          </h2>
          <div className="mt-5 space-y-4">
            <p className="text-base leading-8 text-emerald-800">
              Plots often appeal to buyers who want maximum flexibility. You can hold land for future
              appreciation, build when the time is right, or keep the asset as part of a long-term
              family strategy. Flats may offer immediate usage, but plots give you more control over
              timing, design, and future decision-making.
            </p>
            <p className="text-base leading-8 text-emerald-800">
              In growth corridors such as Tambaram, Guduvanchery, Vandalur, and Chengalpattu, land
              also carries a different kind of upside. When surrounding infrastructure improves and
              residential activity increases, plotted assets can become significantly more desirable,
              especially if entry was made before broader price acceleration.
            </p>
            <p className="text-base leading-8 text-emerald-800">
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
