import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  CheckCircle2,
  Navigation,
  Car,
} from 'lucide-react';
import { BRANCHES_LIST, COMPANY_INFO, BranchItem } from '../data/fleetData';

export const BranchesPage: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<BranchItem>(BRANCHES_LIST[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header matching screenshot */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          فروعنا ونقاط الخدمة
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-700 mb-4">
          نتواجد في عدة مواقع لخدمتكم بشكل أفضل. اختر الفرع أو نقطة الخدمة الأقرب إليك
        </p>
        <a
          href={`tel:${COMPANY_INFO.mainPhone}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-200 text-blue-950 font-extrabold text-sm hover:bg-blue-100 transition-colors tabular-nums"
        >
          <Phone className="w-4 h-4 text-blue-900" />
          <span>الخط الساخن الموحد: {COMPANY_INFO.mainPhone}</span>
        </a>
      </div>

      {/* Balanced 2-Column Layout: Branches Cards on Right + Interactive Branch Details & Map Panel on Left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Column (7 cols in RTL): Branch Cards */}
        <div className="lg:col-span-7 space-y-4">
          {BRANCHES_LIST.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;
            return (
              <article
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`rounded-2xl p-6 transition-all cursor-pointer bg-white border-2 ${
                  isSelected
                    ? 'border-blue-900 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      branch.isMain
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-800 border border-slate-300'
                    }`}
                  >
                    {branch.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                    متاح الآن 24/7
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 mb-2">
                  {branch.name}
                </h2>

                <div className="space-y-2 text-sm text-slate-700 font-semibold mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-1" />
                    <div>
                      <span className="font-extrabold text-slate-900">{branch.city}: </span>
                      <span>{branch.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-900 shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-900 shrink-0" />
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {branch.phone}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-200">
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-900 text-xs font-extrabold flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-900" />
                    <span>عرض على الخريطة</span>
                  </a>
                  <a
                    href={`tel:${branch.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="tabular-nums">اتصال بالفرع: {branch.phone}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Left Column (5 cols in RTL): Selected Branch Service Details & Map Visual */}
        <div className="lg:col-span-5 lg:sticky lg:top-20">
          <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden">
            <div className="bg-[#0F2557] text-white p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                <Navigation className="w-4 h-4" />
                <span>تفاصيل الموقع والخدمات المتاحة</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{selectedBranch.name}</h3>
              <p className="text-xs text-blue-100 mt-1">{selectedBranch.coordinatesLabel}</p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-extrabold text-slate-700 uppercase mb-3">
                  الخدمات المتوفرة في هذا الفرع:
                </h4>
                <ul className="space-y-2.5">
                  {selectedBranch.services.map((srv) => (
                    <li
                      key={srv}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs font-semibold text-slate-800 space-y-1.5">
                <div className="font-extrabold text-blue-950 flex items-center gap-1.5">
                  <Car className="w-4 h-4" />
                  <span>خدمة تسليم السيارة لموقعك</span>
                </div>
                <p className="leading-relaxed">
                  يمكنك استلام السيارة مباشرة من {selectedBranch.name} أو طلب توصيلها إلى باب منزلك أو الفندق أو المطار في الموعد المحدد.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <Link
                  to="/cars"
                  className="flex-1 py-3 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold text-center transition-colors"
                >
                  اختر سيارتك للاستلام من هذا الفرع
                </Link>
                <a
                  href={selectedBranch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-extrabold text-center flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>خرائط جوجل</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
