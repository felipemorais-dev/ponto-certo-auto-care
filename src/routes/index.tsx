import { createFileRoute } from "@tanstack/react-router";
import { Wrench, Droplets, Disc3, ShieldCheck, Clock, MapPin, MessageCircle, AlertTriangle, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import hero640 from "@/assets/hero-oficina-640.webp";
import hero1280 from "@/assets/hero-oficina-1280.webp";
import gMec640 from "@/assets/galeria-mecanico-640.webp";
import gMec1280 from "@/assets/galeria-mecanico-1280.webp";
import gFer640 from "@/assets/galeria-ferramentas-640.webp";
import gFer1280 from "@/assets/galeria-ferramentas-1280.webp";
import gFre640 from "@/assets/galeria-freios-640.webp";
import gFre1280 from "@/assets/galeria-freios-1280.webp";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oficina Ponto Certo — projeto demonstrativo de portfólio" },
      { name: "description", content: "Landing page fictícia de uma oficina mecânica em São Gonçalo, RJ, criada como demonstração de portfólio." },
      { property: "og:title", content: "Oficina Ponto Certo — projeto demonstrativo" },
      { property: "og:description", content: "Landing page fictícia de oficina mecânica para portfólio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const AVISO = "PROJETO DEMONSTRATIVO — empresa, serviços, preços, endereço e contato fictícios";

const servicos = [
  { nome: "Revisão básica", desc: "Inspeção visual de itens essenciais do veículo.", preco: "A partir de R$ 180,00", Icon: Wrench },
  { nome: "Troca de óleo e filtro", desc: "Serviço demonstrativo, com óleo e filtro sujeitos ao modelo do veículo.", preco: "A partir de R$ 150,00", Icon: Droplets },
  { nome: "Inspeção do sistema de freios", desc: "Verificação de pastilhas, discos e componentes.", preco: "A partir de R$ 90,00", Icon: ShieldCheck },
  { nome: "Troca de pastilhas de freio", desc: "Valor demonstrativo, sujeito ao modelo do veículo e às peças necessárias.", preco: "A partir de R$ 220,00", Icon: Disc3 },
];

const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#horarios", label: "Horários" },
  { href: "#localizacao", label: "Localização" },
];

function Aviso() {
  return (
    <div className="bg-primary px-3 py-1.5 text-center text-[11px] leading-snug font-semibold text-primary-foreground sm:text-sm">
      <AlertTriangle className="mr-1.5 inline h-4 w-4 align-[-3px]" aria-hidden />
      {AVISO}
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 shadow-sm">
        <Aviso />
        <div className="bg-graphite text-graphite-foreground">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 md:py-3">
            <a href="#inicio" className="flex min-w-0 items-center gap-2 font-display text-lg font-bold uppercase tracking-wide sm:text-2xl">
              <Wrench className="h-6 w-6 shrink-0 text-primary" aria-hidden />
              <span className="truncate">Oficina <span className="text-primary">Ponto Certo</span></span>
            </a>
            <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
              {nav.map((n) => (
                <a key={n.href} href={n.href} aria-current={active === n.href.slice(1) ? "true" : undefined} className="rounded-sm text-sm font-medium hover:text-primary aria-[current]:text-primary">{n.label}</a>
              ))}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Pedir orçamento</a>
            </nav>
            <button className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-md hover:bg-graphite-foreground/10 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {open && (
            <nav className="flex max-h-[calc(100vh-7rem)] flex-col gap-1 overflow-y-auto border-t border-graphite-foreground/10 px-4 pb-5 pt-2 md:hidden" aria-label="Menu móvel">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={active === n.href.slice(1) ? "true" : undefined} className="flex items-center justify-between rounded-md border-l-4 border-transparent px-3 py-3 text-base font-semibold hover:bg-graphite-foreground/10 aria-[current]:border-primary aria-[current]:bg-graphite-foreground/10 aria-[current]:text-primary">
                  {n.label}
                  {active === n.href.slice(1) && <span className="text-xs font-medium uppercase tracking-wide">Você está aqui</span>}
                </a>
              ))}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-center font-semibold text-primary-foreground">Pedir orçamento</a>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section id="inicio" className="bg-graphite text-graphite-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:py-14 md:grid-cols-2 md:gap-10 md:py-20">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">São Gonçalo — RJ · fictício</p>
              <h1 className="font-display text-[2.5rem] font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">Cuidado e confiança para seguir caminho.</h1>
              <p className="mt-4 max-w-md text-base opacity-95 sm:mt-5 sm:text-lg">Manutenção automotiva com atendimento claro e serviços para o dia a dia.</p>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-7 flex w-full min-h-14 items-center justify-center gap-2 rounded-md bg-primary px-5 py-4 sm:inline-flex sm:w-auto text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90">
                <MessageCircle className="h-5 w-5" aria-hidden /> Pedir orçamento pelo WhatsApp
              </a>
              <p className="mt-3 text-xs opacity-90">Contato demonstrativo: {WHATSAPP_DISPLAY}</p>
            </div>
            <img src={hero1280} srcSet={`${hero640} 640w, ${hero1280} 1280w`} sizes="(min-width: 768px) 560px, calc(100vw - 2rem)" decoding="async" alt="Imagem demonstrativa de uma oficina mecânica organizada" width={1536} height={1024} fetchPriority="high" className="aspect-[3/2] w-full rounded-lg object-cover shadow-2xl" />
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-3xl px-5 py-12 text-center sm:py-16 md:py-20">
          <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">Sobre a Ponto Certo</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          <p className="mt-5 text-base leading-relaxed sm:mt-6 sm:text-lg text-muted-foreground">
            A Oficina Ponto Certo é uma empresa fictícia criada para esta demonstração de portfólio. Esta página ilustra como uma oficina poderia apresentar seus serviços e facilitar o contato de novos clientes.
          </p>
        </section>

        <section id="servicos" className="bg-muted py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">Serviços</h2>
              <p className="mt-2 inline-block rounded-full bg-accent px-4 py-1 text-sm font-medium">Serviços e valores fictícios para demonstração</p>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {servicos.map(({ nome, desc, preco, Icon }) => (
                <article key={nome} className="flex flex-col rounded-lg border bg-card p-5 sm:p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-graphite text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{nome}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{desc}</p>
                  <p className="mt-4 font-display text-2xl font-bold text-primary-ink">{preco}</p>
                  <a href={whatsappLink(nome)} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-12 items-center justify-center rounded-md border-2 border-graphite px-4 py-2.5 text-center text-sm font-semibold hover:bg-graphite hover:text-graphite-foreground">Consultar serviço</a>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">Valores ilustrativos. O orçamento real depende do veículo, das peças e da avaliação do serviço.</p>
          </div>
        </section>

        <section id="galeria" className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20">
          <h2 className="text-center font-display text-3xl font-bold uppercase sm:text-4xl">Galeria</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Imagens ilustrativas geradas para esta demonstração — não retratam trabalhos realizados.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {[
              { src: gMec1280, s: gMec640, alt: "Imagem ilustrativa de mãos de mecânico trabalhando em um motor" },
              { src: gFer1280, s: gFer640, alt: "Imagem ilustrativa de ferramentas organizadas na parede" },
              { src: gFre1280, s: gFre640, alt: "Imagem ilustrativa de disco e pastilhas de freio" },
            ].map((g, i) => (
              <img key={g.alt} src={g.src} srcSet={`${g.s} 640w, ${g.src} 1280w`} sizes={i === 0 ? "(min-width: 640px) 33vw, 100vw" : "(min-width: 640px) 33vw, 50vw"} width={1280} height={960} alt={g.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover first:col-span-2 sm:first:col-span-1" />
            ))}
          </div>
        </section>

        <section className="bg-graphite py-12 text-graphite-foreground sm:py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:gap-6 md:grid-cols-2">
            <div id="horarios" className="rounded-lg border border-graphite-foreground/15 p-5 scroll-mt-28 sm:p-6">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold uppercase sm:text-3xl"><Clock className="h-6 w-6 text-primary" aria-hidden /> Horários</h2>
              <p className="mt-1 text-sm opacity-90">Horário demonstrativo (fictício)</p>
              <dl className="mt-5 space-y-3">
                {[["Segunda a sexta", "8h às 18h"], ["Sábado", "8h às 13h"], ["Domingo", "Fechado"]].map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-4 border-b border-graphite-foreground/10 pb-2">
                    <dt>{d}</dt><dd className="font-semibold">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div id="localizacao" className="rounded-lg border border-graphite-foreground/15 p-6 scroll-mt-24">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold uppercase sm:text-3xl"><MapPin className="h-6 w-6 text-primary" aria-hidden /> Localização</h2>
              <p className="mt-1 text-sm opacity-90">Endereço demonstrativo (fictício) — sem mapa</p>
              <p className="mt-5 text-lg">Rua dos Motores, 123 — endereço fictício, São Gonçalo — RJ</p>
              <p className="mt-4 text-sm opacity-90">Contato demonstrativo: {WHATSAPP_DISPLAY}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-graphite text-graphite-foreground">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm opacity-90">
          Oficina Ponto Certo · projeto de portfólio. Nenhum serviço real é oferecido.
        </div>
        <div className="pb-20 md:pb-0 bg-primary"><Aviso /></div>
      </footer>

      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp demonstrativo" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex min-h-14 items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-graphite-foreground shadow-xl hover:opacity-90">
        <MessageCircle className="h-6 w-6" aria-hidden />
        <span>WhatsApp <span className="font-normal">(demo)</span></span>
      </a>
    </div>
  );
}
