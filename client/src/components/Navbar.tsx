import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const BINHO_MAIN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho-main_645ac795.png";

const navLinks = [
  { label: "O que é", href: "#sobre" },
  { label: "Galeria", href: "#galeria" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#1A1A1A]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <div className="relative">
              <img src={BINHO_MAIN} alt="Binho" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-800 text-white text-base leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800 }}>
                Clubin
              </span>
              <span className="text-xs font-medium gradient-brand-text" style={{ fontFamily: "Poppins, sans-serif" }}>
                do Post
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-brand group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#planos"
              onClick={(e) => { e.preventDefault(); handleNavClick("#planos"); }}
              className="btn-cta px-5 py-2.5 text-sm text-white font-semibold"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Ver Planos
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-[#1A1A1A]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-5 right-5 p-2 text-white/80"
              onClick={() => setMobileOpen(false)}
            >
              <X size={26} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-2xl font-bold text-white hover:gradient-brand-text transition-all"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#planos"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => { e.preventDefault(); handleNavClick("#planos"); }}
              className="btn-cta px-8 py-3 text-white font-bold text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Ver Planos
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
