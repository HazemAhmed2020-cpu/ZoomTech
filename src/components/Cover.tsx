import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Keyboard,
  ListOrdered,
  GitBranch,
  RefreshCw,
  Boxes,
  FunctionSquare,
  Calculator,
  Brain,
  PenLine,
  FileCode2,
  Sparkles,
  Terminal,
} from "lucide-react";
import coverImg from "@/assets/cover.jpg";
import { Card, Reveal, CodeBlock, Output, Pill } from "./shared";

interface TopicCard {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  tint: string;
}

const TOPICS: TopicCard[] = [
  { id: "io", title: "الإدخال والإخراج", desc: "input() و print()", icon: <Keyboard className="h-5 w-5" />, tint: "from-indigo-500/30 to-indigo-600/10" },
  { id: "lists", title: "القوائم", desc: "البنية والعمليات", icon: <ListOrdered className="h-5 w-5" />, tint: "from-violet-500/30 to-violet-600/10" },
  { id: "switch", title: "الشروط / Switch", desc: "if و match-case", icon: <GitBranch className="h-5 w-5" />, tint: "from-fuchsia-500/30 to-fuchsia-600/10" },
  { id: "loops", title: "حلقات التكرار", desc: "for و while", icon: <RefreshCw className="h-5 w-5" />, tint: "from-cyan-500/30 to-cyan-600/10" },
  { id: "software", title: "البرمجيات والويب", desc: "حر / مفتوح / ويب", icon: <Boxes className="h-5 w-5" />, tint: "from-emerald-500/30 to-emerald-600/10" },
  { id: "functions", title: "الدوال", desc: "def و return", icon: <FunctionSquare className="h-5 w-5" />, tint: "from-amber-500/30 to-amber-600/10" },
  { id: "calculator", title: "الآلة الحاسبة", desc: "تطبيق switch", icon: <Calculator className="h-5 w-5" />, tint: "from-sky-500/30 to-sky-600/10" },
  { id: "quiz", title: "الاختبار", desc: "32 سؤال تفاعلي", icon: <Brain className="h-5 w-5" />, tint: "from-teal-500/30 to-teal-600/10" },
  { id: "homework", title: "الواجب", desc: "تدريبات وسؤال مقالي", icon: <PenLine className="h-5 w-5" />, tint: "from-orange-500/30 to-orange-600/10" },
  { id: "compiler", title: "مترجم بايثون", desc: "نفّذ كودك مباشرة", icon: <FileCode2 className="h-5 w-5" />, tint: "from-lime-500/30 to-lime-600/10" },
];

/* ---- live Input/Output mini demo (on the first page) ---- */
function LiveIODemo() {
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const code = `# Live example of Input / Output
name = input("Enter your name: ")
print("Hello", name, "from ZoomTech!")`;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <CodeBlock code={code} title="input_output.py" />
        <Output
          label="المخرجات (جرّب بنفسك)"
          text={
            done && name.trim()
              ? `Enter your name: ${name}\nHello ${name} from ZoomTech!`
              : "اكتب اسمك في الصندوق بجوار الكود واضغط «اطبع» لترى النتيجة…"
          }
        />
      </div>
      <Card className="flex flex-col justify-center gap-4 p-6">
        <div className="flex items-center gap-2 text-indigo-200">
          <Terminal className="h-5 w-5" />
          <span className="font-bold">جرّب الآن — أدخل بياناتك</span>
        </div>
        <label className="text-sm font-bold text-slate-300">اسمك:</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setDone(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && setDone(true)}
          placeholder="مثال: أحمد"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-400/60"
        />
        <button
          onClick={() => setDone(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-indigo-500 to-violet-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110"
        >
          <Play className="h-4 w-4" /> اطبع النتيجة
        </button>
        {done && name.trim() && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-center font-bold text-emerald-200"
          >
            Hello {name} from ZoomTech! 🎉
          </motion.p>
        )}
      </Card>
    </div>
  );
}

export function Cover({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="mb-5 flex flex-wrap gap-2">
                <Pill>
                  <Sparkles className="h-3.5 w-3.5" /> الصف الأول البكالوريا
                </Pill>
                <Pill>الفصل الأول</Pill>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl">
                <span className="text-gradient">Zoom</span>
                <span className="text-white">Tech</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-300">
                مذكرتك التفاعلية لإتقان أساسيات البرمجة ولغة بايثون — بشرح مبسّط، وأمثلة
                كثيرة، وتطبيقات حيّة تجعل المذاكرة ممتعة. 🚀
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate("io")}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-indigo-500 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110"
                >
                  ابدأ التعلّم <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onNavigate("compiler")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  <FileCode2 className="h-4 w-4" /> جرّب المترجم
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-black text-white">
                  ح
                </div>
                <div>
                  <p className="text-xs text-slate-400">إعداد وإشراف</p>
                  <p className="font-extrabold text-white">المهندس / حازم أحمد إسماعيل</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="animate-floaty-slow">
              <img
                src={coverImg}
                alt="ZoomTech"
                className="mx-auto w-full max-w-md rounded-3xl border border-white/10 shadow-2xl shadow-black/60"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { n: "7", l: "دروس مفصّلة" },
          { n: "28", l: "سؤال تفاعلي" },
          { n: "1", l: "مترجم بايثون" },
          { n: "AI", l: "مساعد ذكي" },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 0.05}>
            <Card className="p-5 text-center">
              <div className="mono text-3xl font-black text-gradient">{s.n}</div>
              <div className="mt-1 text-sm text-slate-300">{s.l}</div>
            </Card>
          </Reveal>
        ))}
      </section>

      {/* TOPICS */}
      <section>
        <Reveal>
          <h2 className="mb-6 text-2xl font-extrabold text-white">📚 محتويات المذكرة</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.05}>
              <button
                onClick={() => onNavigate(t.id)}
                className={`group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br ${t.tint} p-5 text-right transition hover:-translate-y-1 hover:border-white/30`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  {t.icon}
                </div>
                <div className="flex-1">
                  <p className="font-extrabold text-white">{t.title}</p>
                  <p className="text-sm text-slate-300">{t.desc}</p>
                </div>
                <ArrowLeft className="h-5 w-5 text-white/40 transition group-hover:translate-x-[-4px] group-hover:text-white" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INPUT/OUTPUT on first page */}
      <section>
        <Reveal>
          <div className="mb-2 flex items-center gap-2">
            <Pill>
              <Keyboard className="h-3.5 w-3.5" /> على الصفحة الأولى
            </Pill>
          </div>
          <h2 className="mb-2 text-2xl font-extrabold text-white">
            ⌨️ الإدخال والإخراج — جرّبها الآن
          </h2>
          <p className="mb-6 max-w-2xl text-slate-300">
            كل برنامج يبدأ بأخذ بيانات من المستخدم ثم إظهار النتيجة. جرّب هذا المثال الحي
            قبل الدخول في التفاصيل!
          </p>
        </Reveal>
        <LiveIODemo />
      </section>
    </div>
  );
}
