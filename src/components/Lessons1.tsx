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
import ioImg from "@/assets/io.jpg";
import listsImg from "@/assets/lists.jpg";
import switchImg from "@/assets/switch.jpg";
import loopsImg from "@/assets/loops.jpg";
import {
  Keyboard,
  ListOrdered,
  GitBranch,
  RefreshCw,
  Terminal,
  Brackets,
  Plus,
} from "lucide-react";

/* code + expected output side by side */
function Demo({
  code,
  out,
  title = "Python",
}: {
  code: string;
  out: string;
  title?: string;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <CodeBlock code={code} title={title} />
      <Output text={out} />
    </div>
  );
}

/* ================================================================== */
/* 1 — INPUT / OUTPUT                                                  */
/* ================================================================== */
export function LessonIO() {
  return (
    <div className="space-y-10">
      <SectionHeading
        index="الدرس الأول"
        icon={<Keyboard className="h-3.5 w-3.5" />}
        title="الإدخال والإخراج (Input / Output)"
        subtitle="كل برنامج يتواصل مع المستخدم: يستقبل بيانات (Input) ثم يُظهر نتيجة (Output). هاتان العمليتان هما أساس التفاعل مع المستخدم في بايثون."
      />

      <ConceptArt src={ioImg} alt="الإدخال والإخراج" caption="المستخدم يُدخِل البيانات ↦ البرنامج يعالجها ↦ يُخرِج النتيجة" />

      <div className="grid gap-4 md:grid-cols-3">
        <Feature emoji="⌨️" title="الإدخال Input">
          عبر الدالة <K>input()</K> نطلب من المستخدم كتابة بيانات أثناء تشغيل البرنامج،
          وتُرجِع دائمًا قيمة من نوع نص <K>str</K>.
        </Feature>
        <Feature emoji="🖥️" title="الإخراج Output">
          عبر الدالة <K>print()</K> نعرض المعلومات والنتائج على الشاشة للمستخدم.
        </Feature>
        <Feature emoji="🔁" title="تحويل الأنواع">
          لأن <K>input()</K> تُرجِع نصًا، نحوّله للرقم المناسب باستخدام <K>int()</K> أو{" "}
          <K>float()</K>.
        </Feature>
      </div>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">💬</span> مثال ١ — ترحيب بسيط
        </h3>
      </Reveal>
      <Demo code={`name = input("Enter your name: ")
print("Hello", name)`} out={`Enter your name: Ahmed
Hello Ahmed`} />

      <Callout type="warn" title="انتبه: الإدخال دائمًا نص!">
        لو أدخل المستخدم <K>20</K> فإن <K>input()</K> تُرجِعها كنص <K>"20"</K> وليس رقمًا.
        لذلك جمعها مع رقم مباشرةً يُسبّب خطأً أو نتيجة خاطئة، ويجب التحويل أولًا.
      </Callout>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">🧮</span> مثال ٢ — جمع رقمين (مع تحويل النوع)
        </h3>
      </Reveal>
      <Demo
        code={`a = int(input("First number: "))
b = int(input("Second number: "))
print("Sum =", a + b)`}
        out={`First number: 7
Second number: 5
Sum = 12`}
      />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">✨</span> مثال ٣ — الفرق بين الرقم والنص
        </h3>
      </Reveal>
      <Demo code={`print(10 + 5)        # numbers -> addition
print("10" + "5")    # strings -> concatenation`} out={`15
105`} />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">🎛️</span> مثال ٤ — المتغيّران sep و end
        </h3>
      </Reveal>
      <Reveal>
        <Card className="p-5">
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <K>sep</K>: يحدد الفاصل بين القيم المطبوعة (الافتراضي مسافة).
            </li>
            <li>
              <K>end</K>: يحدد ما يُطبع في نهاية السطر (الافتراضي سطر جديد{" "}
              <K>\n</K>).
            </li>
          </ul>
        </Card>
      </Reveal>
      <Demo
        code={`print("A", "B", "C", sep="-")
print("Same", end=" ")
print("Line")`}
        out={`A-B-C
Same Line`}
      />

      <Callout type="tip" title="جرّب بنفسك!">
        افتح «مترجم بايثون» في نهاية المذكرة واكتب أكواد الإدخال والإخراج وشاهد النتيجة
        مباشرةً. التطبيق العملي يُثبّت المعلومة أكثر من الحفظ.
      </Callout>
    </div>
  );
}

