import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/fleetData';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { addContactSubmission, contactSubmissions } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('استفسار عن إيجار سيارة');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      setErrorMsg('يرجى إدخال الاسم بالكامل (3 أحرف على الأقل)');
      return;
    }
    const cleanPhone = phone.replace(/[\s()-]/g, '');
    if (!/^(\+?20|0)?1[0125]\d{8}$/.test(cleanPhone)) {
      setErrorMsg('يرجى إدخال رقم هاتف مصري صحيح لنتواصل معك');
      return;
    }
    if (message.trim().length < 5) {
      setErrorMsg('يرجى كتابة تفاصيل استفسارك أو نوع السيارة المطلوبة');
      return;
    }

    setErrorMsg('');
    addContactSubmission({
      name: name.trim(),
      phone: phone.trim(),
      subject,
      message: message.trim(),
    });
    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mb-2">
          اتصل بنا
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-700">
          نحن هنا للإجابة على جميع استفساراتك وتأكيد حجوزاتك على مدار 24 ساعة
        </p>
      </div>

      {/* Top 3 Quick Action Cards (Phone, WhatsApp, Official Email) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1: الهاتف */}
        <div className="bg-white rounded-2xl border border-slate-300 p-6 text-center shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-blue-950 mb-1">الهاتف المباشر</h2>
            <p className="text-xs font-semibold text-slate-700 mb-5">
              تواصل معنا مباشرة عبر الهاتف للحجز الفوري
            </p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.mainPhone}`}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-900 font-mono font-extrabold text-sm flex items-center justify-center gap-2 transition-colors tabular-nums"
          >
            <Phone className="w-4 h-4 text-blue-900" />
            <span>{COMPANY_INFO.mainPhone}</span>
          </a>
        </div>

        {/* Card 2: واتساب */}
        <div className="bg-white rounded-2xl border border-slate-300 p-6 text-center shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-blue-950 mb-1">واتساب</h2>
            <p className="text-xs font-semibold text-slate-700 mb-5">
              راسلنا على الواتساب لإرسال صور السيارات والأسعار
            </p>
          </div>
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تواصل عبر واتساب</span>
          </a>
        </div>

        {/* Card 3: حجز الأفراح والتعاقدات */}
        <div className="bg-white rounded-2xl border border-slate-300 p-6 text-center shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 text-red-700 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-extrabold text-blue-950 mb-1">
              حجز الزفاف والشركات
            </h2>
            <p className="text-xs font-semibold text-slate-700 mb-5">
              خط مخصص لحجز مواكب الزفاف وتعاقدات الشركات
            </p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.weddingPhone}`}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-mono font-extrabold text-sm flex items-center justify-center gap-2 transition-colors tabular-nums"
          >
            <Phone className="w-4 h-4" />
            <span>{COMPANY_INFO.weddingPhone}</span>
          </a>
        </div>
      </div>

      {/* Main Split: Contact Information Card + Interactive Callback/Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Column (6 cols in RTL): معلومات التواصل وساعات العمل */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl font-extrabold text-blue-950 text-center mb-6">
              معلومات التواصل الرسمية
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-right">
                  <div className="text-xs font-extrabold text-slate-900">أرقام الهواتف</div>
                  <div className="text-xs font-mono font-bold text-slate-700 mt-0.5 tabular-nums">
                    {COMPANY_INFO.mainPhone} · {COMPANY_INFO.secondaryPhone} · {COMPANY_INFO.weddingPhone}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-right">
                  <div className="text-xs font-extrabold text-slate-900">واتساب</div>
                  <div className="text-xs font-mono font-bold text-slate-700 mt-0.5 tabular-nums">
                    {COMPANY_INFO.mainPhone}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-right">
                  <div className="text-xs font-extrabold text-slate-900">الموقع الرئيسي</div>
                  <div className="text-xs font-bold text-slate-700 mt-0.5">
                    {COMPANY_INFO.address}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Department Emails */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <h3 className="text-xs font-extrabold text-slate-800 mb-3">
                عناوين البريد الإلكتروني للإدارات:
              </h3>
              <ul className="space-y-2 text-xs">
                {COMPANY_INFO.emails.map((item) => (
                  <li
                    key={item.email}
                    className="flex flex-wrap items-center justify-between gap-2 py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200"
                  >
                    <span className="font-bold text-slate-800">{item.label}:</span>
                    <a
                      href={`mailto:${item.email}`}
                      dir="ltr"
                      className="font-mono font-bold text-blue-900 hover:underline"
                    >
                      {item.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Working Hours Box */}
          <div className="bg-slate-100 rounded-2xl border border-slate-300 p-6 text-center">
            <div className="inline-flex items-center gap-2 text-base font-extrabold text-blue-950 mb-1">
              <Clock className="w-5 h-5 text-blue-900" />
              <span>ساعات العمل</span>
            </div>
            <p className="text-sm font-bold text-slate-700">
              {COMPANY_INFO.workingHours}
            </p>
          </div>
        </div>

        {/* Left Column (6 cols in RTL): Interactive Contact / Callback Request Form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-xl font-extrabold text-blue-950 mb-2">
              أرسل رسالة أو اطلب معاودة اتصال
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-6">
              اترك بياناتك واستفسارك وسيقوم مسؤول الحجوزات بالتواصل معك فوراً
            </p>

            {submitted && (
              <div
                data-testid="contact-confirmation"
                className="mb-5 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-600 text-emerald-950 text-xs sm:text-sm font-bold flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-extrabold">تم استلام رسالتك بنجاح!</span>
                  <span>
                    سيقوم فريق خدمة العملاء في المستشار جروب بالتواصل معك في أقرب وقت.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-extrabold text-slate-800 mb-1"
                >
                  الاسم بالكامل *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الكريم"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:border-blue-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-extrabold text-slate-800 mb-1"
                  >
                    رقم الهاتف / واتساب *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01004418955"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm font-mono font-bold text-right focus:outline-none focus:border-blue-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-extrabold text-slate-800 mb-1"
                  >
                    نوع الطلب
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-blue-900 focus:bg-white"
                  >
                    <option value="استفسار عن إيجار سيارة">استفسار عن إيجار سيارة</option>
                    <option value="حجز سيارة زفاف ومناسبات">حجز سيارة زفاف ومناسبات</option>
                    <option value="تعاقد شركات ومدد طويلة">تعاقد شركات ومدد طويلة</option>
                    <option value="خدمة توصيل واستقبال مطار">خدمة توصيل واستقبال مطار</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-extrabold text-slate-800 mb-1"
                >
                  تفاصيل الرسالة أو السيارة المطلوبة *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب نوع السيارة المطلوبة، المدة، وموعد الاستلام..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:border-blue-900 focus:bg-white"
                />
              </div>

              {errorMsg && (
                <p className="text-xs font-extrabold text-red-700 bg-red-50 border border-red-200 p-2.5 rounded-lg">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الطلب الآن</span>
              </button>
            </form>

            {contactSubmissions.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-extrabold text-slate-700 mb-2">
                  آخر طلبات التواصل المرسلة في جلستك ({contactSubmissions.length}):
                </h3>
                <div className="space-y-2">
                  {contactSubmissions.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                    >
                      <span className="font-bold text-slate-900">
                        {item.subject} — {item.name}
                      </span>
                      <span className="text-emerald-800 font-bold">تم الإرسال ({item.createdAt})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
