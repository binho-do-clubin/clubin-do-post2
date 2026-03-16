import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina",
    role: "Consultora Financeira",
    handle: "@anacarolina.fin",
    avatar: "AC",
    avatarColor: "#6A0DAD",
    rating: 5,
    text: "O Clubin do Post transformou completamente minha presença no Instagram. Antes eu ficava horas tentando criar posts no Canva e o resultado era medíocre. Agora recebo 30 posts profissionais todo mês e meu engajamento triplicou!",
    result: "+300% de engajamento",
    resultColor: "#6A0DAD",
  },
  {
    name: "Marcos Oliveira",
    role: "Advogado",
    handle: "@marcos.adv",
    avatar: "MO",
    avatarColor: "#00AEEF",
    rating: 5,
    text: "Sou advogado e não tinha tempo nem habilidade para criar conteúdo. O Clubin entendeu meu nicho perfeitamente e cria posts que transmitem autoridade e profissionalismo. Já fechei 3 clientes pelo Instagram este mês!",
    result: "3 clientes em 1 mês",
    resultColor: "#00AEEF",
  },
  {
    name: "Juliana Mendes",
    role: "Nutricionista",
    handle: "@ju.nutri",
    avatar: "JM",
    avatarColor: "#E91E8C",
    rating: 5,
    text: "Eu estava prestes a desistir do Instagram. Com o Clubin, meu feed ficou lindo e consistente. Em 60 dias cresci 2.000 seguidores e minha agenda está lotada. Melhor investimento que já fiz no meu negócio!",
    result: "+2.000 seguidores em 60 dias",
    resultColor: "#E91E8C",
  },
  {
    name: "Roberto Santos",
    role: "Corretor de Imóveis",
    handle: "@roberto.imoveis",
    avatar: "RS",
    avatarColor: "#27AE60",
    rating: 5,
    text: "Trabalho com imóveis de alto padrão e precisava de um conteúdo que transmitisse luxo e sofisticação. O Clubin entregou exatamente isso. Meu Instagram virou uma vitrine de respeito e as indicações aumentaram muito.",
    result: "+150% de alcance",
    resultColor: "#27AE60",
  },
  {
    name: "Fernanda Costa",
    role: "Empresária - Moda",
    handle: "@fernanda.moda",
    avatar: "FC",
    avatarColor: "#F39C12",
    rating: 5,
    text: "O processo é super simples: eles entendem minha marca, criam os posts e eu só aprovo. Economizo pelo menos 20 horas por mês que antes gastava tentando criar conteúdo. Vale cada centavo!",
    result: "20h economizadas/mês",
    resultColor: "#F39C12",
  },
];

function TestimonialCard({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive: boolean }) {
  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-500 ${
        isActive ? "bg-gradient-to-br from-[#6A0DAD]/20 to-[#2C2C2C]" : "bg-[#2C2C2C]"
      }`}
      style={isActive ? { border: "1px solid rgba(106,13,173,0.3)", boxShadow: "0 20px 60px rgba(106,13,173,0.2)" } : { border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-purple-500/30 mb-4" />

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map(i => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6"
        style={{ fontFamily: "Inter, sans-serif" }}>
        "{testimonial.text}"
      </p>

      {/* Result badge */}
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold mb-6"
        style={{ background: `${testimonial.resultColor}20`, color: testimonial.resultColor }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: testimonial.resultColor }} />
        {testimonial.result}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: testimonial.avatarColor }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            {testimonial.name}
          </p>
          <p className="text-xs text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
            {testimonial.role} · {testimonial.handle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DepoimentosSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActiveIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIdx(i => (i + 1) % testimonials.length);

  return (
    <section id="depoimentos" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#2C2C2C" }}>
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #6A0DAD 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            A transformação{" "}
            <span className="gradient-brand-text">na prática</span>
          </h2>
          <p className="text-base text-white/60 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Veja o que nossos membros dizem sobre os resultados com o Clubin do Post
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {[
            { value: "+500", label: "Membros ativos", icon: "👥" },
            { value: "+300%", label: "Alcance médio", icon: "📈" },
            { value: "+150%", label: "Engajamento", icon: "❤️" },
            { value: "4.9/5", label: "Avaliação média", icon: "⭐" },
          ].map((stat, i) => (
            <div key={i} className="card-premium p-4 sm:p-5 text-center">
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl sm:text-3xl font-black gradient-brand-text" style={{ fontFamily: "Poppins, sans-serif" }}>
                {stat.value}
              </p>
              <p className="text-xs text-white/50 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Featured testimonial */}
        <div className="relative mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <TestimonialCard testimonial={testimonials[activeIdx]} isActive={true} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx ? "w-6 h-2 gradient-brand" : "w-2 h-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* All testimonials mini grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#1A1A1A] rounded-2xl p-4 cursor-pointer hover:bg-[#222] transition-colors"
              onClick={() => setActiveIdx(i)}
            >
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-white/60 line-clamp-2 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {t.name}
                  </p>
                  <p className="text-[10px] text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
