import { useRef, useState, useEffect } from "react";
import { Play, Loader2, Trash2, FileCode2, TerminalSquare } from "lucide-react";
import { Reveal, Card, Callout } from "./shared";

declare global {
  interface Window {
    loadPyodide?: (opts?: { indexURL?: string }) => Promise<PyodideInstance>;
  }
}

interface PyodideInstance {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  setStdin: (opts: { stdin: () => string | null }) => void;
}

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.28.3/full/";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("تعذّر تحميل Pyodide"));
    document.head.appendChild(s);
  });
}

const DEFAULT_CODE = `# Welcome to the Python compiler 🐍
# Write your code here then click "Run"

name = input("Enter your name: ")
print("Hello", name, "from ZoomTech!")
`;

const EXAMPLES: { label: string; code: string; stdin: string }[] = [
  {
    label: "➕ جمع رقمين",
    code: `a = int(input("First number: "))
b = int(input("Second number: "))
print("Sum =", a + b)
print("Product =", a * b)`,
    stdin: "12\n8",
  },
  {
    label: "📋 قائمة وترتيب",
    code: `nums = [5, 2, 8, 1, 9, 3]
nums.sort()
print("Sorted:", nums)
print("Max:", max(nums))
print("Min:", min(nums))`,
    stdin: "",
  },
  {
    label: "🔀 match / case",
    code: `day = input("Enter a day: ")
match day:
    case "Friday" | "Saturday":
        print("Weekend!")
    case _:
        print("School day")`,
    stdin: "Saturday",
  },
  {
    label: "🔁 جدول ضرب",
    code: `for i in range(1, 11):
    print(i, "x", 5, "=", i * 5)`,
    stdin: "",
  },
  {
    label: "🧩 دالة",
    code: `def is_even(n):
    return n % 2 == 0

for x in [4, 7, 10, 3]:
    print(x, "even?", is_even(x))`,
    stdin: "",
  },
];

export function PythonCompiler() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "ready">(
    "idle"
  );
  const [error, setError] = useState(false);
  const pyodideRef = useRef<PyodideInstance | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  /* sync line-number gutter scroll with textarea */
  useEffect(() => {
    const ta = taRef.current;
    const g = gutterRef.current;
    if (!ta || !g) return;
    const onScroll = () => {
      g.scrollTop = ta.scrollTop;
    };
    ta.addEventListener("scroll", onScroll);
    return () => ta.removeEventListener("scroll", onScroll);
  }, []);

  const lineCount = code.split("\n").length;

  async function ensurePyodide() {
    if (pyodideRef.current) return pyodideRef.current;
    setStatus("loading");
    await loadScript(PYODIDE_URL + "pyodide.js");
    const py = await window.loadPyodide!({ indexURL: PYODIDE_URL });
    pyodideRef.current = py;
    setStatus("ready");
    return py;
  }

  async function run() {
    setError(false);
    try {
      const py = await ensurePyodide();
      setStatus("running");
      let out = "";
      const lines = stdin.split("\n");
      let idx = 0;

      py.setStdin({
        stdin: () => (idx < lines.length ? lines[idx++] + "\n" : null),
      });
      py.setStdout({ batched: (s: string) => (out += s) });
      py.setStderr({ batched: (s: string) => (out += s) });

      await py.runPythonAsync(code);
      setOutput(out.trim() || "(لا توجد مخرجات)");
      if (!out.trim()) setStatus("ready");
      else setStatus("ready");
    } catch (e) {
      setError(true);
      setOutput(String(e));
      setStatus("ready");
    }
  }

  const loadExample = (ex: (typeof EXAMPLES)[number]) => {
    setCode(ex.code);
    setStdin(ex.stdin);
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-bold text-indigo-200">
          <FileCode2 className="h-4 w-4" /> مترجم بايثون للتدريب
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          تجربة الكود مباشرةً 🐍
        </h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          مترجم بايثون حقيقي يعمل داخل متصفحك. اكتب الكود، أدخل القيم إن لزم، واضغط
          «تشغيل». (في أول مرة يتم تحميل المحرّك ثم يبقى جاهزًا).
        </p>
      </Reveal>

      {/* examples */}
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => loadExample(ex)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-bold text-slate-200 transition hover:border-indigo-400/40 hover:bg-indigo-500/15 hover:text-white"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* editor + input */}
        <Reveal>
          <Card strong className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-300">
                <FileCode2 className="h-4 w-4" /> main.py
              </span>
              <span className="mono text-xs text-slate-500">{lineCount} سطر</span>
            </div>
            <div className="flex" dir="ltr">
              <div
                ref={gutterRef}
                className="mono no-scrollbar select-none overflow-hidden bg-black/30 px-3 py-4 text-right text-xs leading-relaxed text-slate-600"
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                ref={taRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                dir="ltr"
                className="mono h-72 flex-1 resize-none bg-transparent p-4 text-sm leading-relaxed text-slate-100 outline-none"
              />
            </div>

            <div className="border-t border-white/10 bg-white/5 px-4 py-2.5">
              <label className="mb-1 block text-xs font-bold text-slate-400">
                مُدخلات (Input) — سطر لكل input()
              </label>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                dir="ltr"
                placeholder="مثال: 12&#10;8"
                className="mono h-16 w-full resize-none rounded-lg border border-white/10 bg-black/30 p-2 text-sm text-slate-100 outline-none focus:border-indigo-400/50"
              />
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <button
                onClick={run}
                disabled={status === "loading" || status === "running"}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-emerald-500 to-teal-600 px-5 py-2.5 font-bold text-white shadow-lg shadow-emerald-900/30 transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "loading" || status === "running" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {status === "loading"
                  ? "جارٍ تحميل المحرّك..."
                  : status === "running"
                  ? "جارٍ التنفيذ..."
                  : "تشغيل ▶"}
              </button>
              <button
                onClick={() => {
                  setOutput("");
                  setError(false);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/10"
              >
                <Trash2 className="h-4 w-4" /> مسح المخرجات
              </button>
            </div>
          </Card>
        </Reveal>

        {/* output */}
        <Reveal delay={0.1}>
          <Card strong className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
              <TerminalSquare className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-bold text-slate-300">المخرجات (Output)</span>
              {status === "loading" && (
                <span className="mr-auto inline-flex items-center gap-1 text-xs text-amber-300">
                  <Loader2 className="h-3 w-3 animate-spin" /> تحميل…
                </span>
              )}
            </div>
            <pre
              dir="ltr"
              className={`mono flex-1 overflow-auto p-4 text-sm leading-relaxed ${
                error ? "text-rose-300" : "text-emerald-200"
              }`}
            >
              {output || (
                <span className="text-slate-600">
                  // اضغط «تشغيل» لرؤية النتيجة هنا…
                </span>
              )}
            </pre>
          </Card>
        </Reveal>
      </div>

      <Callout type="tip" title="جرّب بنفسك">
        عدّل الأمثلة أو اكتب كودك الخاص. جرّب حل أسئلة الواجب داخل المترجم للتأكد من
        صحّة إجابتك قبل تسليمها!
      </Callout>
    </div>
  );
}
