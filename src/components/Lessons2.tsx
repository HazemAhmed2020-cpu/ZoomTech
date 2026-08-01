import {
  SectionHeading,
  ConceptArt,
  CodeBlock,
  Output,
  Callout,
  Card,
  Reveal,
  Pill,
  K,
  Feature,
} from "./shared";
import softwareImg from "@/assets/software.jpg";
import functionsImg from "@/assets/functions.jpg";
import { Boxes, Globe, FunctionSquare } from "lucide-react";

function Demo({ code, out }: { code: string; out: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <CodeBlock code={code} />
      <Output text={out} />
    </div>
  );
}

/* language / tech badge */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono inline-flex items-center rounded-lg border border-indigo-400/30 bg-indigo-500/15 px-2.5 py-1 text-xs font-bold text-indigo-100">
      {children}
    </span>
  );
}

/* ================================================================== */
/* 5 — SOFTWARE TYPES & WEB                                            */
/* ================================================================== */
export function LessonSoftware() {
  return (
    <div className="space-y-12">
      <SectionHeading
        index="الدرس الخامس"
        icon={<Boxes className="h-3.5 w-3.5" />}
        title="أنواع البرمجيات وصفحات الويب"
        subtitle="بعد إتقان أدوات البرمجة، نفهم الآن أنواع البرمجيات التي نستخدمها يوميًا، والفرق بين صفحة الويب الثابتة والديناميكية، واللغات المسؤولة عن كل منها."
      />

      <ConceptArt
        src={softwareImg}
        alt="أنواع البرمجيات والويب"
        caption="برامج حرة ومفتوحة المصدر ↦ مواقع ثابتة وديناميكية"
      />

      {/* ---------- Software ---------- */}
      <Reveal>
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-extrabold text-white">🖥️ البرمجيات (Software)</h3>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card strong className="h-full p-6">
            <Pill className="mb-3">البرنامج الحر Free Software</Pill>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              هو البرنامج الذي يمنح المستخدم <b className="text-white">حريات</b> أربع:
              حرية التشغيل لأي غرض، ودراسة الكود، وإعادة التوزيع، والتعديل والتطوير.
              «الحر» هنا تعني الحرية وليس بالضرورة المجانية في السعر.
            </p>
            <div className="space-y-2 text-sm">
              <p>✅ حرية الاستخدام</p>
              <p>✅ حرية الدراسة والفهم</p>
              <p>✅ حرية النسخ والتوزيع</p>
              <p>✅ حرية التعديل والتطوير</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>GNU/Linux</Tag>
              <Tag>GPL License</Tag>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card strong className="h-full p-6">
            <Pill className="mb-3">مفتوح المصدر Open Source</Pill>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              هو البرنامج الذي يكون <b className="text-white">الكود المصدري</b> الخاص به
              متاحًا للجميع، فيستطيع أي شخص الاطّلاع عليه وتعديله وتطويره ومشاركته مع
              مجتمع المطورين بحرية.
            </p>
            <div className="space-y-2 text-sm">
              <p>🔓 الكود متاح للجميع</p>
              <p>🤝 تطوير جماعي (Community)</p>
              <p>🔍 شفافية وموثوقية أعلى</p>
              <p>🆓 غالبًا مجاني</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Linux</Tag>
              <Tag>Firefox</Tag>
              <Tag>VLC</Tag>
              <Tag>Python</Tag>
              <Tag>WordPress</Tag>
              <Tag>LibreOffice</Tag>
            </div>
          </Card>
        </Reveal>
      </div>

      <Callout type="info" title="الفرق ببساطة">
        كثيرًا ما يتداخل «البرنامج الحر» مع «مفتوح المصدر»، لكن: <b>مفتوح المصدر</b> يركّز
        على فتح الكود للتعاون التقني، بينما <b>البرنامج الحر</b> يركّز على الحريات الأخلاقية
        للمستخدم. أغلب مفتوح المصدر مجاني، لكن ليس كل مجاني مفتوح المصدر.
      </Callout>

      {/* ---------- Web ---------- */}
      <Reveal>
        <div className="mt-6 flex items-center gap-3">
          <Globe className="h-6 w-6 text-cyan-300" />
          <h3 className="text-2xl font-extrabold text-white">🌐 صفحات الويب (Web Pages)</h3>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card strong className="h-full p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">📄</span>
              <Pill>صفحة ويب ثابتة Static</Pill>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              صفحة محتواها <b className="text-white">ثابت لا يتغيّر</b> ويكون одинаковًا لكل
              الزوّار. تُكتب مرة واحدة ويُرسلها الخادم كما هي، دون معالجة في كل زيارة.
            </p>
            <p className="mb-2 text-xs font-bold text-slate-400">اللغات المستخدمة:</p>
            <div className="flex flex-wrap gap-2">
              <Tag>HTML — الهيكل</Tag>
              <Tag>CSS — التنسيق</Tag>
              <Tag>JavaScript — بسيط</Tag>
            </div>
            <p className="mt-4 text-xs font-bold text-slate-400">أمثلة:</p>
            <p className="text-sm text-slate-300">موقع تعريفي لشركة، سيرة ذاتية، صفحة هبوط.</p>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card strong className="h-full p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              <Pill>صفحة ويب ديناميكية Dynamic</Pill>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              صفحة <b className="text-white">يتغيّر محتواها</b> حسب المستخدم والبيانات، إذ
              يُولّدها الخادم في كل مرة بالاعتماد على قاعدة بيانات.
            </p>
            <p className="mb-2 text-xs font-bold text-slate-400">اللغات المستخدمة:</p>
            <div className="flex flex-wrap gap-2">
              <Tag>PHP</Tag>
              <Tag>Python</Tag>
              <Tag>Node.js</Tag>
              <Tag>Ruby</Tag>
              <Tag>Java</Tag>
              <Tag>C#</Tag>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-400">+ قاعدة بيانات:</p>
            <div className="mt-1 flex flex-wrap gap-2">
              <Tag>MySQL</Tag>
              <Tag>PostgreSQL</Tag>
            </div>
            <p className="mt-4 text-xs font-bold text-slate-400">أمثلة:</p>
            <p className="text-sm text-slate-300">فيسبوك، جيميل، متجر إلكتروني، يوتيوب.</p>
          </Card>
        </Reveal>
      </div>

      <Reveal>
        <Card className="overflow-hidden p-0">
          <div className="grid divide-white/10 md:grid-cols-2 md:divide-x">
            <div className="p-6">
              <p className="mb-3 font-extrabold text-cyan-200">📄 الثابتة</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>⚡ سريعة وخفيفة وسهلة الاستضافة</li>
                <li>🔒 نفس المحتوى للجميع</li>
                <li>🙅 لا تحتاج قاعدة بيانات</li>
              </ul>
            </div>
            <div className="p-6">
              <p className="mb-3 font-extrabold text-fuchsia-200">⚙️ الديناميكية</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>👤 محتوى مخصّص لكل مستخدم</li>
                <li>🗃️ تعتمد على قاعدة بيانات</li>
                <li>🔄 تتفاعل وتتحدّث باستمرار</li>
              </ul>
            </div>
          </div>
        </Card>
      </Reveal>

      <Callout type="tip" title="تذكّر اللغات">
        الثابتة = <K>HTML</K> + <K>CSS</K> (واجهة فقط). الديناميكية = لغة خادم مثل{" "}
        <K>PHP</K> أو <K>Python</K> + قاعدة بيانات، لتوليد محتوى مختلف لكل زائر.
      </Callout>
    </div>
  );
}

