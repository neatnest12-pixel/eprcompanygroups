import Link from "next/link";
import { blogArticles, company } from "../../lib/content";

export const metadata = {
  title: "Chennai Real Estate Blog | Plot Buying Tips and DTCP Guides | Richman Maker",
  description:
    "Read Richman Maker articles on the best areas to invest in Chennai, DTCP vs CMDA, plot investment strategy, and common land buying mistakes.",
  keywords:
    "Chennai real estate blog, DTCP vs CMDA, best areas to invest in Chennai, land buying tips"
};

export default function BlogPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Blog</p>
          <h1 className="section-title mt-3">
            SEO-focused Chennai real estate articles for serious land buyers
          </h1>
          <p className="mt-5 max-w-5xl text-base leading-8 text-white/82">
            Buyers research before they respond. That is why this blog focuses on the questions that
            matter most in Chennai real estate: where to invest, how approvals influence confidence,
            why plots can outperform flats for some buyers, and what mistakes to avoid when you are
            planning a land purchase in a fast-moving growth corridor.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogArticles.map((article) => (
            <article key={article.slug} className="card-white p-8 hover-lift">
              <h2 className="text-2xl font-semibold leading-tight text-emerald-950">
                {article.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-emerald-800">{article.intro}</p>
              <p className="mt-4 text-sm font-medium text-[#9d7d17]">
                SEO keywords: {article.keywords}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/locations" className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-950">
                  Related location guide
                </Link>
                <Link href="/properties" className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-950">
                  See properties
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-emerald-950">
            Want advice tailored to your budget instead of general content?
          </h2>
          <p className="mt-4 text-base leading-8 text-emerald-800">
            Content helps you research better, but a real conversation helps you decide faster. If
            you already have a budget range or preferred Chennai location, call Richman Maker and we
            will help you turn that research into the right next move.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={company.phoneHref} className="btn-gold">
              Call {company.phone}
            </a>
            <Link href="/contact" className="btn-outline border-emerald-200 text-emerald-950">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
