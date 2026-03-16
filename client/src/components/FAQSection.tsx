import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Como funciona o processo de criação dos posts?",
    a: "É simples! Após assinar, você preenche um briefing detalhado sobre seu negócio, nicho e objetivos. Nossa equipe cria todos os posts personalizados para sua marca. Você recebe para aprovação e pode solicitar ajustes. Após aprovação, os posts ficam prontos para publicar.",
  },
  {
    q: "Como vocês entendem do meu nicho específico?",
    a: "Nosso processo de onboarding inclui uma pesquisa aprofundada sobre seu nicho, concorrentes e público-alvo. Temos experiência em mais de 50 nichos diferentes e nossa equipe de designers e copywriters se especializa no seu segmento antes de criar qualquer conteúdo.",
  },
  {
    q: "E se eu precisar de mais posts em um mês?",
    a: "Sem problema! Oferecemos pacotes adicionais de posts avulsos ou você pode fazer upgrade para um plano superior. Também temos planos customizados para necessidades específicas. Fale com nosso time pelo WhatsApp para montar a solução ideal para você.",
  },
  {
    q: "Qual a diferença entre vocês e contratar um freelancer?",
    a: "Com um freelancer, você depende de uma única pessoa que pode sumir, atrasar ou não entender seu negócio. Com o Clubin, você tem uma equipe completa (designers, copywriters, estrategistas), processo estruturado, prazos garantidos e suporte dedicado — tudo por um valor mensal previsível.",
  },
  {
    q: "Em quanto tempo recebo meus posts?",
    a: "Após o onboarding e aprovação do briefing, os primeiros posts são entregues em até 5 dias úteis (plano Starter), 3 dias úteis (plano Pro) ou 48 horas (plano Elite). Nos meses seguintes, você recebe os posts no início de cada mês.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim! Não há fidelidade ou multa de cancelamento. Você pode cancelar a qualquer momento. Além disso, oferecemos garantia de 7 dias: se não ficar satisfeito, devolvemos 100% do valor investido sem perguntas.",
  },
  {
    q: "Os posts são exclusivos para minha marca?",
    a: "Absolutamente! Todo o conteúdo é criado exclusivamente para você, com sua identidade visual, cores, fontes e mensagens. Nunca reutilizamos conteúdo entre clientes. Você recebe posts únicos que refletem a personalidade da sua marca.",
  },
  {
    q: "Vocês publicam os posts para mim?",
    a: "Atualmente entregamos os posts prontos para você publicar, pois acreditamos que a interação com seu público é importante. Porém, fornecemos legendas completas, hashtags estratégicas e sugestões de horário de publicação para maximizar o alcance.",
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: open ? "rgba(106,13,173,0.1)" : "#1A1A1A", border: open ? "1px solid rgba(106,13,173,0.3)" : "1px solid rgba(255,255,255,0.06)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
      >
        <span className="text-sm sm:text-base font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
          {item.q}
        </span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            open ? "gradient-brand text-white" : "bg-white/10 text-white/60"
          }`}
        >
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <p className="text-sm text-white/60 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}>
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Sem letras miúdas.{" "}
            <span className="gradient-brand-text">Suas dúvidas respondidas.</span>
          </h2>
          <p className="text-base text-white/60"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Tudo que você precisa saber antes de começar
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center glass rounded-3xl p-6"
        >
          <p className="text-white/60 text-sm mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
            Ainda tem dúvidas? Fale diretamente com nossa equipe!
          </p>
          <a
            href="https://wa.me/5500000000000?text=Olá! Tenho dúvidas sobre o Clubin do Post."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta inline-flex items-center gap-2 px-6 py-3 text-white font-bold text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            💬 Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
