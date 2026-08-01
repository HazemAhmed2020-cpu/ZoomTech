import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ChevronLeft,
  Lightbulb,
  Brain,
} from "lucide-react";
import { quizQuestions } from "@/data/questions";
import { CodeBlock, Card, Reveal } from "./shared";

const levelColor: Record<string, string> = {
  سهل: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  متوسط: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  صعب: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export function Quiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = quizQuestions.length;
  const q = quizQuestions[index];

  const handleSelect = (i: number) => {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= total) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setLocked(false);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setScore(0);
    setFinished(false);
  };

  const pct = Math.round((score / total) * 100);
  const isCorrect = locked && selected === q.answer;

  /* ---------- Result screen ---------- */
  if (finished) {
    const msg =
      pct >= 80
        ? "ممتاز! أنت متمكّن من الفصل 🎉"
        : pct >= 50
        ? "جيد، راجع النقاط التي أخطأت فيها 📚"
        : "لا بأس، أعد المذاكرة وحاول مجددًا 💪";
    return (
      <Reveal>
        <Card strong className="mx-auto max-w-xl p-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500"
          >
            <Trophy className="h-10 w-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-extrabold text-white">انتهى الاختبار!</h3>
          <p className="mt-1 text-slate-300">{msg}</p>

          <div className="my-6">
            <div className="mono text-5xl font-black text-gradient">{pct}%</div>
            <p className="mt-2 text-slate-400">
              أجبت بشكل صحيح عن {score} من {total} سؤال
            </p>
          </div>

          <div className="mb-6 h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-l from-indigo-500 to-violet-500"
            />
          </div>

          <button
            onClick={restart}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-indigo-500 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110"
          >
            <RotateCcw className="h-4 w-4" /> إعادة الاختبار
          </button>
        </Card>
      </Reveal>
    );
  }

  /* ---------- Question screen ---------- */
  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-bold text-indigo-200">
            <Brain className="h-4 w-4" /> اختبار المحاضرة
          </div>
          <div className="text-sm font-bold text-slate-300">
            النتيجة: <span className="text-emerald-300">{score}</span> / {total}
          </div>
        </div>
      </Reveal>

      {/* progress */}
      <div className="flex items-center gap-3">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-l from-indigo-500 to-cyan-400"
            animate={{ width: `${((index + (locked ? 1 : 0)) / total) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="mono shrink-0 text-xs font-bold text-slate-400">
          {index + 1}/{total}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <Card strong className="p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-200">
                {q.topic}
              </span>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold ${levelColor[q.level]}`}
              >
                {q.level}
              </span>
            </div>

            <h3 className="mb-4 text-lg font-extrabold leading-relaxed text-white">
              {q.question}
            </h3>

            {q.code && (
              <div className="mb-4">
                <CodeBlock code={q.code} />
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              {q.options.map((opt, i) => {
                const isPicked = selected === i;
                const isAnswer = i === q.answer;
                let style =
                  "border-white/10 bg-white/5 hover:bg-white/10 text-slate-200";
                if (locked) {
                  if (isAnswer)
                    style = "border-emerald-400/60 bg-emerald-500/20 text-emerald-100";
                  else if (isPicked)
                    style = "border-rose-400/60 bg-rose-500/20 text-rose-100";
                  else style = "border-white/5 bg-white/5 text-slate-400 opacity-60";
                }
                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={locked}
                    whileTap={{ scale: locked ? 1 : 0.97 }}
                    animate={
                      locked && isPicked && !isAnswer
                        ? { x: [0, -8, 8, -6, 6, 0] }
                        : {}
                    }
                    transition={{ duration: 0.45 }}
                    className={`flex items-center justify-between gap-2 rounded-2xl border px-4 py-3.5 text-right text-sm font-bold transition ${style}`}
                  >
                    <span>{opt}</span>
                    {locked && isAnswer && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    )}
                    {locked && isPicked && !isAnswer && (
                      <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* explanation */}
            <AnimatePresence>
              {locked && (
                <motion.div
                  initial={{ opacity: 0, y: 16, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  className="mt-5"
                >
                  <div
                    className={`flex gap-3 rounded-2xl border p-4 ${
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
                        className={`mb-1 font-extrabold ${
                          isCorrect ? "text-emerald-200" : "text-amber-200"
                        }`}
                      >
                        {isCorrect
                          ? "إجابة صحيحة! أحسنت ✅"
                          : `إجابة خاطئة ❌ — الإجابة الصحيحة: ${
                              q.options[q.answer]
                            }`}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-200">
                        {q.explain}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={next}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-indigo-500 to-violet-600 px-6 py-2.5 font-bold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110"
                    >
                      {index + 1 >= total ? "عرض النتيجة" : "السؤال التالي"}
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
