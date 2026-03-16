import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause } from "lucide-react";

const BINHO_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho-video_a965f071.mp4";
const BINHO1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho1_7e306ae3.webp";

export default function BinhoVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden soft-shadow cursor-pointer group" onClick={togglePlay}>
              <video
                ref={videoRef}
                src={BINHO_VIDEO}
                className="w-full h-auto object-cover"
                loop
                playsInline
                poster={BINHO1}
              />

              {/* Play/pause overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                <div className="w-16 h-16 gradient-brand rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
                  {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-20 blur-xl"
              style={{ background: "radial-gradient(circle, #6A0DAD 0%, transparent 70%)" }} />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-xl"
              style={{ background: "radial-gradient(circle, #00AEEF 0%, transparent 70%)" }} />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, x: 40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Conheça o Binho
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Seu assistente pessoal de{" "}
              <span className="gradient-brand-text">conteúdo digital</span>
            </h2>
            <p className="text-base text-white/60 leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}>
              O Binho é o mascote do Clubin do Post e representa nossa missão: tornar a criação de conteúdo profissional acessível para todos os empreendedores. Com ele ao seu lado, seu Instagram nunca mais será o mesmo.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { emoji: "🎨", title: "Design Profissional", desc: "Posts com identidade visual única e impactante" },
                { emoji: "✍️", title: "Copy Estratégica", desc: "Textos pensados para engajar e converter" },
                { emoji: "📅", title: "Entrega Pontual", desc: "Seu conteúdo pronto antes do prazo, sempre" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 glass rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