/* ================================================================== */
/* 2 — LISTS                                                           */
/* ================================================================== */
export function LessonLists() {
  return (
    <div className="space-y-10">
      <SectionHeading
        index="الدرس الثاني"
        icon={<ListOrdered className="h-3.5 w-3.5" />}
        title="القوائم (Lists)"
        subtitle="القائمة هي بنية بيانات تُخزّن عدّة عناصر في متغيّر واحد بترتيب معيّن، ويمكن تعديلها. تُكتب العناصر بين قوسين مربعين [ ]."
      />

      <ConceptArt src={listsImg} alt="القوائم" caption="القائمة: صندوق واحد يحتوي عدّة عناصر مرتّبة بمواضع (فهارس)" />

      <Reveal>
        <Card className="p-5">
          <p className="mb-3 text-sm leading-relaxed text-slate-300">
            نُنشئ القائمة هكذا، ونصل لأي عنصر عبر <b className="text-white">الفهرس</b>{" "}
            (موقعه) الذي يبدأ من <K>0</K>. ويمكن استخدام الفهرس السالب للعد من النهاية.
          </p>
          <Demo
            code={`fruits = ["apple", "banana", "orange"]
print(fruits[0])     # first item
print(fruits[-1])    # last item
print(len(fruits))   # number of items`}
            out={`apple
orange
3`}
          />
        </Card>
      </Reveal>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <Brackets className="h-5 w-5 text-indigo-300" /> أهم دوال القوائم
        </h3>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Feature emoji="➕" title="append(x)">
          تُضيف عنصرًا <b>في النهاية</b>. <K>nums.append(40)</K>
        </Feature>
        <Feature emoji="📥" title="insert(i, x)">
          تُدرج عنصرًا <b>عند فهرس</b> محدد. <K>nums.insert(0, 5)</K>
        </Feature>
        <Feature emoji="🗑️" title="remove(x)">
          تحذف <b>أول ظهور</b> لقيمة. <K>nums.remove(20)</K>
        </Feature>
        <Feature emoji="↩️" title="pop()">
          تحذف العنصر الأخير (أو فهرسًا) وتُرجِعه.
        </Feature>
        <Feature emoji="🔢" title="len(list)">
          تُرجِع <b>عدد العناصر</b>.
        </Feature>
        <Feature emoji="↕️" title="sort()">
          ترتّب القائمة تصاعديًا (في مكانها).
        </Feature>
      </div>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">🛠️</span> مثال — إضافة وحذف وتعديل
        </h3>
      </Reveal>
      <Demo
        code={`nums = [10, 20, 30]
nums.append(40)        # [10, 20, 30, 40]
nums.insert(0, 5)      # [5, 10, 20, 30, 40]
nums.remove(20)        # [5, 10, 30, 40]
nums.pop()             # removes last
print(nums)`}
        out={`[5, 10, 30]`}
      />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">✂️</span> التقطيع (Slicing)
        </h3>
      </Reveal>
      <Reveal>
        <Card className="p-5">
          <p className="mb-3 text-sm text-slate-300">
            نأخذ جزءًا من القائمة بالصيغة <K>list[start:end]</K> بحيث تُؤخذ العناصر من
            «start» حتى <b>ما قبل</b> «end».
          </p>
        </Card>
      </Reveal>
      <Demo
        code={`nums = [10, 20, 30, 40, 50]
print(nums[1:4])    # from 1 up to (not) 4
print(nums[:3])     # from start up to 3
print(nums[-2:])    # last two items`}
        out={`[20, 30, 40]
[10, 20, 30]
[40, 50]`}
      />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">🔁</span> التنقّل بين عناصر القائمة
        </h3>
      </Reveal>
      <Demo
        code={`colors = ["red", "green", "blue"]
for c in colors:
    print("color:", c)`}
        out={`color: red
color: green
color: blue`}
      />

      <Callout type="info" title="معلومة متقدمة">
        القوائم تُمرَّر <b>بالمرجع</b>، فلو قلنا <K>b = a</K> فإن a و b يشيران لنفس
        القائمة، وتعديل أحدهما يؤثّر في الآخر. لنسخة منفصلة نستخدم <K>a.copy()</K>.
      </Callout>
    </div>
  );
}