/* ================================================================== */
/* 6 — FUNCTIONS                                                       */
/* ================================================================== */
export function LessonFunctions() {
  return (
    <div className="space-y-10">
      <SectionHeading
        index="الدرس السادس"
        icon={<FunctionSquare className="h-3.5 w-3.5" />}
        title="الدوال (Functions)"
        subtitle="الدالة هي كتلة كود لها اسم، تؤدي مهمة محددة، ويمكن استدعاؤها مرارًا بدل تكرار الكود. فكر فيها كـ«وصفة جاهزة» تنفّذها متى احتجتها."
      />

      <ConceptArt src={functionsImg} alt="الدوال" caption="الدالة تأخذ مُدخلات وتُرجِع مُخرجات (آلة صغيرة بداخل برنامجك)" />

      <Reveal>
        <Card className="p-5">
          <p className="text-sm leading-relaxed text-slate-300">
            نُعرّف الدالة بالكلمة <K>def</K> متبوعةً باسمها والأقواس، ثم النقطتين{" "}
            <K>:</K>، وتنتهي بـ <K>return</K> لإرجاع النتيجة.
          </p>
        </Card>
      </Reveal>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">👋</span> مثال ١ — دالة بسيطة بلا إرجاع
        </h3>
      </Reveal>
      <Demo code={`def greet(name):
    print("Hello", name)

greet("Ahmed")
greet("Sara")`} out={`Hello Ahmed
Hello Sara`} />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">➕</span> مثال ٢ — دالة تُرجِع قيمة (return)
        </h3>
      </Reveal>
      <Demo
        code={`def add(a, b):
    return a + b

result = add(3, 4)
print("Result =", result)`}
        out={`Result = 7`}
      />

      <Callout type="info" title="البرامتر مقابل الوسيط">
        <K>a</K> و <K>b</K> داخل <K>def add(a, b)</K> يسمّيان <b>برامترات</b>{" "}
        (Parameters). أمّا القيم <K>3</K> و <K>4</K> في <K>add(3, 4)</K> فهي{" "}
        <b>وسائط</b> (Arguments) تُمرَّر فعليًا عند النداء.
      </Callout>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">⭐</span> مثال ٣ — القيم الافتراضية
        </h3>
      </Reveal>
      <Demo
        code={`def greet(name="Friend"):
    print("Hello", name)

greet()           # uses the default
greet("Mona")     # overrides the default`}
        out={`Hello Friend
Hello Mona`}
      />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">📐</span> مثال ٤ — دالة مساحة المستطيل
        </h3>
      </Reveal>
      <Demo
        code={`def area(w, h):
    return w * h

print(area(5, 3))     # 15
print(area(10, 4))    # 40`}
        out={`15
40`}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Feature emoji="♻️" title="إعادة الاستخدام">
          اكتبها مرة، واستدعها آلاف المرّات في أي مكان بالبرنامج.
        </Feature>
        <Feature emoji="🧩" title="تنظيم الكود">
          تقسيم البرنامج الكبير إلى مهام صغيرة مفهومة وسهلة الصيانة.
        </Feature>
        <Feature emoji="🔧" title="سهولة الإصلاح">
          خطأ ما؟ تصلّحه في مكان واحد (الدالة) فيُصلح في كل مكان.
        </Feature>
      </div>
    </div>
  );
}
