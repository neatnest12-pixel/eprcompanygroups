import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Headset,
  LineChart,
  Megaphone,
  MessageCircle,
  Target,
  Users,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Building2,
    title: "Real Estate Marketing",
    description: "Position properties with premium campaigns that convert attention into site visits."
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Solutions",
    description: "Full-funnel digital strategy built for visibility, trust, and measurable ROI."
  },
  {
    icon: Target,
    title: "Lead Generation Systems",
    description: "Automated lead pipelines that capture, qualify, and nurture high intent buyers."
  },
  {
    icon: LineChart,
    title: "Brand Growth Strategy",
    description: "Scalable growth programs designed to elevate your brand presence and sales."
  }
];

const whyChoose = [
  { icon: BadgeCheck, title: "Proven Results", description: "Campaigns optimized for real business outcomes." },
  { icon: Users, title: "Expert Team", description: "Specialists across real estate, growth, and performance." },
  { icon: Zap, title: "Fast Execution", description: "Agile delivery without compromising premium quality." },
  { icon: Headset, title: "24/7 Support", description: "Always-on support for priority business needs." }
];

const projects = [
  {
    title: "Luxury Villa Launch",
    category: "Real Estate",
    description: "High-end creative + performance ads delivering 4x qualified leads."
  },
  {
    title: "Urban Apartment Campaign",
    category: "Marketing",
    description: "360 marketing suite that drove 70% faster inventory turnover."
  },
  {
    title: "Commercial Leasing Sprint",
    category: "Lead Gen",
    description: "Targeted outreach system converting enterprise prospects."
  },
  {
    title: "Premium Plot Expansion",
    category: "Brand Growth",
    description: "Multi-channel brand lift and conversion optimization."
  }
];

const testimonials = [
  {
    name: "Riya Nair",
    feedback:
      "EPR Group delivered consistent, qualified leads within weeks. The strategy was clear and execution was fast."
  },
  {
    name: "Arun Prakash",
    feedback:
      "We saw a major uplift in brand visibility and conversions. Their team felt like an extension of ours."
  },
  {
    name: "Meera Bose",
    feedback:
      "From creative to campaigns, everything was premium. Their support and communication are top-notch."
  }
];

export default function Home() {
  return (
    <>
      <section id="home" className="relative flex min-h-[100vh] items-center overflow-hidden">
        <div className="absolute left-6 top-6 hidden text-sm font-semibold text-white/80 md:block">
          EPR
        </div>
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-16 bottom-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="container-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/70">
              Premium Corporate Solutions
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              EPR GROUP COMPANY
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-white/90">Richman Maker</h2>
            <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
              We build high-performing growth systems for real estate brands and ambitious
              businesses with data-driven marketing and premium execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B5D3B] transition hover:bg-white/90"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <BadgeCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Trusted Growth Partner</p>
                <p className="text-xs text-white/70">Premium, transparent, and measurable outcomes.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {["Data-Driven Strategy", "Result-Oriented Execution", "Dedicated Support"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="container-shell section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">About</p>
            <h2 className="mt-3 text-3xl font-semibold">About EPR Group</h2>
            <p className="mt-5 text-base text-white/75">
              EPR Group Company is a modern business solutions provider focused on real estate,
              digital marketing, and scalable growth systems.
            </p>
          </motion.div>
          <div className="grid gap-4">
            {["Trusted Growth Partner", "Data-Driven Strategy", "Result-Oriented Execution"].map(
              (item) => (
                <div key={item} className="glass-panel flex items-center gap-4 p-5">
                  <BadgeCheck className="h-6 w-6 text-white" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="services" className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Services</p>
            <h2 className="mt-3 text-3xl font-semibold">High-Impact Solutions</h2>
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
                  <p className="text-sm text-white/75">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why" className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Why Choose Us</p>
            <h2 className="mt-3 text-3xl font-semibold">Built for Performance</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-panel flex flex-col gap-3 p-6">
                  <Icon className="h-6 w-6 text-white" />
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/75">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Projects</p>
            <h2 className="mt-3 text-3xl font-semibold">Portfolio Highlights</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 transition hover:-translate-y-1 hover:bg-white/15"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {project.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm text-white/70">{project.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  View Case Study
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold">What Clients Say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="glass-panel p-6">
                <p className="text-sm text-white/80">“{item.feedback}”</p>
                <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="container-shell section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold">Let’s Build Growth Together</h2>
            <p className="mt-4 text-sm text-white/75">
              Share your business goals and we’ll craft a premium growth roadmap.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/80">
              <p>Phone: 7299007799</p>
              <p>Email: info@eprgroupcompany.in</p>
              <a
                href="https://wa.me/917299007799"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
          <form className="glass-panel space-y-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Name"
                name="name"
                type="text"
              />
              <input
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Phone"
                name="phone"
                type="tel"
              />
            </div>
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B5D3B]"
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