/* ================================================================== */
/* 3 — SWITCH / CONDITIONS                                             */
/* ================================================================== */
export function LessonSwitch() {
  return (
    <div className="space-y-10">
      <SectionHeading
        index="الدرس الثالث"
        icon={<GitBranch className="h-3.5 w-3.5" />}
        title="الشروط والتبديل (Conditions / Switch)"
        subtitle="الحياة مليئة بالقرارات: «إذا نجحت فافرح، وإلا فذاكر أكثر». البرنامج كذلك يحتاج لاتخاذ قرارات حسب شروط معيّنة باستخدام if أو match."
      />

      <ConceptArt src={switchImg} alt="الشروط" caption="الشرط يفتح طريقًا واحدًا من عدّة طرق ممكنة حسب القيمة" />

      <div className="grid gap-4 md:grid-cols-2">
        <Feature emoji="🔀" title="if / elif / else">
          الطريقة الكلاسيكية: نفحص شرطًا، ثم شرطًا بديلًا، وإلا ننفّذ الأخير.
        </Feature>
        <Feature emoji="🎯" title="match / case">
          الـ switch الحديثة في بايثون 3.10+: نطابق قيمة متغيّر مع عدّة حالات (Cases).
        </Feature>
      </div>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">📊</span> مثال ١ — تقدير الطالب بـ if / elif / else
        </h3>
      </Reveal>
      <Demo
        code={`score = int(input("Enter your score: "))
if score >= 90:
    print("Excellent")
elif score >= 75:
    print("Very Good")
elif score >= 50:
    print("Pass")
else:
    print("Fail")`}
        out={`Enter your score: 82
Very Good`}
      />

      <Callout type="tip" title="عوامل المقارنة والمنطق">
        <div className="grid grid-cols-2 gap-2">
          <span><K>==</K> يساوي &nbsp; <K>!=</K> لا يساوي</span>
          <span><K>{">"}</K> أكبر &nbsp; <K>{"<"}</K> أصغر</span>
          <span><K>{">="}</K> أكبر أو يساوي</span>
          <span><K>and</K> و &nbsp; <K>or</K> أو &nbsp; <K>not</K> نفي</span>
        </div>
      </Callout>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <Terminal className="h-5 w-5 text-indigo-300" /> مثال ٢ — match / case (الـ switch)
        </h3>
      </Reveal>
      <Reveal>
        <Card className="p-5">
          <p className="mb-3 text-sm text-slate-300">
            نكتب <K>match</K> ثم المتغيّر، وتحت كل <K>case</K> نضع القيمة المحتملة.
            والحارة <K>case _</K> هي <b>الحالة الافتراضية</b> (default) وتُطابق أي قيمة لم
            تُطابق ما سبقها.
          </p>
        </Card>
      </Reveal>
      <Demo
        code={`day = input("Enter the day: ")
match day:
    case "Friday" | "Saturday":
        print("Weekend!")
    case "Sunday":
        print("Start of the week")
    case _:
        print("School day")`}
        out={`Enter the day: Saturday
Weekend!`}
      />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">⚙️</span> مثال ٣ — آلة حاسبة بسيطة (match)
        </h3>
      </Reveal>
      <Demo
        code={`op = input("Operation (+ - * /): ")
a = float(input("Number 1: "))
b = float(input("Number 2: "))
match op:
    case "+": print(a + b)
    case "-": print(a - b)
    case "*": print(a * b)
    case "/": print(a / b)
    case _: print("Unknown operation")`}
        out={`Operation (+ - * /): *
Number 1: 6
Number 2: 7
42.0`}
      />
      <Callout type="info" title="لماذا match؟">
        حين يكون لدينا عدّة قيم ثابتة لاختبارها (مثل أيام الأسبوع، العمليات الحسابية)،
        تكون <K>match</K> أوضح وأسهل قراءة من سلسلة <K>if/elif</K> الطويلة. جرّبها في
        «الآلة الحاسبة» التفاعلية بالأسفل!
      </Callout>
    </div>
  );
}

