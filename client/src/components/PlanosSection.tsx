import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Crown, Zap, Star } from "lucide-react";

const DESCONTO_5 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/desconto-5_2f3db34f.png";
const DESCONTO_10 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/desconto-10_941675c4.png";
const DESCONTO_15 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/desconto-15_3e416cac.png";
const BINHO_SITTING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho-sitting_1c31bdf4.png";

const plans = [
  {
    name: "Starter",
    icon: <Zap className="w-5 h-5" />,
    monthlyPrice: 97,
    annualPrice: 77,
    color: "#00AEEF",
    discount: DESCONTO_5,
    discountLabel: "5% off",
    description: "Ideal para quem está começando a profissionalizar o Instagram",
    features: [
      "15 posts por mês",
      "Design personalizado",
      "Legendas estratégicas",
      "1 revisão por post",
      "Entrega em 5 dias úteis",
      "Suporte por WhatsApp",
    ],
    notIncluded: [
      "Stories",
      "Reels",
      "Relatório mensal",
    ],
    cta: "Começar Agora",
    popular: false,
  },
  {
    name: "Pro",
    icon: <Crown className="w-5 h-5" />,
    monthlyPrice: 197,
    annualPrice: 157,
    color: "#6A0DAD",
    discount: DESCONTO_10,
    discountLabel: "10% off",
    description: "A escolha dos empreendedores que querem resultados reais",
    features: [
      "30 posts por mês",
      "Design premium personalizado",
      "Legendas com copy de vendas",
      "2 revisões por post",
      "Entrega em 3 dias úteis",
      "10 Stories por mês",
      "Suporte prioritário",
      "Relatório mensal de resultados",
    ],
    notIncluded: [
      "Reels",
    ],
    cta: "Quero o Plano Pro",
    popular: true,
  },
  {
    name: "Elite",
    icon: <Star className="w-5 h-5" />,
    monthlyPrice: 397,
    annualPrice: 317,
    color: "#9B59B6",
    discount: DESCONTO_15,
    discountLabel: "15% off",
    description: "Para marcas que querem dominar o Instagram com presença total",
    features: [
      "50 posts por mês",
      "Design ultra premium",
      "Copy estratégica avançada",
      "Revisões ilimitadas",
      "Entrega em 48 horas",
      "20 Stories por mês",
      "4 Reels por mês",
      "Gerente de conta dedicado",
      "Relatório semanal",
      "Estratégia de conteúdo mensal",
    ],
    notIncluded: [],
    cta: "Quero o Plano Elite",
    popular: false,
  },
];

function PlanCard({ plan, index, isAnnual }: { plan: typeof plans[0]; index: number; isAnnual: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative rounded-3xl overflow-visible ${plan.popular ? "scale-105 z-10" : ""}`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="gradient-brand rounded-full px-4 py-1.5 text-xs font-bold text-white whitespace-nowrap shadow-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            ⭐ Mais Popular
          </div>
        </div>
      )}

      <div
        className={`h-full rounded-3xl p-6 sm:p-8 relative overflow-hidden ${
          plan.popular
            ? "bg-gradient-to-b from-[#6A0DAD]/20 to-[#2C2C2C]"
            : "bg-[#2C2C2C]"
        }`}
        style={plan.popular ? { border: "1px solid rgba(106,13,173,0.4)", boxShadow: "0 30px 80px rgba(106,13,173,0.3)" } : { border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Discount badge */}
        {isAnnual && (
          <div className="absolute top-4 right-4 w-16 h-16">
            <img src={plan.discount} alt={plan.discountLabel} className="w-full h-full object-contain animate-spin-slow" />
          </div>
        )}

        {/* Plan header */}
        <div className="mb-6">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: `${plan.color}20`, color: plan.color }}
          >
            {plan.icon}
          </div>
          <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
            {plan.name}
          </h3>
          <p className="text-xs text-white/50 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div className="mb-6">
          {isAnnual && (
            <p className="text-sm text-white/40 line-through mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
              R$ {plan.monthlyPrice}/mês
            </p>
          )}
          <div className="flex items-end gap-1">
            <span className="text-sm text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>R$</span>
            <span className="text-4xl font-black text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
              {price}
            </span>
            <span className="text-sm text-white/60 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>/mês</span>
          </div>
          {isAnnual && (
            <p className="text-xs text-green-400 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
              Cobrado anualmente — você economiza R$ {(plan.monthlyPrice - plan.annualPrice) * 12}/ano
            </p>
          )}
        </div>

        {/* CTA */}
        <button
          className={`w-full py-3.5 rounded-2xl font-bold text-sm mb-6 transition-all duration-300 ${
            plan.popular
              ? "btn-cta text-white"
              : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
          }`}
          style={{ fontFamily: "Poppins, sans-serif" }}
          onClick={() => {
            const msg = `Olá! Tenho interesse no Plano ${plan.name} do Clubin do Post.`;
            window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(msg)}`, "_blank");
          }}
        >
          {plan.cta}
        </button>

        {/* Features */}
        <div className="space-y-2.5">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${plan.color}20` }}
              >
                <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
              </div>
              <span className="text-sm text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
                {feature}
              </span>
            </div>
          ))}
          {plan.notIncluded.map((feature, i) => (
            <div key={`no-${i}`} className="flex items-start gap-2.5 opacity-40">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/10">
                <span className="text-[8px] text-white/50">✕</span>
              </div>
              <span className="text-sm text-white/40 line-through" style={{ fontFamily: "Inter, sans-serif" }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PlanosSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="planos" className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #6A0DAD 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Planos e Preços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Planos flexíveis para{" "}
            <span className="gradient-brand-text">decolar seu negócio</span>
          </h2>
          <p className="text-base text-white/60 max-w-xl mx-auto mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Escolha o plano ideal e comece a transformar seu Instagram hoje mesmo
          </p>

          {/* Toggle mensal/anual */}
          <div className="inline-flex items-center gap-3 glass rounded-full p-1.5">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                !isAnnual ? "gradient-brand text-white shadow-lg" : "text-white/50"
              }`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isAnnual ? "gradient-brand text-white shadow-lg" : "text-white/50"
              }`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Anual
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                Economize até 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start mb-16">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-6 glass rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto"
        >
          <div className="flex-shrink-0">
            <div className="w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              🛡️
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              Garantia Incondicional de 7 Dias
            </h3>
            <p className="text-sm text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>
              Ame ou seu dinheiro de volta. Teste o Clubin do Post por 7 dias sem nenhum risco.
              Se não ficar satisfeito, devolvemos 100% do valor investido.
            </p>
          </div>
        </motion.div>

        {/* Binho with crown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mt-12"
        >
          <div className="relative inline-block">
            <img
              src={BINHO_SITTING}
              alt="Binho sentado"
              className="w-32 sm:w-40 mx-auto animate-float"
              style={{ filter: "drop-shadow(0 10px 30px rgba(106,13,173,0.4))" }}
            />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
              👑
            </div>
            <div className="absolute -right-4 top-4 glass rounded-2xl px-3 py-1.5">
              <p className="text-xs font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                "A escolha dos campeões!"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
