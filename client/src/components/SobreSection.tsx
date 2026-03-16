import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Target, Clock, Shield, Heart, Star } from "lucide-react";

const BINHO2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho2_92d70278.webp";

const diferenciais = [
  {
    icon: <Star className="w-6 h-6" />,
    title: "Design de Elite",
    desc: "Qualidade de agência de ponta por um valor que cabe no seu bolso.",
    color: "#6A0DAD",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Estratégia que Vende",
    desc: "Cada post é pensado para uma meta: engajar, informar ou vender.",
    color: "#00AEEF",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Zero Dor de Cabeça",
    desc: "Processo simples: você aprova, nós entregamos, você posta.",
    color: "#9B59B6",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Constância Garantida",
    desc: "Seu feed sempre ativo, construindo autoridade e confiança.",
    color: "#3498DB",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Atendimento Humano",
    desc: "Fale com pessoas de verdade, que entendem o seu negócio.",
    color: "#E91E8C",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Binho, seu Assistente",
    desc: "Nosso mascote garante que tudo saia perfeito e dentro do prazo.",
    color: "#00BCD4",
  },
];

function DiferencialCard({ item, index }: { item: typeof diferenciais[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-premium p-6 group relative overflow-hidden"
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${item.color}20, transparent)` }} />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${item.color}20`, color: item.color }}
      >
        {item.icon}
      </div>

      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
        {item.title}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
        {item.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function SobreSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="sobre" className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
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
            O que é o Clubin do Post
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Não somos uma agência cara.
            <br />
            <span className="gradient-brand-text">Somos o Clubin.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Uma plataforma completa de conteúdo para Instagram que une design profissional,
            estratégia de vendas e praticidade — tudo em um único lugar.
          </p>
        </motion.div>

        {/* Before/After comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl p-6 sm:p-8 overflow-hidden"
            style={{ background: "#2C2C2C" }}
          >
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-red-400 bg-red-400/10">
              Antes
            </div>
            <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              😰 Seu Instagram parece assim?
            </h3>
            <ul className="space-y-3">
              {[
                "Posts feitos na pressa, sem identidade visual",
                "Semanas sem publicar nada",
                "Canva aberto às 23h tentando criar algo",
                "Sensação de que ninguém está vendo",
                "Concorrentes com feed mais profissional",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl p-6 sm:p-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #6A0DAD15, #00AEEF15)" }}
          >
            <div className="absolute inset-0 rounded-3xl"
              style={{ border: "1px solid rgba(106,13,173,0.3)" }} />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-green-400 bg-green-400/10">
              Com o Clubin
            </div>
            <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              ✨ E se ele fosse assim?
            </h3>
            <ul className="space-y-3">
              {[
                "Conteúdo estratégico com visual de marca grande",
                "Feed sempre ativo e consistente",
                "30 posts prontos todo mês, sem esforço",
                "Mais seguidores e clientes pelo Instagram",
                "Tempo livre para focar no que importa: vender",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/80"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <span className="gradient-brand-text mt-0.5 flex-shrink-0 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Diferenciais grid */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Por que o Clubin é{" "}
            <span className="gradient-brand-text">diferente?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {diferenciais.map((item, i) => (
            <DiferencialCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Binho illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block relative">
            <img
              src={BINHO2}
              alt="Binho trabalhando"
              className="w-48 sm:w-64 mx-auto animate-float-slow"
              style={{ filter: "drop-shadow(0 20px 40px rgba(106,13,173,0.4))" }}
            />
            <div className="absolute -top-4 -right-4 glass rounded-2xl px-3 py-2">
              <p className="text-xs font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                Inovação + Design
              </p>
            </div>
          </div>
          <p className="mt-6 text-white/50 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            O Binho está sempre trabalhando para entregar o melhor conteúdo para você
          </p>
        </motion.div>
      </div>
    </section>
  );
}
