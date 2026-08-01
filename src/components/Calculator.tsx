import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Code2, Calculator as CalcIcon } from "lucide-react";
import { CodeBlock, Callout, Reveal, Card, K } from "./shared";

/* ---- core "match / case" style compute (mirrors Python) ---- */
function compute(a: number, op: string, b: number): number {
  switch (op) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

function fmt(n: number): string {
  if (!isFinite(n)) return "خطأ";
  const r = Math.round((n + Number.EPSILON) * 1e10) / 1e10;
  return String(r);
}

const AREAS = `"ac back div mul"
"seven eight nine sub"
"four five six add"
"one two three equals"
"zero zero dot equals"`;

export function Calculator() {
  const [current, setCurrent] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [showCode, setShowCode] = useState(true);

  const inputDigit = useCallback(
    (d: string) => {
      setCurrent((c) => {
        if (overwrite) {
          setOverwrite(false);
          return d;
        }
        return c === "0" ? d : c + d;
      });
    },
    [overwrite]
  );

  const inputDot = useCallback(() => {
    setCurrent((c) => {
      if (overwrite) {
        setOverwrite(false);
        return "0.";
      }
      return c.includes(".") ? c : c + ".";
    });
  }, [overwrite]);

  const clearAll = useCallback(() => {
    setCurrent("0");
    setPrev(null);
    setOp(null);
    setOverwrite(true);
  }, []);

  const backspace = useCallback(() => {
    setCurrent((c) => {
      if (overwrite) return c;
      const s = c.slice(0, -1);
      return s.length === 0 ? "0" : s;
    });
  }, [overwrite]);

  const chooseOp = useCallback(
    (nextOp: string) => {
      const val = parseFloat(current);
      if (prev !== null && op && !overwrite) {
        const res = compute(prev, op, val);
        setPrev(res);
        setCurrent(fmt(res));
      } else {
        setPrev(val);
      }
      setOp(nextOp);
      setOverwrite(true);
    },
    [current, prev, op, overwrite]
  );

  const equals = useCallback(() => {
    if (op === null || prev === null) return;
    const val = parseFloat(current);
    const res = compute(prev, op, val);
    setHistory((h) =>
      [`${fmt(prev)} ${op} ${fmt(val)} = ${fmt(res)}`, ...h].slice(0, 6)
    );
    setCurrent(fmt(res));
    setPrev(null);
    setOp(null);
    setOverwrite(true);
  }, [op, prev, current]);

  /* keyboard support */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (/[0-9]/.test(k)) inputDigit(k);
      else if (k === ".") inputDot();
      else if (k === "+") chooseOp("+");
      else if (k === "-") chooseOp("−");
      else if (k === "*") chooseOp("×");
      else if (k === "/") {
        e.preventDefault();
        chooseOp("÷");
      } else if (k === "Enter" || k === "=") {
        e.preventDefault();
        equals();
      } else if (k === "Backspace") backspace();
      else if (k === "Escape") clearAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inputDigit, inputDot, chooseOp, equals, backspace, clearAll]);

  const btnBase =
    "flex items-center justify-center rounded-2xl text-xl font-extrabold transition active:scale-95 select-none";

  const Btn = ({
    label,
    onClick,
    variant = "num",
    area,
  }: {
    label: string;
    onClick: () => void;
    variant?: "num" | "op" | "fn" | "eq";
    area: string;
  }) => {
    const styles = {
      num: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
      op: "bg-indigo-500/30 text-indigo-100 hover:bg-indigo-500/50 border border-indigo-400/30",
      fn: "bg-rose-500/25 text-rose-100 hover:bg-rose-500/40 border border-rose-400/30",
      eq: "bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:brightness-110 shadow-lg shadow-indigo-900/40",
    };
    return (
      <button
        style={{ gridArea: area }}
        onClick={onClick}
        className={`${btnBase} ${styles[variant]} h-full min-h-[56px]`}
      >
        {label}
      </button>
    );
  };

  const pythonCode = `# Simple calculator using match / case (switch)
a = float(input("First number: "))
op = input("Operation (+ - * /): ")
b = float(input("Second number: "))

match op:
    case "+":
        print(a + b)
    case "-":
        print(a - b)
    case "*":
        print(a * b)
    case "/":
        print(a / b if b != 0 else "Error: division by zero")
    case _:
        print("Unknown operation")`;

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-bold text-indigo-200">
          <CalcIcon className="h-4 w-4" /> مشروع تطبيقي • مثال الآلة الحاسبة
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          الآلة الحاسبة التفاعلية 🧮
        </h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          جرّب آلة حاسبة حقيقية تعمل أمامك، مبنية على منطق{" "}
          <K>match / case</K> (الـ switch) تمامًا كما ستكتبه في بايثون. استخدم الماوس أو
          لوحة المفاتيح!
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calculator */}
        <Reveal>
          <Card strong className="p-5">
            {/* screen */}
            <div className="mb-4 rounded-2xl border border-white/10 bg-black/40 p-4 text-left">
              <div className="mono h-5 text-sm text-slate-400">
                {prev !== null && op ? `${fmt(prev)} ${op}` : "\u00A0"}
              </div>
              <div className="mono truncate text-4xl font-extrabold text-white">
                {current}
              </div>
            </div>

            {/* keys */}
            <div
              className="grid gap-2"
              style={{ gridTemplateAreas: AREAS, gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "1fr" }}
            >
              <Btn label="AC" variant="fn" area="ac" onClick={clearAll} />
              <Btn label="⌫" variant="fn" area="back" onClick={backspace} />
              <Btn label="÷" variant="op" area="div" onClick={() => chooseOp("÷")} />
              <Btn label="×" variant="op" area="mul" onClick={() => chooseOp("×")} />
              <Btn label="7" area="seven" onClick={() => inputDigit("7")} />
              <Btn label="8" area="eight" onClick={() => inputDigit("8")} />
              <Btn label="9" area="nine" onClick={() => inputDigit("9")} />
              <Btn label="−" variant="op" area="sub" onClick={() => chooseOp("−")} />
              <Btn label="4" area="four" onClick={() => inputDigit("4")} />
              <Btn label="5" area="five" onClick={() => inputDigit("5")} />
              <Btn label="6" area="six" onClick={() => inputDigit("6")} />
              <Btn label="+" variant="op" area="add" onClick={() => chooseOp("+")} />
              <Btn label="1" area="one" onClick={() => inputDigit("1")} />
              <Btn label="2" area="two" onClick={() => inputDigit("2")} />
              <Btn label="3" area="three" onClick={() => inputDigit("3")} />
              <Btn label="=" variant="eq" area="equals" onClick={equals} />
              <Btn label="0" area="zero" onClick={() => inputDigit("0")} />
              <Btn label="." area="dot" onClick={inputDot} />
            </div>

            {/* history */}
            <div className="mt-4">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <History className="h-3.5 w-3.5" /> السجل
              </div>
              <div className="space-y-1">
                <AnimatePresence initial={false}>
                  {history.length === 0 ? (
                    <p className="mono text-xs text-slate-600">لا توجد عمليات بعد…</p>
                  ) : (
                    history.map((h, i) => (
                      <motion.p
                        key={h + i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mono rounded-lg bg-white/5 px-2 py-1 text-xs text-emerald-200"
                      >
                        {h}
                      </motion.p>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Python code */}
        <Reveal delay={0.1}>
          <div className="space-y-4">
            <button
              onClick={() => setShowCode((s) => !s)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-bold text-slate-200 hover:bg-white/10"
            >
              <Code2 className="h-4 w-4" /> {showCode ? "إخفاء" : "إظهار"} كود بايثون
            </button>
            <AnimatePresence>
              {showCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CodeBlock code={pythonCode} title="calculator.py" />
                </motion.div>
              )}
            </AnimatePresence>
            <Callout type="tip" title="لاحظ منطق switch">
              كل عملية <K>case</K> تتولّى عملية حسابية مختلفة، والحالة <K>case _</K> تلتقط أي
              رمز غير معروف (الحالة الافتراضية). هذا هو جوهر الـ switch عمليًا!
            </Callout>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
