import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BINHO_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663311439862/J8VsyJC5BTcFB8HcV2fNGU/binho-sitting_1c31bdf4.png";

export default function PainelLogin() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });

  const login = trpc.customer.login.useMutation({
    onSuccess: () => {
      navigate("/painel/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao fazer login. Verifique seus dados.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Preencha e-mail e senha.");
      return;
    }
    login.mutate(form);
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #6A0DAD 0%, transparent 70%)" }} />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={BINHO_LOGO} alt="Binho" className="w-20 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Painel do Cliente
          </h1>
          <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            Acompanhe seu plano e converse com o Binho
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">E-mail</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">Senha</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Sua senha"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={login.isPending}
              className="w-full py-3 rounded-2xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6A0DAD, #9B59B6)", fontFamily: "Poppins, sans-serif" }}
            >
              {login.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Entrando...</>
              ) : (
                "Entrar no painel"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              Ainda não tem conta?{" "}
              <a href="/#planos" className="text-purple-400 hover:underline">
                Escolha um plano
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
