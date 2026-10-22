import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  MapPin,
  Handshake,
  Award,
  Car,
  Target,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import { FLEET_BRANDS_SUMMARY, PARTNERS_LIST } from '../data/fleetData';

export const AboutPage: React.FC = () => {
  const services = [
    {
      title: 'المؤتمرات والاجتماعات',
      description: 'خدمة المؤتمرات والاجتماعات والمناسبات الرسمية والزيارات بأحدث السيارات والباصات المكيفة.',
      icon: Users,
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      title: 'التوصيل والاستقبال',
      description: 'خدمة التوصيل والاستقبال من جميع المحافظات والمطارات داخل الجمهورية على مدار 24 ساعة.',
      icon: MapPin,
      color: 'bg-red-50 text-red-800 border-red-200',
    },
    {
      title: 'تعاقدات الشركات',
      description: 'تعاقدات سنوية وشهرية بسائق وبدون سائق مع كبرى الشركات والمؤسسات والهيئات.',
      icon: Handshake,
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      title: 'سائقون محترفون',
      description: 'فريق عمل من السائقين مدربين على أعلى مستوى يمتلكون خبرات الطرق داخل الجمهورية.',
      icon: Award,
      color: 'bg-red-50 text-red-800 border-red-200',
    },
    {
      title: 'القيادة الذاتية',
      description: 'خدمة تأجير بدون سائق — تسليم واستلام السيارة في أي مكان داخل المحافظة بمرونة وسرعة.',
      icon: Car,
      color: 'bg-blue-50 text-blue-900 border-blue-200',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Section 1: من نحن */}
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mb-6">من نحن</h1>
        <div className="bg-white rounded-2xl border border-slate-300 shadow-xs p-8 max-w-4xl mx-auto space-y-3">
          <p className="text-base sm:text-lg font-bold text-slate-800">
            نحن شركة إيجار سيارات في صعيد مصر غير تقليدية، آمنة وموثوقة لدى كل العملاء الذين جربوا خدماتنا.
          </p>
          <p className="text-xl sm:text-2xl font-extrabold text-blue-900">
            تأسست عام 2005... منذ أكثر من 18 عاماً
          </p>
          <p className="text-sm sm:text-base font-semibold text-slate-700">
            المستشار جروب من أكبر شركات الليموزين والإيجار في صعيد مصر
          </p>
        </div>
      </section>

      {/* Section 2: أسطولنا من السيارات */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 text-center mb-6">
          أسطولنا من السيارات
        </h2>
        <div className="bg-white rounded-2xl border border-slate-300 shadow-xs p-6 sm:p-8 max-w-4xl mx-auto">
          <p className="text-sm sm:text-base font-bold text-slate-800 text-center mb-6">
            تمتلك الشركة عدداً كبيراً من السيارات الحديثة والمتجددة سنوياً (اضغط على أي موديل لتصفح السيارات المتاحة):
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {FLEET_BRANDS_SUMMARY.map((brandLabel) => (
              <Link
                key={brandLabel}
                to={`/cars?q=${encodeURIComponent(brandLabel.split(' ')[0])}`}
                className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-blue-900 text-blue-950 hover:text-white border border-slate-200 hover:border-blue-900 text-xs sm:text-sm font-extrabold text-center transition-colors"
              >
                {brandLabel}
              </Link>
            ))}
          </div>

          <p className="text-xs sm:text-sm font-extrabold text-slate-700 text-center pt-4 border-t border-slate-200">
            جميع السيارات مزودة بـ GPS ووسائل الأمان والرفاهية الكاملة
          </p>
        </div>
      </section>

      {/* Section 3: خدماتنا */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 text-center mb-8">
          خدماتنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.title}
                className={`bg-white rounded-2xl border border-slate-300 p-6 text-center shadow-2xs hover:border-blue-800 transition-colors ${
                  idx === 4 ? 'md:col-span-2 md:max-w-md md:mx-auto w-full' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto mb-3.5 ${srv.color}`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-blue-950 mb-2">{srv.title}</h3>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {srv.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 4: أهدافنا ورؤيتنا */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-blue-50/70 rounded-2xl border border-blue-200 p-7 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center mx-auto mb-3.5">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-blue-950 mb-2">أهدافنا</h2>
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            نسعى لتقديم أفضل خدمة تأجير سيارات في صعيد مصر من خلال توفير أسطول متنوع من السيارات عالية الجودة بأسعار مناسبة وخدمة عملاء متميزة على مدار الساعة.
          </p>
        </div>

        <div className="bg-red-50/70 rounded-2xl border border-red-200 p-7 text-center">
          <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center mx-auto mb-3.5">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-blue-950 mb-2">رؤيتنا</h2>
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            أن نكون الخيار الأول والأفضل لتأجير السيارات وخدمات الليموزين في صعيد مصر وعموم الجمهورية من خلال التميز في الخدمة والجودة ورضا العملاء.
          </p>
        </div>
      </section>

      {/* Section 5: سابقة أعمالنا وشركاء النجاح */}
      <section className="pt-6 border-t border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            سابقة أعمالنا وشركاء النجاح
          </h2>
          <div className="w-14 h-1 bg-blue-900 mx-auto mt-2 mb-2 rounded-full" />
          <p className="text-sm font-semibold text-slate-700">
            نفتخر بثقة عملائنا من كبرى الشركات والمؤسسات في مصر
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PARTNERS_LIST.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl border border-slate-300 p-4 flex flex-col items-center justify-center shadow-2xs"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                referrerPolicy="no-referrer"
                className="h-16 w-auto object-contain mb-2"
              />
              <span className="text-xs font-extrabold text-slate-900 text-center">
                {partner.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-600 text-center">
                {partner.role}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-extrabold shadow-xs"
          >
            <span>تصفح أسطول السيارات الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
