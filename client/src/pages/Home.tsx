import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SobreSection from "@/components/SobreSection";
import GaleriaSection from "@/components/GaleriaSection";
import BinhoVideoSection from "@/components/BinhoVideoSection";
import PlanosSection from "@/components/PlanosSection";
import DepoimentosSection from "@/components/DepoimentosSection";
import FAQSection from "@/components/FAQSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <Navbar />
      <HeroSection />
      <SobreSection />
      <GaleriaSection />
      <BinhoVideoSection />
      <PlanosSection />
      <DepoimentosSection />
      <FAQSection />
      <CTAFinalSection />
      <Footer />
    </div>
  );
}
