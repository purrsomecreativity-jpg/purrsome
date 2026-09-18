"use client";
import Link from "next/link";
import { Instagram, LayoutGrid, Mail, MessageCircle, Sparkles, type LucideIcon } from "lucide-react";
import { T, useLang } from "../components/shared";

const ITEM_STYLE: Record<string, { accent: string; Icon: LucideIcon }> = {
  whatsapp: { accent: "#DC4A0A", Icon: MessageCircle },
  start: { accent: "#14B8A6", Icon: Sparkles },
  work: { accent: "#9333EA", Icon: LayoutGrid },
  instagram: { accent: "#EC4899", Icon: Instagram },
  email: { accent: "#F59E0B", Icon: Mail },
};

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]";

export default function Links() {
  const [lang, setLang] = useLang();
  const t = T[lang];

  return (
    <main className="relative bg-[#050507] text-white min-h-screen overflow-x-hidden">
      <div className="max-w-[460px] mx-auto px-4 pt-6 pb-10 flex flex-col items-center">
        <div className="w-full flex justify-end">
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            aria-label={lang === "en" ? "Cambiar a español" : "Switch to English"}
            className={`text-[11px] tracking-[0.2em] font-medium px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-[#050507] hover:bg-white transition-colors duration-300 motion-reduce:transition-none ${focusRing}`}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>

        <img src="/brand/isotipo-gradiente.png" alt="" width={100} height={100} className="w-[100px] h-[100px] object-contain mt-2" />
        <img src="/brand/wordmark-white.png" alt="Purrsome" width={240} className="w-[240px] h-auto mt-5" />

        <p
          className="mt-4 text-[12px] uppercase tracking-[0.25em] font-semibold bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #14B8A6, #EC4899, #F59E0B)" }}
        >
          Refuse to Blend In.™
        </p>
        <p className="mt-2 text-[13px] text-white/50 text-center">Andrea Villafañe · CEO &amp; Directora Creativa</p>

        <h1 className="mt-8 text-2xl font-extrabold text-center leading-tight">{t.links.title}</h1>
        <p className="mt-2 text-sm text-white/50 text-center">{t.links.sub}</p>

        <ul className="w-full mt-6 flex flex-col gap-3">
          {t.links.items.map(item => {
            const { accent, Icon } = ITEM_STYLE[item.key];
            const className = `flex items-center gap-4 min-h-[56px] px-4 py-3 rounded-[14px] bg-[#111116] border border-[#232329] border-l-4 hover:bg-[#17171d] transition-colors duration-300 motion-reduce:transition-none ${focusRing}`;
            const content = (
              <>
                <Icon aria-hidden className="w-5 h-5 shrink-0" style={{ color: accent }} />
                <span className="flex flex-col min-w-0">
                  <span className="font-semibold text-[15px] leading-tight">{item.label}</span>
                  <span className="text-[13px] text-white/50 leading-tight mt-0.5 truncate">{item.sub}</span>
                </span>
              </>
            );
            return (
              <li key={item.key}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener" className={className} style={{ borderLeftColor: accent }}>
                    {content}
                  </a>
                ) : (
                  <Link href={item.href} className={className} style={{ borderLeftColor: accent }}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-[11px] tracking-[0.15em] text-white/35 text-center">
          Kissimmee, FL · Web · Branding · SEO · Ads · ES / EN
        </p>
      </div>
    </main>
  );
}
