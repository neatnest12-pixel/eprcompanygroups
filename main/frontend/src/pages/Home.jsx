import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Home as HomeIcon,
  Landmark,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

const featuredProperties = [
  {
    title: "Palm Grove Villas",
    price: "Rs 1.25 Cr",
    location: "ECR, Chennai",
    type: "Villa",
    image:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Skyline Residences",
    price: "Rs 78 Lakh",
    location: "OMR, Chennai",
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Emerald Plots",
    price: "Rs 45 Lakh",
    location: "Siruseri, Chennai",
    type: "Plot",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Harbor View",
    price: "Rs 92 Lakh",
    location: "Padur, Chennai",
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80"
  }
];

const services = [
  { icon: HomeIcon, title: "Property Buying" },
  { icon: Landmark, title: "Property Selling" },
  { icon: Sparkles, title: "Investment Consulting" },
  { icon: Building2, title: "Digital Property Marketing" }
];

const testimonials = [
  {
    name: "Riya Nair",
    feedback:
      "EPR Group Company delivered verified listings and guided us to the perfect villa within weeks."
  },
  {
    name: "Arun Prakash",
    feedback:
      "Highly professional team with strong market knowledge. Our property sale closed faster than expected."
  },
  {
    name: "Meera Bose",
    feedback:
      "Exceptional service and transparency. The investment consulting was clear and confidence-building."
  }
];

export default function Home() {
  return (
    <>
      <section id="home" className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-[#0B5D3B]/80" />

        <div className="container-shell relative z-10 flex min-h-screen flex-col justify-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/70">EPR</p>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              EPR GROUP COMPANY
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-white/90 sm:text-3xl">
              Richman Maker
            </h2>
            <p className="mt-6 text-base text-white/80 sm:text-lg">
              Find Your Dream Property with Trusted Experts
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#featured"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B5D3B] transition hover:bg-white/90"
              >
                Explore Properties
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Now
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="glass-panel mt-10 grid gap-4 p-6 md:grid-cols-[1.3fr_1fr_1fr_auto]"
          >
            <input
              type="text"
              placeholder="Enter location"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <select className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-white/30">
              <option className="text-[#0B5D3B]">Property type</option>
              <option className="text-[#0B5D3B]">Villa</option>
              <option className="text-[#0B5D3B]">Apartment</option>
              <option className="text-[#0B5D3B]">Plot</option>
            </select>
            <select className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-white/30">
              <option className="text-[#0B5D3B]">Budget</option>
              <option className="text-[#0B5D3B]">Rs 40L - Rs 70L</option>
              <option className="text-[#0B5D3B]">Rs 70L - Rs 1Cr</option>
              <option className="text-[#0B5D3B]">Rs 1Cr+</option>
            </select>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#14a346]"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </section>

      <section id="featured" className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Featured</p>
            <h2 className="mt-3 text-3xl font-semibold">Featured Properties</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProperties.map((property) => (
              <div key={property.title} className="glass-panel overflow-hidden">
                <img
                  src={property.image}
                  alt={`${property.title} property`}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <p className="text-sm text-white/70">{property.location}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{property.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-white/80">
                    <span>{property.type}</span>
                    <span className="font-semibold">{property.price}</span>
                  </div>
                  <button className="mt-4 w-full rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="container-shell section-shell">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Users, title: "Trusted by Clients" },
            { icon: ShieldCheck, title: "Verified Properties" },
            { icon: Sparkles, title: "Fast Deals" },
            { icon: BadgeCheck, title: "Expert Guidance" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-panel flex items-center gap-4 p-6">
                <Icon className="h-6 w-6 text-white" />
                <p className="text-sm font-semibold text-white">{item.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="about" className="container-shell section-shell">
        <div className="glass-panel p-8">
          <h2 className="text-3xl font-semibold">About EPR Group Company</h2>
          <p className="mt-4 text-sm text-white/80">
            EPR Group Company specializes in premium real estate solutions and growth-driven
            investments.
          </p>
        </div>
      </section>

      <section id="services" className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Services</p>
            <h2 className="mt-3 text-3xl font-semibold">Luxury Real Estate Solutions</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="glass-panel flex flex-col gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-white/70">
                    Premium advisory with market intelligence, negotiation, and secure closings.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="testimonials" className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold">Client Reviews</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="glass-panel p-6">
                <p className="text-sm text-white/80">"{item.feedback}"</p>
                <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="container-shell section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold">Connect with Our Experts</h2>
            <p className="mt-4 text-sm text-white/80">
              Share your requirements and our team will contact you with verified options.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://wa.me/917299007799"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="tel:+917299007799"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white"
              >
                <PhoneCall className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </div>
          <form className="glass-panel space-y-4 p-6">
            <input
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Name"
              name="name"
              type="text"
            />
            <input
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Phone"
              name="phone"
              type="tel"
            />
            <input
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Email"
              name="email"
              type="email"
            />
            <textarea
              className="h-32 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Message"
              name="message"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B5D3B]"
            >
              Send Message
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
