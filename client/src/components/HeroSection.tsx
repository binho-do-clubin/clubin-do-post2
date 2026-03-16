import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Star, Play } from "lucide-react";

const BINHO_MAIN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho-main_645ac795.png";
const CLUBIN2_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/clubin2_32a6bb2d.mp4";

const avatarColors = ["#6A0DAD", "#00AEEF", "#9B59B6", "#3498DB", "#8E44AD"];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleScrollToPlans = () => {
    document.querySelector("#planos")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    document.querySelector("#sobre")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={CLUBIN2_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-30" : "opacity-0"}`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-[#1A1A1A]/40 to-[#1A1A1A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/80 via-transparent to-[#1A1A1A]/80" />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #6A0DAD 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00AEEF 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-white/80" style={{ fontFamily: "Inter, sans-serif" }}>
                +500 empreendedores já profissionalizaram seu conteúdo
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Seu Instagram com{" "}
              <span className="gradient-brand-text">posts de agência.</span>
              <br />
              <span className="text-white/90">Pelo preço de um</span>{" "}
              <span className="gradient-brand-text">café por dia.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base sm:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Receba todo o seu conteúdo do mês pronto, com design profissional e estratégia de vendas.{" "}
              <strong className="text-white">Chega de improvisar no Canva.</strong> Foque em vender.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <button
                onClick={handleScrollToPlans}
                className="btn-cta px-8 py-4 text-white font-bold text-base sm:text-lg"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Ver Planos e Transformar meu Instagram
              </button>
              <a
                href="#galeria"
                onClick={(e) => { e.preventDefault(); document.querySelector("#galeria")?.scrollIntoView({ behavior: "smooth" }); }}
                className="flex items-center justify-center gap-2 px-6 py-4 glass rounded-full text-white/80 hover:text-white font-semibold text-sm transition-all duration-300 hover:bg-white/10"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Play size={16} className="fill-current" />
                Ver exemplos de posts
              </a>
            </motion.div>

            {/* Social Proof Avatars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: color, zIndex: 5 - i }}
                  >
                    {["A", "B", "C", "D", "E"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-white/60 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Mais de <strong className="text-white">500 membros</strong> ativos
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Binho + Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex-shrink-0 relative w-72 sm:w-80 lg:w-96"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full opacity-30 blur-2xl animate-pulse-glow"
              style={{ background: "radial-gradient(circle, #6A0DAD 0%, #00AEEF 50%, transparent 70%)" }} />

            {/* Binho mascot */}
            <div className="relative animate-float">
              <img
                src={BINHO_MAIN}
                alt="Binho - Mascote do Clubin do Post"
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 20px 40px rgba(106,13,173,0.5))" }}
              />
            </div>

            {/* Floating badge: posts ready */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="absolute top-8 -left-4 glass rounded-2xl px-3 py-2 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">📱</span>
                <div>
                  <p className="text-xs font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>30 posts</p>
                  <p className="text-[10px] text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>prontos este mês</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge: time saved */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="absolute bottom-16 -right-4 glass rounded-2xl px-3 py-2 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <div>
                  <p className="text-xs font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>+20h</p>
                  <p className="text-[10px] text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>economizadas/mês</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        >
          <span className="text-xs font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Descubra mais</span>
          <ChevronDown size={20} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
