export interface KBEntry {
  keywords: string[];
  answer: string;
}

/* Local fallback knowledge base — used when the API is unavailable. */
export const knowledgeBase: KBEntry[] = [
  {
    keywords: ["مدخل", "مخرج", "input", "output", "print", "ادخال", "اخراج", "اطبع"],
    answer:
      "🔹 الإدخال والإخراج:\n• input(\"message\") تطلب بيانات من المستخدم وتُرجِعها كنص (str).\n• print() تطبع المخرجات على الشاشة.\n• للتحويل نستخدم int() للعدد الصحيح و float() للعشري و str() للنص.\nمثال:\nage = int(input(\"Your age: \"))\nprint(\"Next year:\", age + 1)",
  },
  {
    keywords: ["قائمة", "list", "قوائم", "append", "عنصر"],
    answer:
      "🔹 القوائم (List):\nقائمة تُخزّن عدّة عناصر بين قوسين مربعين: nums = [10, 20, 30].\n• الوصول: nums[0] أول عنصر.\n• الإضافة في النهاية: nums.append(40).\n• الإدراج: nums.insert(1, 99).\n• الحذف: nums.pop() أو nums.remove(20).\n• العدد: len(nums).\n• التقطيع: nums[1:3].",
  },
  {
    keywords: ["switch", "match", "case", "شرط", "elif", "if", "شروط", "تبديل"],
    answer:
      "🔹 الشروط و الـ switch:\nبايثون لا يملك switch تقليدية، بل يستخدم match ... case (من 3.10+):\nmatch day:\n    case \"Saturday\": print(\"Weekend\")\n    case _: print(\"School\")\nكما نستخدم if / elif / else للشروط المتعدّدة. الرمز _ هو الحالة الافتراضية.",
  },
  {
    keywords: ["تكرار", "حلقة", "loop", "for", "while", "range", "كرر"],
    answer:
      "🔹 حلقات التكرار:\n• for i in range(5): تتكرّر 5 مرات (0 إلى 4).\n• while condition: تتكرّر طالما الشرط صحيح، وتُناسب عدّاد غير معروف.\n• break: يخرج من الحلقة نهائيًا.\n• continue: يتخطّى باقي الدورة الحالية.\nاحرص على تحديث العدّاد داخل while لتجنّب الحلقة اللانهائية.",
  },
  {
    keywords: ["دالة", "function", "def", "return", "دوال", "معامل", "وسيط"],
    answer:
      "🔹 الدوال (Function):\nالدالة كتلة كود قابلة لإعادة الاستخدام:\ndef add(a, b):\n    return a + b\n• def لتعريفها، return لإرجاع القيمة.\n• النداء: print(add(3, 4)) ← 7.\n• يمكن وضع قيم افتراضية: def f(x, y=2).",
  },
  {
    keywords: ["مفتوح", "مصدر", "open", "source", "حر", "free", "برنامج", "مجاني"],
    answer:
      "🔹 أنواع البرمجيات:\n• البرنامج الحر (Free Software): يمنح المستخدم حرية الاستخدام والنسخ والدراسة والتعديل.\n• مفتوح المصدر (Open Source): الكود المصدري متاح للجميع للاطلاع والتطوير (مثل Linux و Firefox).\n• قد يكون البرنامج مفتوح المصدر ومجانيًا معًا، أو حرًا غير مجاني.",
  },
  {
    keywords: ["ويب", "صفحة", "ثابتة", "ديناميكية", "static", "dynamic", "html", "موقع"],
    answer:
      "🔹 صفحات الويب:\n• ثابتة (Static): محتوى ثابت لكل الزوار، تُبنى بـ HTML و CSS و JavaScript بسيط.\n• ديناميكية (Dynamic): يتغيّر محتواها حسب المستخدم والبيانات، وتحتاج لغة خادم مثل PHP أو Python أو Node.js وقاعدة بيانات.",
  },
  {
    keywords: ["بايثون", "python", "لغة", "تجميع", "compiler", "خطأ", "error", "indent"],
    answer:
      "💡 نصائح في بايثون:\n• بايثون تعتمد على المسافات البادئة (Indentation) لتحديد الكتل.\n• انتبه لنوع البيانات: input() تُرجِع نصًا دائمًا.\n• استخدم الأقواس بشكل صحيح والنقطتين : بعد for/while/if/def.\nجرّب كتابة الكود في «مترجم بايثون» داخل المذكرة للتدرّب فورًا!",
  },
];

export function findInKnowledge(query: string): string | null {
  const q = query.toLowerCase();
  let best: { entry: KBEntry; score: number } | null = null;
  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw.toLowerCase())) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }
  return best ? best.entry.answer : null;
}
