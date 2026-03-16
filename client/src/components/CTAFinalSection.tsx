import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BINHO_MAIN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho-main_645ac795.png";

export default function CTAFinalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#2C2C2C" }}>
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at center, #6A0DAD 0%, transparent 60%)" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Binho with rocket */}
          <div className="relative inline-block mb-8">
            <motion.img
              src={BINHO_MAIN}
              alt="Binho"
              className="w-32 sm:w-40 mx-auto"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 20px 40px rgba(106,13,173,0.5))" }}
            />
            <motion.div
              className="absolute -top-6 -right-2 text-3xl"
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🚀
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Pronto para ter um Instagram
            <br />
            <span className="gradient-brand-text">que vende por você?</span>
          </h2>

          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Deixe a criação de conteúdo com a gente e use seu tempo para fechar negócios.
            Mais de 500 empreendedores já transformaram seu Instagram.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={() => document.querySelector("#planos")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-cta px-8 py-4 text-white font-bold text-base sm:text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Quero Vender Mais com meu Instagram
            </button>
            <a
              href="https://wa.me/5500000000000?text=Olá! Quero saber mais sobre o Clubin do Post."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 glass rounded-full text-white font-semibold text-sm hover:bg-white/10 transition-all"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              💬 Falar com especialista
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/40">
            <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              <span>🛡️</span> Garantia de 7 dias
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              <span>✅</span> Sem fidelidade
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              <span>⚡</span> Cancele quando quiser
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              <span>🏆</span> +500 clientes satisfeitos
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
