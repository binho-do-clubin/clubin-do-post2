import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_SEMPREMAI = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/posts-sempremai_bcf8222e.png";
const POSTS_PEGATROCO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/posts-pegatroco_3611a2b1.png";
const POSTS_TECNOPORT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/posts-tecnoport_f362621d.png";

const portfolioItems = [
  {
    id: 1,
    image: POSTS_SEMPREMAI,
    brand: "SempreMaiS",
    niche: "Financeiro",
    color: "#27AE60",
    desc: "Posts de crédito e FGTS com design vibrante e copy persuasiva",
  },
  {
    id: 2,
    image: POSTS_PEGATROCO,
    brand: "Pegatroco",
    niche: "Crédito CLT",
    color: "#2980B9",
    desc: "Campanha de crédito CLT com identidade visual forte e moderna",
  },
  {
    id: 3,
    image: POSTS_TECNOPORT,
    brand: "Tecnoport",
    niche: "Tecnologia",
    color: "#8E44AD",
    desc: "Posts técnicos com design sofisticado para empresa de automação",
  },
];

export default function GaleriaSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  const prev = () => setActiveIdx((i) => (i - 1 + portfolioItems.length) % portfolioItems.length);
  const next = () => setActiveIdx((i) => (i + 1) % portfolioItems.length);

  const active = portfolioItems[activeIdx];

  return (
    <section id="galeria" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#2C2C2C" }}>
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00AEEF 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Galeria de Conteúdos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Posts que{" "}
            <span className="gradient-brand-text">vendem de verdade</span>
          </h2>
          <p className="text-base text-white/60 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Veja exemplos reais de conteúdo criado pelo Clubin do Post para nossos clientes
          </p>
        </motion.div>

        {/* Portfolio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image showcase */}
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden soft-shadow">
              <img
                src={active.image}
                alt={`Posts ${active.brand}`}
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Brand badge */}
              <div className="absolute bottom-4 left-4 glass rounded-2xl px-4 py-2">
                <p className="text-sm font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {active.brand}
                </p>
                <p className="text-xs text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>
                  {active.niche}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>

          {/* Info panel */}
          <div className="space-y-6">
            {/* Active item info */}
            <motion.div
              key={`info-${activeIdx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4"
                style={{ background: `${active.color}20`, color: active.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: active.color }} />
                {active.niche}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                {active.brand}
              </h3>
              <p className="text-white/60 text-base leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {active.desc}
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "30+", label: "Posts/mês" },
                { value: "100%", label: "Exclusivo" },
                { value: "48h", label: "Entrega" },
              ].map((stat, i) => (
                <div key={i} className="card-premium p-4 text-center">
                  <p className="text-2xl font-black gradient-brand-text" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/50 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Portfolio thumbnails */}
            <div className="flex gap-3">
              {portfolioItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(i)}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    i === activeIdx
                      ? "ring-2 ring-offset-2 ring-offset-[#2C2C2C] scale-105"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  style={i === activeIdx ? { outline: "2px solid #6A0DAD", outlineOffset: "2px" } : {}}
                >
                  <img
                    src={item.image}
                    alt={item.brand}
                    className="w-20 h-20 object-cover"
                  />
                  {i === activeIdx && (
                    <div className="absolute inset-0 ring-2 ring-purple-500 rounded-2xl" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#planos"
              onClick={(e) => { e.preventDefault(); document.querySelector("#planos")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-cta inline-flex items-center gap-2 px-6 py-3 text-white font-bold text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Quero posts assim para meu negócio
            </a>
          </div>
        </div>

        {/* Scrolling marquee of niches */}
        <div className="mt-16 overflow-hidden">
          <p className="text-center text-xs text-white/30 mb-6 uppercase tracking-widest"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Atendemos todos os nichos
          </p>
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {[
              "Financeiro", "Saúde", "Beleza", "Tecnologia", "Imóveis",
              "Educação", "Moda", "Alimentação", "Advocacia", "Consultoria",
              "Financeiro", "Saúde", "Beleza", "Tecnologia", "Imóveis",
              "Educação", "Moda", "Alimentação", "Advocacia", "Consultoria",
            ].map((niche, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-white/60 flex-shrink-0"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="w-1.5 h-1.5 rounded-full gradient-brand" />
                {niche}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
