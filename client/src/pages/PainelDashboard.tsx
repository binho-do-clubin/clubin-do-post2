import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageCircle,
  LogOut,
  RefreshCw,
  Star,
  Zap,
  Crown,
} from "lucide-react";

const BINHO_CHAT_URL = "https://binhochat-btkg2qy7.manus.space";

const PLAN_ICONS: Record<string, React.ReactNode> = {
  starter: <Zap className="w-5 h-5" />,
  pro: <Crown className="w-5 h-5" />,
  elite: <Star className="w-5 h-5" />,
};

const PLAN_COLORS: Record<string, string> = {
  starter: "#00AEEF",
  pro: "#6A0DAD",
  elite: "#9B59B6",
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  active: {
    label: "Ativo",
    color: "text-green-400",
    icon: <CheckCircle className="w-4 h-4" />,
    bg: "bg-green-500/10 border-green-500/30",
  },
  pending: {
    label: "Aguardando pagamento",
    color: "text-yellow-400",
    icon: <Clock className="w-4 h-4" />,
    bg: "bg-yellow-500/10 border-yellow-500/30",
  },
  overdue: {
    label: "Pagamento em atraso",
    color: "text-red-400",
    icon: <AlertCircle className="w-4 h-4" />,
    bg: "bg-red-500/10 border-red-500/30",
  },
  cancelled: {
    label: "Cancelado",
    color: "text-white/40",
    icon: <AlertCircle className="w-4 h-4" />,
    bg: "bg-white/5 border-white/10",
  },
};

function formatDate(ts: number | string | null | undefined) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("pt-BR");
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function PainelDashboard() {
  const [, navigate] = useLocation();

  const { data: customer, isLoading: loadingCustomer } = trpc.customer.me.useQuery();
  const { data: subscription, isLoading: loadingSub } = trpc.customer.mySubscription.useQuery();
  const logout = trpc.customer.logout.useMutation({
    onSuccess: () => navigate("/painel"),
  });

  useEffect(() => {
    if (!loadingCustomer && !customer) {
      navigate("/painel");
    }
  }, [customer, loadingCustomer, navigate]);

  if (loadingCustomer || loadingSub) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!customer) return null;

  const status = subscription?.status ?? "pending";
  const statusConfig = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const planColor = PLAN_COLORS[subscription?.plan ?? "pro"] ?? "#6A0DAD";
  const planIcon = PLAN_ICONS[subscription?.plan ?? "pro"];

  const binhoChatUrl = subscription
    ? `${BINHO_CHAT_URL}/?plano=${subscription.plan}&cliente=${encodeURIComponent(customer.name)}`
    : BINHO_CHAT_URL;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #6A0DAD 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-[#0F0F0F]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
              style={{ background: "linear-gradient(135deg, #6A0DAD, #9B59B6)" }}>
              C
            </div>
            <span className="font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
              Clubin do Post
            </span>
            <span className="text-white/30 text-sm hidden sm:block">— Painel do Cliente</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm hidden sm:block">{customer.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout.mutate()}
              className="text-white/50 hover:text-white hover:bg-white/10 gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Olá, {customer.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-white/50 text-sm mt-1">Aqui está o resumo do seu plano e acesso ao Binho.</p>
        </div>

        {/* Plan card */}
        {subscription ? (
          <div
            className="rounded-3xl p-6 sm:p-8 border relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${planColor}15, #1A1A1A)`,
              borderColor: `${planColor}40`,
            }}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-2xl pointer-events-none"
              style={{ background: planColor }} />

            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${planColor}25`, color: planColor }}>
                    {planIcon}
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                      Seu plano
                    </p>
                    <h2 className="text-xl font-black text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {subscription.planLabel}
                    </h2>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    Valor mensal
                  </div>
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {formatCurrency(subscription.value)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Próxima cobrança
                  </div>
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {formatDate(subscription.nextDueDate)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Início
                  </div>
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {formatDate(subscription.createdAt instanceof Date ? subscription.createdAt.getTime() : subscription.createdAt)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    Pagamento
                  </div>
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {subscription.billingType === "PIX" ? "Pix" : subscription.billingType === "CREDIT_CARD" ? "Cartão" : "Boleto"}
                  </p>
                </div>
              </div>

              {/* What's included */}
              {subscription.planIncludes && subscription.planIncludes.length > 0 && (
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                    O que está incluso no seu plano
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {subscription.planIncludes.map((item: string, i: number) => (
                      <Badge
                        key={i}
                        className="text-white/70 text-xs font-normal bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        ✓ {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment link for pending */}
              {(status === "pending" || status === "overdue") && subscription.asaasPaymentLink && (
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
                  <p className="text-yellow-400 text-sm font-semibold mb-2">
                    {status === "pending" ? "Pagamento pendente" : "Pagamento em atraso"}
                  </p>
                  <p className="text-white/60 text-xs mb-3">
                    Clique abaixo para finalizar o pagamento e ativar seu plano.
                  </p>
                  <a
                    href={subscription.asaasPaymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6A0DAD, #9B59B6)" }}
                  >
                    <CreditCard className="w-4 h-4" />
                    Pagar agora
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl p-8 border border-white/10 bg-[#1A1A1A] text-center">
            <p className="text-white/50 text-sm mb-4">Você ainda não tem um plano ativo.</p>
            <a href="/#planos" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6A0DAD, #9B59B6)" }}>
              Ver planos disponíveis
            </a>
          </div>
        )}

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Seus dados</p>
            <div className="space-y-2">
              <p className="text-white text-sm"><span className="text-white/40">Nome:</span> {customer.name}</p>
              <p className="text-white text-sm"><span className="text-white/40">E-mail:</span> {customer.email}</p>
              <p className="text-white text-sm"><span className="text-white/40">WhatsApp:</span> {customer.whatsapp}</p>
            </div>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Precisa de ajuda?</p>
            <p className="text-white/60 text-sm mb-4">
              Fale com o Binho para tirar dúvidas sobre seu plano, briefing ou qualquer outra coisa.
            </p>
            <a
              href="https://wa.me/5514996432742"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <span className="text-green-400">●</span>
              Falar com a equipe no WhatsApp
            </a>
          </div>
        </div>

        {/* Binho Chat */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, #6A0DAD, #9B59B6)" }}>
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Chat com o Binho
                </p>
                <p className="text-white/40 text-xs">Faça seu briefing ou tire dúvidas</p>
              </div>
            </div>
            <a
              href={binhoChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Abrir em nova aba
            </a>
          </div>
          <div className="h-[600px]">
            <iframe
              src={binhoChatUrl}
              className="w-full h-full border-0"
              title="Chat com o Binho"
              allow="microphone"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
