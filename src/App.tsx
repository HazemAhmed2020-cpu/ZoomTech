import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
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
  Menu,
  Zap,
} from "lucide-react";
import { Cover } from "./components/Cover";
import { LessonIO, LessonLists, LessonSwitch, LessonLoops } from "./components/Lessons1";
import { LessonSoftware, LessonFunctions } from "./components/Lessons2";
import { Calculator as CalculatorDemo } from "./components/Calculator";
import { Quiz } from "./components/Quiz";
import { Homework } from "./components/Homework";
import { PythonCompiler } from "./components/PythonCompiler";
import { ChatBot } from "./components/ChatBot";
import { cn } from "@/utils/cn";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
interface NavGroup {
  group: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  { group: "البداية", items: [{ id: "home", label: "الرئيسية", icon: <Home className="h-4.5 w-4.5" /> }] },
  {
    group: "الدروس",
    items: [
      { id: "io", label: "١ · الإدخال والإخراج", icon: <Keyboard className="h-4.5 w-4.5" /> },
      { id: "lists", label: "٢ · القوائم", icon: <ListOrdered className="h-4.5 w-4.5" /> },
      { id: "switch", label: "٣ · الشروط / Switch", icon: <GitBranch className="h-4.5 w-4.5" /> },
      { id: "loops", label: "٤ · حلقات التكرار", icon: <RefreshCw className="h-4.5 w-4.5" /> },
      { id: "software", label: "٥ · البرمجيات والويب", icon: <Boxes className="h-4.5 w-4.5" /> },
      { id: "functions", label: "٦ · الدوال", icon: <FunctionSquare className="h-4.5 w-4.5" /> },
    ],
  },
  {
    group: "التطبيقات",
    items: [
      { id: "calculator", label: "الآلة الحاسبة", icon: <Calculator className="h-4.5 w-4.5" /> },
      { id: "compiler", label: "مترجم بايثون", icon: <FileCode2 className="h-4.5 w-4.5" /> },
    ],
  },
  {
    group: "التقييم",
    items: [
      { id: "quiz", label: "الاختبار", icon: <Brain className="h-4.5 w-4.5" /> },
      { id: "homework", label: "الواجب", icon: <PenLine className="h-4.5 w-4.5" /> },
    ],
  },
];

const ALL_ITEMS = NAV.flatMap((g) => g.items);
const PROGRESS_ITEMS = ALL_ITEMS.filter((i) => i.id !== "home");
const labelOf = (id: string) => ALL_ITEMS.find((i) => i.id === id)?.label ?? "";

function Section({ id, go }: { id: string; go: (id: string) => void }) {
  switch (id) {
    case "home":
      return <Cover onNavigate={go} />;
    case "io":
      return <LessonIO />;
    case "lists":
      return <LessonLists />;
    case "switch":
      return <LessonSwitch />;
    case "loops":
      return <LessonLoops />;
    case "software":
      return <LessonSoftware />;
    case "functions":
      return <LessonFunctions />;
    case "calculator":
      return <CalculatorDemo />;
    case "quiz":
      return <Quiz />;
    case "homework":
      return <Homework />;
    case "compiler":
      return <PythonCompiler />;
    default:
      return <Cover onNavigate={go} />;
  }
}

export default function App() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(new Set(["home"]));

  const go = useCallback((id: string) => {
    setActive(id);
    setVisited((v) => new Set(v).add(id));
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    document.title = `ZoomTech | ${labelOf(active)}`;
  }, [active]);

  const doneCount = PROGRESS_ITEMS.filter((i) => visited.has(i.id)).length;
  const pct = Math.round((doneCount / PROGRESS_ITEMS.length) * 100);

  const SidebarInner = (
    <div className="flex h-full flex-col">
      {/* brand */}
      <div className="flex items-center gap-3 border-b border-white/10 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-900/40">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-lg font-black leading-none text-white">
            <span className="text-gradient">Zoom</span>Tech
          </p>
          <p className="mt-1 text-[11px] text-slate-400">البكالوريا · الفصل الأول</p>
        </div>
      </div>

      {/* progress */}
      <div className="border-b border-white/10 p-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300">تقدّمك</span>
          <span className="mono text-indigo-300">
            {doneCount}/{PROGRESS_ITEMS.length}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-l from-indigo-500 to-cyan-400"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* nav */}
      <nav className="no-scrollbar flex-1 overflow-y-auto p-3">
        {NAV.map((g) => (
          <div key={g.group} className="mb-4">
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {g.group}
            </p>
            <div className="space-y-1">
              {g.items.map((it) => {
                const isActive = active === it.id;
                const isVisited = visited.has(it.id);
                return (
                  <button
                    key={it.id}
                    onClick={() => go(it.id)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition",
                      isActive
                        ? "bg-gradient-to-l from-indigo-500/30 to-violet-500/10 text-white shadow-inner"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "transition",
                        isActive ? "text-indigo-300" : "text-slate-400 group-hover:text-indigo-300"
                      )}
                    >
                      {it.icon}
                    </span>
                    <span className="flex-1 text-right">{it.label}</span>
                    {isVisited && !isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4 text-center">
        <p className="text-[11px] text-slate-500">إعداد المهندس</p>
        <p className="text-xs font-extrabold text-slate-300">حازم أحمد إسماعيل</p>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-700/20 blur-[130px]" />
        <div className="absolute top-1/3 left-0 h-[26rem] w-[26rem] rounded-full bg-violet-700/15 blur-[130px]" />
        <div className="absolute bottom-0 right-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-600/10 blur-[130px]" />
      </div>

      {/* mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* sidebar (right) */}
      <aside
        className={cn(
          "glass-strong fixed inset-y-0 right-0 z-40 w-72 border-l border-white/10 transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {SidebarInner}
      </aside>

      {/* main */}
      <div className="lg:pr-72">
        {/* topbar */}
        <header className="glass sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-white lg:hidden"
            aria-label="القائمة"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="flex-1 truncate text-sm font-bold text-slate-200">
            {labelOf(active)}
          </p>
          <button
            onClick={() => go("home")}
            className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:bg-white/10 sm:inline-flex"
          >
            <Home className="h-3.5 w-3.5" /> الرئيسية
          </button>
        </header>

        {/* content */}
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Section id={active} go={go} />
            </motion.div>
          </AnimatePresence>

          {/* footer */}
          <footer className="mt-16 border-t border-white/10 pt-6 text-center">
            <p className="text-sm font-black">
              <span className="text-gradient">Zoom</span>
              <span className="text-white">Tech</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              مذكرة تفاعلية · أساسيات البرمجة وبايثون · الصف الأول البكالوريا
            </p>
            <p className="mt-2 text-xs font-bold text-slate-400">
              إعداد وإشراف: المهندس / حازم أحمد إسماعيل
            </p>
          </footer>
        </main>
      </div>

      <ChatBot />
    </div>
  );
}
