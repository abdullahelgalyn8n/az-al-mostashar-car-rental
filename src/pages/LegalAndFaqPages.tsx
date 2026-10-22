import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  HelpCircle,
  Search,
  ChevronDown,
  Bookmark,
  CalendarCheck,
  Car,
  Phone,
  LogIn,
  UserPlus,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Lock,
} from 'lucide-react';
import { COMPANY_INFO, FAQ_ITEMS, FLEET_VEHICLES } from '../data/fleetData';
import { formatCurrencyEgp } from '../utils/fleetLogic';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';

export const PrivacyPage: React.FC = () => {
  const sections = [
    {
      num: '1',
      title: '1. مقدمة',
      paragraphs: [
        'نحن في المستشار جروب لتأجير السيارات نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدام موقعنا الإلكتروني أو خدماتنا.',
        'باستخدامك لموقعنا أو خدماتنا، فإنك توافق على جمع واستخدام المعلومات وفقاً لهذه السياسة.',
      ],
    },
    {
      num: '2',
      title: '2. المعلومات التي نجمعها',
      paragraphs: [
        'قد نجمع الأنواع التالية من المعلومات لضمان تقديم خدمة تأجير سيارات آمنة وسريعة:',
      ],
      bullets: [
        'المعلومات الشخصية: الاسم، عنوان البريد الإلكتروني، رقم الهاتف، العنوان، وتاريخ الميلاد.',
        'معلومات الهوية: رقم البطاقة الشخصية أو جواز السفر، ورقم رخصة القيادة السارية.',
        'معلومات الدفع: تفاصيل طرق السداد أو التحويل البنكي (تتم معالجتها بشكل آمن).',
        'معلومات الحجز: تواريخ الاستلام والتسليم، نوع السيارة المختارة، والمواقع المفضلة.',
        'معلومات تقنية: عنوان IP، نوع المتصفح، ونظام التشغيل لتحسين أداء المنصة.',
      ],
    },
    {
      num: '3',
      title: '3. كيف نستخدم معلوماتك',
      paragraphs: [
        'نستخدم المعلومات التي نجمعها للأغراض التشغيلية والقانونية التالية:',
      ],
      bullets: [
        'معالجة وتأكيد حجوزات السيارات وإعداد العقود الرسمية.',
        'التواصل معك بخصوص حجزك أو الرد على استفساراتك وطلبات التسعير.',
        'تحسين خدماتنا وتجربة المستخدم عبر الموقع الإلكتروني.',
        'إرسال عروض ترويجية وتحديثات موسمية (بموافقتك المسبقة).',
        'الامتثال للمتطلبات القانونية والتنظيمية المعمول بها في جمهورية مصر العربية.',
        'حماية حقوقنا وممتلكاتنا وأمان أسطول السيارات والعملاء.',
      ],
    },
    {
      num: '4',
      title: '4. حماية المعلومات',
      paragraphs: [
        'نتخذ إجراءات أمنية تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف، وتشمل هذه الإجراءات:',
      ],
      bullets: [
        'تشفير البيانات الحساسة أثناء النقل والتخزين الرقمي.',
        'تقييد الوصول إلى المعلومات الشخصية للموظفين المصرح لهم فقط في قسم الحجوزات والتعاقدات.',
        'مراجعة وتحديث ممارساتنا الأمنية بشكل دوري ومنتظم.',
      ],
    },
    {
      num: '5',
      title: '5. مشاركة المعلومات',
      paragraphs: [
        'لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة تحت أي ظرف. قد نشارك معلوماتك فقط في الحالات المحدودة التالية:',
      ],
      bullets: [
        'مع مزودي الخدمات الذين يساعدوننا في تشغيل أعمالنا (مثل شركات التأمين المعتمدة وبوابات الدفع).',
        'عندما يكون ذلك مطلوباً بموجب القانون أو استجابة لإجراءات قانونية رسمية.',
        'لحماية حقوقنا أو سلامة عملائنا أو أسطولنا.',
      ],
    },
    {
      num: '6',
      title: '6. حقوقك والتواصل معنا',
      paragraphs: [
        'يحق لك في أي وقت طلب الوصول إلى بياناتك الشخصية المسجلة لدينا، أو طلب تصحيحها أو تحديثها أو حذفها بما لا يتعارض مع الالتزامات القانونية للعقود السارية.',
        `لأي استفسارات تتعلق بسياسة الخصوصية، يمكنك التواصل معنا مباشرة عبر البريد الرسمي ${COMPANY_INFO.emails[0].email} أو الاتصال على ${COMPANY_INFO.mainPhone}.`,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-slate-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-lg text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>وثيقة رسمية • الرابط المخصص: /privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">سياسة الخصوصية</h1>
          <p className="text-slate-300 text-base">
            التزام المستشار جروب بحماية خصوصية وبيانات عملائنا الكرام بأعلى معايير الأمان والشفافية
          </p>
          <p className="text-xs text-slate-400 mt-3 font-medium">
            آخر تحديث: يناير 2025 • المستشار جروب لتأجير السيارات
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6">
        {sections.map((section) => (
          <article
            key={section.num}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-900 mb-3 pb-3 border-b border-slate-100 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                {section.num}
              </span>
              {section.title}
            </h2>
            <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {section.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="space-y-2.5 mt-3 pr-2">
                  {section.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}

        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black mb-1">هل لديك استفسار حول خصوصية بياناتك؟</h3>
            <p className="text-slate-300 text-sm">
              فريق الشؤون القانونية وخدمة العملاء جاهز للرد على كافة استفساراتك.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/terms"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
            >
              الشروط والأحكام
            </Link>
            <Link
              to="/contact"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const sections = [
    {
      num: '1',
      title: '1. القبول بالشروط',
      paragraphs: [
        'مرحباً بك في المستشار جروب لتأجير السيارات. باستخدامك لخدماتنا أو موقعنا الإلكتروني، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل إجراء أي حجز.',
      ],
    },
    {
      num: '2',
      title: '2. شروط التأجير والأهلية',
      subheading: '2.1 أهلية المستأجر والوثائق المطلوبة:',
      bullets: [
        'يجب أن يكون عمر المستأجر 21 عاماً على الأقل (أو 25 عاماً لبعض فئات السيارات الفاخرة).',
        'حيازة رخصة قيادة سارية المفعول لمدة لا تقل عن سنة واحدة (في حالة الإيجار بدون سائق).',
        'تقديم بطاقة هوية وطنية سارية المفعول للمصريين أو جواز سفر ساري المفعول لغير المصريين.',
        'توقيع عقد الإيجار الرسمي واستلام محضر فحص حالة السيارة عند الاستلام.',
      ],
    },
    {
      num: '3',
      title: '3. الحجز والدفع',
      bullets: [
        'يتطلب تأكيد الحجز دفع عربون أو قيمة الحجز المتفق عليها نقداً أو عبر التحويل البنكي أو المحافظ الإلكترونية.',
        'تُحتسب فترة الإيجار على أساس 24 ساعة لليوم الواحد، أو حسب الباقة التعاقدية (أسبوعي / شهري / سنوي).',
        'الأسعار المعلنة تشمل الصيانة الدورية والتأمين الأساسي المتفق عليه في العقد.',
      ],
    },
    {
      num: '4',
      title: '4. استخدام السيارة والتزامات المستأجر',
      bullets: [
        'يلتزم المستأجر باستخدام السيارة للأغراض المشروعة فقط ووفقاً لقوانين المرور المصرية.',
        'يُمنع منعاً باتاً تأجير السيارة من الباطن أو السماح لغير الأشخاص المسجلين في العقد بقيادتها.',
        'تُسلّم السيارة بنفس مستوى الوقود والحالة الفنية التي استُلمت بها.',
        'يتحمل المستأجر قيمة المخالفات المرورية المسجلة خلال فترة حيازته للسيارة (في الإيجار بدون سائق).',
      ],
    },
    {
      num: '5',
      title: '5. التأمين والأعطال والطوارئ',
      bullets: [
        'جميع سيارات الأسطول مؤمّن عليها وتخضع لفحص فني شامل قبل كل تسليم.',
        'في حالة حدوث أي عطل فني طارئ، توفر الشركة دعماً فنياً على مدار 24 ساعة مع توفير سيارة بديلة عند اللزوم.',
        'يجب إبلاغ إدارة الشركة فوراً في حالة وقوع أي حادث مروري لتوثيق الإجراءات القانونية والتأمينية.',
      ],
    },
    {
      num: '6',
      title: '6. الإلغاء وتعديل الحجز',
      bullets: [
        'يمكن تعديل موعد الحجز مجاناً بشرط إبلاغ خدمة العملاء قبل موعد الاستلام بـ 24 ساعة على الأقل.',
        'في حالة الإلغاء قبل الموعد بوقت كافٍ، يتم استرداد العربون وفق سياسة التعاقد الموضحة في إيصال الحجز.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-slate-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-lg text-xs font-bold mb-4">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>ضوابط التعاقد • الرابط المخصص: /terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">الشروط والأحكام</h1>
          <p className="text-slate-300 text-base">
            القواعد المنظمة لخدمات تأجير السيارات للأفراد والشركات لدى المستشار جروب
          </p>
          <p className="text-xs text-slate-400 mt-3 font-medium">
            آخر تحديث: يناير 2025 • المستشار جروب لتأجير السيارات
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6">
        {sections.map((section) => (
          <article
            key={section.num}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-900 mb-3 pb-3 border-b border-slate-100 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                {section.num}
              </span>
              {section.title}
            </h2>
            {section.subheading && (
              <h3 className="text-base font-extrabold text-amber-800 mb-2">
                {section.subheading}
              </h3>
            )}
            <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {section.paragraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="space-y-2.5 mt-2 pr-2">
                  {section.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}

        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black mb-1">جاهز لاختيار سيارتك الآن؟</h3>
            <p className="text-slate-300 text-sm">
              تصفح أسطولنا الكامل واحجز سيارتك بعقد واضح وشروط شفافة.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/privacy"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <Link
              to="/cars"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              تصفح السيارات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.includes(searchQuery.trim()) ||
      item.answer.includes(searchQuery.trim())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-slate-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-lg text-xs font-bold mb-4">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>مركز المساعدة • الرابط المخصص: /faq</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">الأسئلة الشائعة</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            إجابات وافية حول إجراءات الإيجار، المستندات المطلوبة، خدمات السائقين، وتعاقدات الشركات
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة الشائعة (مثال: مستندات، مطار، شركات، سائق)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pr-11 pl-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-right flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-base font-black text-slate-900">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-sm sm:text-base text-slate-700 font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const BookingsAndFavoritesPage: React.FC = () => {
  const { bookings, favorites } = useApp();
  const favoriteVehicles = FLEET_VEHICLES.filter((v) => favorites.includes(v.id));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-slate-950 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-lg text-xs font-bold mb-3">
            <CalendarCheck className="w-4 h-4 text-amber-400" />
            <span>إدارة حجوزاتك والمفضلة • الرابط المخصص: /bookings</span>
          </div>
          <h1 className="text-3xl font-black mb-2">حجوزاتي والسيارات المحفوظة</h1>
          <p className="text-slate-300 text-sm sm:text-base">
            تابع طلبات الحجز المسجلة والسيارات التي قمت بحفظها للمقارنة السريعة
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Active Bookings */}
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-amber-600" />
            <span>طلبات الحجز المسجلة ({bookings.length})</span>
          </h2>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <Car className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-black text-slate-900 mb-1">لا توجد طلبات حجز مسجلة بعد</h3>
              <p className="text-sm text-slate-600 mb-5">
                يمكنك اختيار أي سيارة من الأسطول وحجزها مباشرة من صفحتها الخاصة.
              </p>
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-black text-sm px-6 py-3 rounded-xl transition-colors"
              >
                <span>استعرض أسطول السيارات</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        رقم الحجز: {b.id}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1.5">
                        <Link to={`/cars/${b.vehicleSlug}`} className="hover:text-amber-700">
                          {b.vehicleName}
                        </Link>
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      قيد التأكيد الهاتفي
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 font-semibold">
                    <div>
                      <span className="text-slate-500 block">العميل:</span>
                      <span className="font-bold text-slate-900">{b.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">الهاتف:</span>
                      <span className="font-mono font-bold text-slate-900" dir="ltr">
                        {b.customerPhone}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">الفرع والمدة:</span>
                      <span className="font-bold text-slate-900">
                        {b.pickupBranch} ({b.days} يوم)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">التكلفة التقديرية:</span>
                      <span className="font-black text-amber-800 tabular-nums">
                        {formatCurrencyEgp(b.totalEstimate)} ج.م
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Favorites */}
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <span>السيارات المحفوظة في المفضلة ({favoriteVehicles.length})</span>
          </h2>

          {favoriteVehicles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <Bookmark className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-black text-slate-900 mb-1">قائمة المفضلة فارغة حالياً</h3>
              <p className="text-sm text-slate-600 mb-5">
                اضغط على أيقونة الحفظ على أي سيارة لإضافتها هنا للمقارنة السريعة.
              </p>
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm px-6 py-3 rounded-xl transition-colors"
              >
                <span>تصفح السيارات</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode="grid" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loginUser, logoutUser } = useApp();
  const isRegister = location.pathname === '/register';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister && name.trim().length < 3) {
      setError('يرجى إدخال الاسم بالكامل (3 أحرف على الأقل).');
      return;
    }
    if (phone.trim().length < 10) {
      setError('يرجى إدخال رقم هاتف مصري صحيح.');
      return;
    }
    loginUser({
      name: isRegister ? name.trim() : name.trim() || 'عميل المستشار جروب',
      phone: phone.trim(),
      email: email.trim() || 'client@almostashergroup.com',
    });
    navigate('/bookings');
  };

  if (user) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">مرحباً بك، {user.name}</h1>
          <p className="text-sm text-slate-600 mb-6 font-medium">
            أنت مسجل الدخول حالياً برقم الهاتف{' '}
            <span className="font-mono font-bold text-slate-900" dir="ltr">
              {user.phone}
            </span>
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/bookings"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-colors"
            >
              عرض حجوزاتي والمفضلة
            </Link>
            <button
              type="button"
              onClick={logoutUser}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-sm transition-colors"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="bg-slate-950 text-white p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto mb-3 font-black">
            {isRegister ? <UserPlus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
          </div>
          <h1 className="text-2xl font-black">
            {isRegister ? 'إنشاء حساب عميل جديد' : 'تسجيل الدخول لحسابك'}
          </h1>
          <p className="text-xs text-slate-300 mt-1.5">
            احتفظ بحجوزاتك وتابع عقود تأجير السيارات بسهولة مع المستشار جروب
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-bold p-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
              الاسم الكامل {isRegister ? '*' : '(اختياري)'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: أحمد محمود"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
              رقم الهاتف المحمول *
            </label>
            <input
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01000000000"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 text-right focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 text-right focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-colors shadow-xs"
          >
            {isRegister ? 'إنشاء الحساب والمتابعة' : 'تسجيل الدخول'}
          </button>

          <div className="pt-3 border-t border-slate-100 text-center text-xs font-bold text-slate-600">
            {isRegister ? (
              <span>
                لديك حساب بالفعل؟{' '}
                <Link to="/login" className="text-amber-700 hover:underline font-black">
                  تسجيل الدخول
                </Link>
              </span>
            ) : (
              <span>
                ليس لديك حساب؟{' '}
                <Link to="/register" className="text-amber-700 hover:underline font-black">
                  إنشاء حساب جديد
                </Link>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
