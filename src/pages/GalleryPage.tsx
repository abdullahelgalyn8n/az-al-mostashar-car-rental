import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Eye, X, ArrowLeft } from 'lucide-react';
import { GALLERY_ITEMS, COMPANY_INFO, GalleryItem } from '../data/fleetData';

type GalleryFilter = 'all' | 'sedan' | 'suv' | 'showroom' | 'events';

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterTabs: { id: GalleryFilter; label: string }[] = [
    { id: 'all', label: 'الكل' },
    { id: 'sedan', label: 'سيدان' },
    { id: 'suv', label: 'SUV' },
    { id: 'showroom', label: 'المعرض' },
    { id: 'events', label: 'مناسبات وزفاف' },
  ];

  const visibleItems =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div>
      {/* Hero Banner matching screenshot */}
      <section className="bg-gradient-to-b from-[#153275] to-[#1E40AF] text-white py-14 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">معرض السيارات</h1>
          <p className="text-base sm:text-lg text-blue-100 font-semibold">
            اكتشف تشكيلتنا المتنوعة من السيارات الحديثة والفاخرة ومواكب الزفاف في صعيد مصر
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-800 shadow-xs hover:shadow-md overflow-hidden transition-all flex flex-col"
            >
              <div className="relative h-64 bg-slate-900 overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-md bg-slate-900/85 text-white text-xs font-extrabold">
                    {item.categoryLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  aria-label={`تكبير صورة ${item.title}`}
                  className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-xs font-extrabold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-900" />
                  <span>عرض الصورة</span>
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed mb-3">
                    {item.subtitle}
                  </p>
                </div>

                {item.relatedCarSlug && (
                  <Link
                    to={`/cars/${item.relatedCarSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-900 hover:text-blue-700 pt-2 border-t border-slate-100"
                  >
                    <span>عرض تفاصيل وحجز هذه السيارة</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base">
                {selectedItem.title}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="إغلاق المعاينة"
                className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-black max-h-[65vh] overflow-hidden flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>
            <div className="p-5 flex flex-wrap items-center justify-between gap-4 bg-slate-50">
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {selectedItem.subtitle}
              </p>
              {selectedItem.relatedCarSlug && (
                <Link
                  to={`/cars/${selectedItem.relatedCarSlug}`}
                  className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-extrabold whitespace-nowrap"
                >
                  احجز هذه السيارة الآن
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Banner matching Gallery Screenshot */}
      <section className="bg-slate-100 border-t border-slate-200 py-14 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            هل تريد حجز سيارة؟
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-700 mb-6">
            تواصل معنا الآن واحصل على أفضل العروض والأسعار في صعيد مصر
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={`tel:${COMPANY_INFO.mainPhone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-extrabold shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="tabular-nums">اتصل بنا: {COMPANY_INFO.mainPhone}</span>
            </a>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-extrabold shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب مباشر</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
