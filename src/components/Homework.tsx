import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  PenLine,
  Save,
  Check,
  Lightbulb,
  Home as HomeIcon,
  GraduationCap,
} from "lucide-react";
import { homeworkQuestions, type MCQ } from "@/data/questions";
import { CodeBlock, Card, Reveal, Callout } from "./shared";

const levelColor: Record<string, string> = {
  سهل: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  متوسط: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  صعب: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

/* ---------------- single MCQ item ---------------- */
function HomeworkItem({ q }: { q: MCQ }) {
  const [selected, setSelected] = useState<number | null>(null);
  const locked = selected !== null;
  const isCorrect = locked && selected === q.answer;

  return (
    <Card className="p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-0.5 text-xs font-bold text-indigo-200">
          {q.topic}
        </span>
        <span
          className={`rounded-full border px-3 py-0.5 text-xs font-bold ${levelColor[q.level]}`}
        >
          {q.level}
        </span>
      </div>

      <h4 className="mb-3 font-extrabold leading-relaxed text-white">{q.question}</h4>
      {q.code && (
        <div className="mb-3">
          <CodeBlock code={q.code} />
        </div>
      )}

      <div className="grid gap-2.5 sm:grid-cols-2">
        {q.options.map((opt, i) => {
          const isPicked = selected === i;
          const isAnswer = i === q.answer;
          let style = "border-white/10 bg-white/5 hover:bg-white/10 text-slate-200";
          if (locked) {
            if (isAnswer)
              style = "border-emerald-400/60 bg-emerald-500/20 text-emerald-100";
            else if (isPicked)
              style = "border-rose-400/60 bg-rose-500/20 text-rose-100";
            else style = "border-white/5 bg-white/5 text-slate-500 opacity-60";
          }
          return (
            <motion.button
              key={i}
              disabled={locked}
              onClick={() => setSelected(i)}
              animate={locked && isPicked && !isAnswer ? { x: [0, -7, 7, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-right text-sm font-bold transition ${style}`}
            >
              <span>{opt}</span>
              {locked && isAnswer && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              {locked && isPicked && !isAnswer && (
                <XCircle className="h-4 w-4 text-rose-400" />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3"
          >
            <div
              className={`flex gap-2.5 rounded-xl border p-3 ${
                isCorrect
                  ? "border-emerald-400/30 bg-emerald-400/10"
                  : "border-amber-400/30 bg-amber-400/10"
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
              ) : (
                <Lightbulb className="h-5 w-5 shrink-0 text-amber-300" />
              )}
              <div>
                <p
                  className={`mb-0.5 text-sm font-extrabold ${
                    isCorrect ? "text-emerald-200" : "text-amber-200"
                  }`}
                >
                  {isCorrect
                    ? "إجابة صحيحة ✅"
                    : `إجابة خاطئة — الصحيح: ${q.options[q.answer]}`}
                </p>
                <p className="text-sm leading-relaxed text-slate-200">{q.explain}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

/* ---------------- essay (grades + switch) ---------------- */
function EssayGrades() {
  const STORAGE_KEY = "zoomtech_essay_grades";
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v) setText(v);
    } catch {
      /* ignore */
    }
  }, []);

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, text);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const lines = text.trim().length;

  return (
    <Card strong className="overflow-hidden">
      <div className="border-b border-white/10 bg-gradient-to-l from-violet-600/20 to-indigo-600/10 p-5">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-violet-300" />
          <span className="rounded-full border border-violet-400/40 bg-violet-500/20 px-3 py-0.5 text-xs font-bold text-violet-100">
            سؤال مقالي • للتفكير
          </span>
        </div>
        <h3 className="mt-3 text-lg font-extrabold text-white">
          نظام تقديرات الطلاب باستخدام switch (match / case)
        </h3>
      </div>

      <div className="space-y-4 p-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-200">
          <p className="mb-2 font-bold text-white">المطلوب:</p>
          <p>تخيّل أنك تُصمّم نظام تقديرات لمدرسة. اكتب برنامجًا بلغة بايثون يستخدم جملة <b className="text-violet-200">match - case</b> بحيث:</p>
          <ul className="mt-2 space-y-1 pr-4">
            <li>• يطلب درجة الطالب من المستخدم.</li>
            <li>• الدرجة ≥ 90 → يطبع <b>«ممتاز»</b></li>
            <li>• 75 إلى أقل من 90 → <b>«جيد جدًا»</b></li>
            <li>• 50 إلى أقل من 75 → <b>«ناجح»</b></li>
            <li>• أقل من 50 → <b>«راسب»</b></li>
            <li>• استخدم الحالة الافتراضية <span className="mono text-violet-200">case _</span> عند اللزوم.</li>
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-300">
              <PenLine className="h-4 w-4" /> اكتب إجابتك هنا
            </label>
            <span className="mono text-xs text-slate-500">{lines} حرف</span>
          </div>
          <textarea
            dir="ltr"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"# Write your Python code here...\nscore = int(input(...))\nmatch score:\n    ..."}
            spellCheck={false}
            className="mono h-56 w-full resize-y rounded-2xl border border-white/10 bg-[#0c1124] p-4 text-sm leading-relaxed text-slate-100 outline-none transition focus:border-violet-400/50"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Callout type="info" title="سؤال مفتوح للتفكير">
            هذا السؤال يقيس قدرتك على التطبيق. فكّر وحلّ بنفسك — لا توجد إجابة نموذجية
            تُعرض هنا، وستُحفظ إجابتك تلقائيًا في متصفحك.
          </Callout>
          <button
            onClick={save}
            className="inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-l from-violet-500 to-indigo-600 px-5 py-2.5 font-bold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" /> تم الحفظ
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> حفظ الإجابة
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ---------------- main ---------------- */
export function Homework() {
  return (
    <div className="space-y-8">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-bold text-indigo-200">
          <HomeIcon className="h-4 w-4" /> الواجب المنزلي
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          تدريبات وتطبيقات 📝
        </h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          أسئلة متنوّعة المستوى تختبر فهمك وتفكيرك في كل ما تم شرحه. حاول الحل بنفسك أولًا،
          ثم اضغط لتعرف الإجابة والشرح.
        </p>
      </Reveal>

      <div className="space-y-5">
        {homeworkQuestions.map((q, i) => (
          <Reveal key={q.id} delay={i * 0.03}>
            <HomeworkItem q={q} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mb-1 mt-10 text-xl font-extrabold text-white">
          ✍️ السؤال المقالي
        </h3>
      </Reveal>
      <EssayGrades />
    </div>
  );
}
