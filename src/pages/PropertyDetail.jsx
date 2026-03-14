import {
  BedDouble,
  Building2,
  Copy,
  Facebook,
  GitCompareArrows,
  MapPin,
  Maximize,
  MessageCircle,
  PhoneCall,
  ShowerHead
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPropertyById, getProperties } from "../api";
import EnquiryDialog from "../components/property/EnquiryDialog";
import ImageGallery from "../components/property/ImageGallery";
import PropertyCard from "../components/property/PropertyCard";
import RecentlyViewedSection from "../components/property/RecentlyViewedSection";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { useCompare } from "../hooks/useCompare";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { buildWhatsAppLink, formatCurrency } from "../lib/utils";
import { getPropertyStatusLabels } from "../utils/property-utils";

function getVideoEmbedUrl(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");

    if (hostname === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${parsed.pathname}`;
      }

      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  } catch (error) {
    return "";
  }

  return "";
}

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(undefined);
  const [related, setRelated] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const { compareIds, toggleCompare } = useCompare();
  const { recentlyViewed, trackPropertyView } = useRecentlyViewed();

  useEffect(() => {
    getPropertyById(id).then(setProperty);
    getProperties().then((allProperties) => {
      setRelated(allProperties.filter((item) => item.id !== id).slice(0, 3));
    });
  }, [id]);

  useEffect(() => {
    if (id) {
      trackPropertyView(id);
    }
  }, [id]);

  if (property === undefined) {
    return (
      <section className="container-shell section-shell">
        <div className="glass-panel px-6 py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            Loading property
          </p>
        </div>
      </section>
    );
  }

  if (!property) {
    return (
      <section className="container-shell section-shell">
        <EmptyState
          title="Property not found"
          description="The listing may have been removed or is no longer available."
          actionLabel="Back to properties"
          onAction={() => window.history.back()}
        />
      </section>
    );
  }

  const whatsappLink = buildWhatsAppLink(
    "Hello, I am interested in this property listed on ERP Group Company website."
  );
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Hello, I am interested in this property listed on ERP Group Company website. ${shareUrl}`;
  const videoUrl = property.videoUrl?.trim();
  const videoEmbedUrl = getVideoEmbedUrl(videoUrl);
  const statusLabels = getPropertyStatusLabels(property);
  const isCompared = compareIds.includes(property.id);

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setShareMessage("Property link copied to clipboard.");
  };

  return (
    <section className="container-shell section-shell">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ImageGallery images={property.images} title={property.title} />

          {videoUrl ? (
            <div className="glass-panel overflow-hidden rounded-xl">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-3xl font-semibold text-slate-900">Video tour</h2>
              </div>
              <div className="aspect-video w-full bg-black">
                {videoEmbedUrl ? (
                  <iframe
                    title={`Video tour for ${property.title}`}
                    src={videoEmbedUrl}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={videoUrl} controls className="h-full w-full" />
                )}
              </div>
            </div>
          ) : null}

          <div className="glass-panel rounded-xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
                  {property.category}
                </p>
                <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
                  {property.title}
                </h1>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 leading-relaxed">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </p>
                {statusLabels.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {statusLabels.map((label) => (
                      <span
                        key={label}
                        className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="rounded-xl bg-orange-50 px-6 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                  Price
                </p>
                <p className="mt-2 text-3xl font-bold text-orange-600">
                  {property.priceLabel || formatCurrency(property.price)}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <Maximize className="h-4 w-4" />
                  Area
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{property.area} sqft</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <BedDouble className="h-4 w-4" />
                  Bedrooms
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{property.bedrooms || "-"}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <ShowerHead className="h-4 w-4" />
                  Bathrooms
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {property.bathrooms || "-"}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <Building2 className="h-4 w-4" />
                  Listing Type
                </p>
                <p className="mt-2 text-xl font-semibold capitalize text-slate-900">
                  {property.transactionType}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-slate-900">About this property</h2>
              <p className="mt-4 text-base text-gray-500 leading-relaxed">{property.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-slate-900">Amenities</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                Listed by
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-slate-900">{property.agentName}</p>
                  <p className="mt-1 text-sm text-gray-500">{property.agentPhone}</p>
                </div>
                <Link
                  to={`/agent/${property.agentSlug}`}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  View agent profile
                </Link>
              </div>
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-xl">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-3xl font-semibold text-slate-900">Google Maps</h2>
            </div>
            <iframe
              title={`Map for ${property.title}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                property.mapQuery || property.location
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="glass-panel rounded-xl p-6 shadow-md">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
              Contact ERP Group Company
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Talk to our team about this listing.
            </h2>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Call directly or use WhatsApp for a faster response from our brokerage team.
            </p>

            <div className="mt-6 space-y-3 text-sm font-semibold text-slate-700">
              <a href="tel:7299007799" className="flex items-center gap-3">
                <PhoneCall className="h-4 w-4" />
                7299007799
              </a>
              <a href="tel:8939427799" className="flex items-center gap-3">
                <PhoneCall className="h-4 w-4" />
                8939427799
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant={isCompared ? "secondary" : "outline"}
                onClick={() => toggleCompare(property.id)}
              >
                <GitCompareArrows className="h-4 w-4" />
                {isCompared ? "Added to Compare" : "Compare Property"}
              </Button>
              <Button onClick={() => setDialogOpen(true)}>Send enquiry</Button>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  Contact on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 shadow-md">
            <h2 className="text-3xl font-semibold text-slate-900">Need more options?</h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Explore more ERP Group Company properties that match similar needs and budgets.
            </p>
            <div className="mt-6">
              <Link to="/properties">
                <Button variant="outline">Browse all properties</Button>
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 shadow-md">
            <h2 className="text-3xl font-semibold text-slate-900">Share this property</h2>
            <div className="mt-4 grid gap-3">
              <a href={buildWhatsAppLink(shareText)} target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  Share on WhatsApp
                </Button>
              </a>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
              >
                <Copy className="h-4 w-4" />
                Copy link
              </button>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="w-full">
                  <Facebook className="h-4 w-4" />
                  Share on Facebook
                </Button>
              </a>
              {shareMessage ? <p className="text-sm text-green-700">{shareMessage}</p> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-slate-900">Related properties</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      </div>

      <RecentlyViewedSection properties={recentlyViewed.filter((item) => item.id !== property.id)} />

      <EnquiryDialog property={property} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </section>
  );
}