/* ================================================================== */
/* 4 — LOOPS                                                           */
/* ================================================================== */
export function LessonLoops() {
  return (
    <div className="space-y-10">
      <SectionHeading
        index="الدرس الرابع"
        icon={<RefreshCw className="h-3.5 w-3.5" />}
        title="حلقات التكرار (Loops: for / while)"
        subtitle="التكرار يعني تنفيذ نفس الكود عدّة مرات. لو أردت طباعة الأرقام من 1 إلى 100 فلا تكتب 100 سطر، بل استخدم حلقة تكرار واحدة!"
      />

      <ConceptArt src={loopsImg} alt="حلقات التكرار" caption="الحلقة تدور وتكرّر الكود حتى يتحقق شرط التوقّف" />

      <div className="grid gap-4 md:grid-cols-2">
        <Feature emoji="🔁" title="for">
          نستخدمها عندما <b>نعرف عدد المرّات</b>. تعتمد على <K>range()</K> أو على قائمة.
        </Feature>
        <Feature emoji="♾️" title="while">
          نستخدمها عندما لا نعرف عدد المرّات، بل نكرّر <b>طالما تحقّق شرط</b> معيّن.
        </Feature>
      </div>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">🔢</span> مثال ١ — for مع range
        </h3>
      </Reveal>
      <Demo code={`for i in range(1, 6):
    print(i)`} out={`1
2
3
4
5`} />
      <Reveal>
        <Card className="p-5">
          <p className="text-sm text-slate-300">
            <K>range(start, end, step)</K>: يولّد أرقامًا من «start» إلى ما قبل
            «end»، ويمكن تحديد «step» خطوة القفز.
          </p>
        </Card>
      </Reveal>
      <Demo code={`for i in range(0, 10, 2):
    print(i)`} out={`0
2
4
6
8`} />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">♾️</span> مثال ٢ — while
        </h3>
      </Reveal>
      <Demo
        code={`n = 1
while n <= 5:
    print(n)
    n += 1            # important! update the counter`}
        out={`1
2
3
4
5`}
      />
      <Callout type="warn" title="خطر الحلقة اللانهائية!">
        إذا نسيت تحديث العدّاد داخل <K>while</K> (مثل <K>n += 1</K>) يبقى الشرط صحيحًا
        للأبد فتدور الحلقة بلا توقّف. تأكّد دائمًا من وجود ما يُغلّب الشرط إلى False.
      </Callout>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">➕</span> مثال ٣ — جمع الأرقام من 1 إلى 5
        </h3>
      </Reveal>
      <Demo
        code={`total = 0
for i in range(1, 6):
    total += i
print("Sum =", total)`}
        out={`Sum = 15`}
      />

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="text-2xl">🛑</span> مثال ٤ — break و continue
        </h3>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <Card className="p-4">
            <p className="mb-2 text-sm font-bold text-rose-200">
              <K>break</K> تُنهي الحلقة تمامًا
            </p>
          </Card>
          <CodeBlock code={`for i in range(1, 10):
    if i == 5:
        break
    print(i)`} />
          <Output text={`1\n2\n3\n4`} />
        </div>
        <div className="space-y-3">
          <Card className="p-4">
            <p className="mb-2 text-sm font-bold text-amber-200">
              <K>continue</K> تتخطّى الدورة الحالية فقط
            </p>
          </Card>
          <CodeBlock code={`for i in range(1, 6):
    if i == 3:
        continue
    print(i)`} />
          <Output text={`1\n2\n4\n5`} />
        </div>
      </div>

      <Reveal>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white">
          <Plus className="h-5 w-5 text-indigo-300" /> مثال ٥ — جدول الضرب (حلقات متداخلة)
        </h3>
      </Reveal>
      <Demo
        code={`for i in range(1, 4):
    for j in range(1, 4):
        print(i, "x", j, "=", i * j)`}
        out={`1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9`}
      />

      <Callout type="tip" title="متى for ومتى while؟">
        استخدم <K>for</K> عند معرفة العدد (مثل الطباعة 10 مرات أو المرور على قائمة)،
        واستخدم <K>while</K> عند الاعتماد على شرط (مثل انتظار إدخال صحيح من المستخدم).
      </Callout>

      <Reveal>
        <div className="flex flex-wrap gap-2">
          <Pill>for ✓ عدّاد معروف</Pill>
          <Pill>while ✓ شرط منطقي</Pill>
          <Pill>break ✓ إيقاف</Pill>
          <Pill>continue ✓ تخطّي</Pill>
        </div>
      </Reveal>
    </div>
  );
}
