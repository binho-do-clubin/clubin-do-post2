import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const PLAN_LABELS: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  elite: "Elite",
};

const PLAN_PRICES: Record<string, { monthly: number; annual: number }> = {
  starter: { monthly: 97, annual: 77 },
  pro: { monthly: 197, annual: 157 },
  elite: { monthly: 397, annual: 317 },
};

const PLAN_COLORS: Record<string, string> = {
  starter: "#00AEEF",
  pro: "#6A0DAD",
  elite: "#9B59B6",
};

interface Props {
  open: boolean;
  onClose: () => void;
  plan: string;
  isAnnual: boolean;
}

export default function RegisterModal({ open, onClose, plan, isAnnual }: Props) {
  const [step, setStep] = useState<"form" | "payment">("form");
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    whatsapp: "",
    billingType: "PIX" as "PIX" | "CREDIT_CARD" | "BOLETO",
  });

  const register = trpc.customer.register.useMutation({
    onSuccess: (data) => {
      setPaymentLink(data.paymentLink);
      setStep("payment");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao criar cadastro. Tente novamente.");
    },
  });

  const planLabel = PLAN_LABELS[plan] ?? plan;
  const price = isAnnual ? PLAN_PRICES[plan]?.annual : PLAN_PRICES[plan]?.monthly;
  const planColor = PLAN_COLORS[plan] ?? "#6A0DAD";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.whatsapp) {
      toast.error("Preencha todos os campos.");
      return;
    }
    register.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
      whatsapp: form.whatsapp,
      plan: plan as "starter" | "pro" | "elite",
      billingType: form.billingType,
      billingCycle: isAnnual ? "annual" : "monthly",
    });
  }

  function handleClose() {
    setStep("form");
    setPaymentLink(null);
    setForm({ name: "", email: "", password: "", whatsapp: "", billingType: "PIX" });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#1A1A1A] border border-white/10 text-white max-w-md">
        {step === "form" ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  className="text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: planColor }}
                >
                  Plano {planLabel}
                </Badge>
                <span className="text-white/60 text-sm">
                  R$ {price}/mês
                </span>
              </div>
              <DialogTitle className="text-xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                Criar sua conta
              </DialogTitle>
              <DialogDescription className="text-white/60 text-sm">
                Preencha seus dados para começar. Após o cadastro, você será redirecionado para o pagamento.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Label className="text-white/80 text-sm mb-1 block">Nome completo</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Seu nome"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm mb-1 block">E-mail</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm mb-1 block">Senha</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm mb-1 block">WhatsApp</Label>
                <Input
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="(14) 99999-9999"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm mb-2 block">Forma de pagamento</Label>
                <div className="flex gap-2">
                  {(["PIX", "CREDIT_CARD", "BOLETO"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, billingType: type })}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        form.billingType === type
                          ? "border-purple-500 bg-purple-500/20 text-white"
                          : "border-white/10 bg-white/5 text-white/50 hover:border-white/30"
                      }`}
                    >
                      {type === "PIX" ? "Pix" : type === "CREDIT_CARD" ? "Cartão" : "Boleto"}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={register.isPending}
                className="w-full py-3 rounded-2xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${planColor}, #6A0DAD)` }}
              >
                {register.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Criando conta...</>
                ) : (
                  "Criar conta e ir para pagamento →"
                )}
              </Button>

              <p className="text-center text-white/40 text-xs">
                Já tem conta?{" "}
                <a href="/painel" className="text-purple-400 hover:underline">
                  Fazer login
                </a>
              </p>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <DialogTitle className="text-xl font-bold text-white text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                Conta criada com sucesso!
              </DialogTitle>
              <DialogDescription className="text-white/60 text-sm text-center">
                Agora finalize o pagamento para ativar seu plano {planLabel}.
                Você também receberá o link no seu WhatsApp.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              {paymentLink ? (
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-white text-sm"
                  style={{ background: "linear-gradient(135deg, #6A0DAD, #9B59B6)" }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Ir para o pagamento
                </a>
              ) : (
                <p className="text-center text-white/60 text-sm">
                  O link de pagamento foi enviado para o seu WhatsApp. Verifique suas mensagens!
                </p>
              )}

              <Button
                variant="outline"
                className="w-full border-white/10 text-white/60 hover:text-white hover:border-white/30 bg-transparent"
                onClick={handleClose}
              >
                Fechar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
