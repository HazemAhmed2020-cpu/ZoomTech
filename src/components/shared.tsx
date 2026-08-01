import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy, Terminal, Lightbulb, TriangleAlert, Info } from "lucide-react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Reveal — scroll-triggered entrance animation                        */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 26,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Card — glass surface                                                */
/* ------------------------------------------------------------------ */
export function Card({
  children,
  className,
  strong,
}: {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-3xl shadow-xl shadow-black/30",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pill / Badge                                                        */
/* ------------------------------------------------------------------ */
export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-indigo-200",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading                                                      */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  index,
  title,
  subtitle,
  icon,
}: {
  index?: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-8">
      {index && (
        <Reveal>
          <Pill className="mb-3">
            {icon}
            {index}
          </Pill>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-300">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CodeBlock — prism syntax highlight + copy                           */
/* ------------------------------------------------------------------ */
export function CodeBlock({
  code,
  language = "python",
  title = "Python",
  className,
}: {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.replace(/^\n+|\n+$/g, "");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <Reveal
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[#0c1124] shadow-lg shadow-black/40",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
          <span className="mr-2 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <Terminal className="h-3.5 w-3.5" />
            {title}
          </span>
        </div>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" /> تم النسخ
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> نسخ
            </>
          )}
        </button>
      </div>
      <div className="flex bg-[#0c1124]" dir="ltr">
        {/* line numbers gutter */}
        <div
          aria-hidden
          className="mono select-none overflow-hidden border-r border-white/5 py-4 pl-4 pr-3 text-right text-[14px] leading-[1.7] text-slate-600"
        >
          {trimmed.split("\n").map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <Highlight theme={themes.nightOwl} code={trimmed} language={language}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="mono overflow-x-auto py-4 pr-4 pl-3 text-[14px] leading-[1.7]"
              style={{ ...style, background: "transparent", margin: 0 }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line });
                return (
                  <div key={i} {...lineProps}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Output — console-style result block                                 */
/* ------------------------------------------------------------------ */
export function Output({ text, label = "المخرجات" }: { text: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-500/5">
      <div className="flex items-center gap-2 border-b border-emerald-400/15 px-4 py-2 text-xs font-bold text-emerald-300">
        <Terminal className="h-3.5 w-3.5" />
        {label}
      </div>
      <pre className="mono overflow-x-auto px-4 py-3 text-[13px] leading-relaxed text-emerald-200">
        {text}
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Callouts                                                            */
/* ------------------------------------------------------------------ */
const calloutStyles = {
  tip: {
    icon: <Lightbulb className="h-5 w-5" />,
    ring: "border-amber-400/30 bg-amber-400/10",
    text: "text-amber-200",
  },
  warn: {
    icon: <TriangleAlert className="h-5 w-5" />,
    ring: "border-rose-400/30 bg-rose-400/10",
    text: "text-rose-200",
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    ring: "border-cyan-400/30 bg-cyan-400/10",
    text: "text-cyan-200",
  },
};

export function Callout({
  type = "tip",
  title,
  children,
}: {
  type?: "tip" | "warn" | "info";
  title: string;
  children: ReactNode;
}) {
  const s = calloutStyles[type];
  return (
    <Reveal>
      <div className={cn("flex gap-3 rounded-2xl border p-4", s.ring)}>
        <div className={cn("mt-0.5 shrink-0", s.text)}>{s.icon}</div>
        <div className="flex-1">
          <p className={cn("mb-1 font-extrabold", s.text)}>{title}</p>
          <div className="text-sm leading-relaxed text-slate-200">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* ConceptArt — framed illustration for each lesson                    */
/* ------------------------------------------------------------------ */
export function ConceptArt({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <figure className="group relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-cyan-500/20" />
        <img
          src={src}
          alt={alt}
          className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {caption && (
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-12 text-center text-sm font-bold text-white">
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* KeyTerm — inline highlighted keyword                                */
/* ------------------------------------------------------------------ */
export function K({ children }: { children: ReactNode }) {
  return (
    <code className="mono rounded-md border border-indigo-400/30 bg-indigo-500/15 px-1.5 py-0.5 text-[0.85em] font-bold text-indigo-200">
      {children}
    </code>
  );
}

/* ------------------------------------------------------------------ */
/* FeatureList                                                         */
/* ------------------------------------------------------------------ */
export function Feature({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <div className="glass h-full rounded-2xl p-5 transition hover:-translate-y-1 hover:border-indigo-400/40">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20 text-2xl">
          {emoji}
        </div>
        <h4 className="mb-1.5 font-extrabold text-white">{title}</h4>
        <p className="text-sm leading-relaxed text-slate-300">{children}</p>
      </div>
    </Reveal>
  );
}
