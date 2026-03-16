import { motion } from "framer-motion";
import { Instagram, Youtube, MessageCircle, Mail } from "lucide-react";

const BINHO_HEADSET = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho-headset_90e9665d.png";

const socialLinks = [
  { icon: <Instagram size={18} />, label: "Instagram", href: "https://instagram.com/clubindopost", color: "#E1306C" },
  { icon: <MessageCircle size={18} />, label: "WhatsApp", href: "https://wa.me/5500000000000", color: "#25D366" },
  { icon: <Youtube size={18} />, label: "YouTube", href: "https://youtube.com/@clubindopost", color: "#FF0000" },
  { icon: <Mail size={18} />, label: "E-mail", href: "mailto:contato@clubindopost.com.br", color: "#00AEEF" },
];

const footerLinks = {
  "Produto": [
    { label: "O que é o Clubin", href: "#sobre" },
    { label: "Galeria de Posts", href: "#galeria" },
    { label: "Planos e Preços", href: "#planos" },
    { label: "Depoimentos", href: "#depoimentos" },
  ],
  "Suporte": [
    { label: "FAQ", href: "#faq" },
    { label: "WhatsApp", href: "https://wa.me/5500000000000" },
    { label: "E-mail", href: "mailto:contato@clubindopost.com.br" },
  ],
  "Legal": [
    { label: "Termos de Uso", href: "#" },
    { label: "Política de Privacidade", href: "#" },
    { label: "Política de Reembolso", href: "#" },
  ],
};

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#111] relative overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(106,13,173,0.08) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <img src={BINHO_HEADSET} alt="Binho" className="w-12 h-12 object-contain" />
              <div>
                <p className="text-xl font-black text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Clubin do Post
                </p>
                <p className="text-xs gradient-brand-text font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Conteúdo que converte
                </p>
              </div>
            </div>

            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Transformamos o Instagram de empreendedores em canais de vendas reais, com design profissional e estratégia de conteúdo.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
                  style={{ "--hover-color": social.color } as React.CSSProperties}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { if (link.href.startsWith("#")) { e.preventDefault(); handleNavClick(link.href); } }}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2024 Clubin do Post. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/20" style={{ fontFamily: "Inter, sans-serif" }}>
            Feito com ❤️ pelo Binho
          </p>
        </div>
      </div>
    </footer>
  );
}
