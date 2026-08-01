import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, MessageCircle } from "lucide-react";
import { findInKnowledge } from "@/data/knowledge";

interface Msg {
  role: "user" | "bot";
  text: string;
}

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY || "";
const SYSTEM_PROMPT = `أنت المساعد الذكي (zoomBot) الخاص بمنصة (ZoomTech) التعليمية. مهمتك هي مساعدة طلاب الصف الأول الثانوي (البكالوريا) في مصر على فهم أساسيات البرمجة ولغة بايثون (الإدخال والإخراج، القوائم، الشروط وmatch-case، حلقات التكرار، والدوال) وأنواع البرمجيات وصفحات الويب. ردودك يجب أن تكون:
1. باللغة العربية الفصحى المبسطة جدًا والودودة.
2. قصيرة ومباشرة وتفاعلية، مع أمثلة كود بايثون قصيرة عند الحاجة.
3. تستخدم أمثلة من الحياة اليومية لتقريب الفكرة.`;

const SUGGESTIONS = [
  "ما هي القوائم؟",
  "اشرح حلقات التكرار",
  "الفرق بين while و for",
  "ما هي الدالة؟",
  "أنواع صفحات الويب",
];

async function askGemini(text: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nسؤال الطالب: ${text}` }] }],
      }),
    }
  );
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error?.message ?? "API error");
  const out = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!out) throw new Error("no content");
  return out.trim();
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "أهلًا بك في ZoomTech! 👋 أنا zoomBot، مساعدك الذكي. اسألني عن أي درس في البرمجة وبايثون وسأساعدك. 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  const add = (m: Msg) => setMessages((prev) => [...prev, m]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || typing) return;
    setInput("");
    add({ role: "user", text: q });
    setTyping(true);
    try {
      const ans = await askGemini(q);
      add({ role: "bot", text: ans });
    } catch {
      const local = findInKnowledge(q);
      add({
        role: "bot",
        text:
          local ??
          "عذرًا، تعذّر الاتصال بالخادم الآن 😅. لكن يمكنك أن تسألني عن: الإدخال والإخراج، القوائم، الشروط (match)، التكرار، الدوال، أو أنواع البرمجيات وصفحات الويب.",
      });
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* toggle */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="pulse-ring fixed bottom-5 left-5 z-50 flex h-15 w-15 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-2xl shadow-indigo-900/50"
        style={{ height: 60, width: 60 }}
        aria-label="افتح المحادثة"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="c"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass-strong fixed bottom-24 left-5 z-50 flex h-[540px] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl shadow-2xl shadow-black/60"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-l from-indigo-600/30 to-violet-600/20 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-white">zoomBot</p>
                <p className="flex items-center gap-1 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> متصل · مساعدك الذكي
                </p>
              </div>
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>

            {/* messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex items-start gap-2"
                  }
                >
                  {m.role === "bot" && (
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Bot className="h-4 w-4 text-indigo-300" />
                    </div>
                  )}
                  <div
                    dir="auto"
                    className={
                      m.role === "user"
                        ? "max-w-[78%] whitespace-pre-wrap break-words rounded-2xl rounded-tl-sm bg-indigo-600/80 px-3.5 py-2.5 text-sm text-white"
                        : "max-w-[82%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-sm bg-white/10 px-3.5 py-2.5 text-sm leading-relaxed text-slate-100"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* suggestions */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-200 transition hover:bg-indigo-500/25"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {typing && (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                    <Bot className="h-4 w-4 text-indigo-300" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tr-sm bg-white/10 px-4 py-3">
                    <span className="typing-dot h-2 w-2 rounded-full bg-slate-300" />
                    <span className="typing-dot h-2 w-2 rounded-full bg-slate-300" />
                    <span className="typing-dot h-2 w-2 rounded-full bg-slate-300" />
                  </div>
                </div>
              )}
            </div>

            {/* input */}
            <div className="border-t border-white/10 bg-black/20 p-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="اكتب سؤالك هنا..."
                  className="max-h-28 flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400/50"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white transition hover:brightness-110 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
