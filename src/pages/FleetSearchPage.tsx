import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles,
  Phone,
} from 'lucide-react';
import {
  FLEET_VEHICLES,
  CATEGORY_TABS,
  SERVICE_MODE_TABS,
  VehicleCategory,
  ServiceMode,
  COMPANY_INFO,
} from '../data/fleetData';
import { filterAndSortFleet, SortOption } from '../utils/fleetLogic';
import { VehicleCard } from '../components/VehicleCard';

export const FleetSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState<VehicleCategory>(
    (searchParams.get('cat') as VehicleCategory) || 'all'
  );
  const [serviceMode, setServiceMode] = useState<ServiceMode>(
    (searchParams.get('mode') as ServiceMode) || 'all'
  );
  const [brand, setBrand] = useState(searchParams.get('brand') || 'all');
  const [weddingOnly, setWeddingOnly] = useState(searchParams.get('wedding') === '1');
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'featured'
  );
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'all') params.set('cat', category);
    if (serviceMode !== 'all') params.set('mode', serviceMode);
    if (brand !== 'all') params.set('brand', brand);
    if (weddingOnly) params.set('wedding', '1');
    if (sortBy !== 'featured') params.set('sort', sortBy);
    setSearchParams(params, { replace: true });
  }, [query, category, serviceMode, brand, weddingOnly, sortBy, setSearchParams]);

  const brands = Array.from(new Set(FLEET_VEHICLES.map((v) => v.brand)));

  const filteredVehicles = filterAndSortFleet(FLEET_VEHICLES, {
    query,
    category,
    serviceMode,
    brand,
    weddingOnly,
    sortBy,
  });

  const handleResetFilters = () => {
    setQuery('');
    setCategory('all');
    setServiceMode('all');
    setBrand('all');
    setWeddingOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
            البحث عن السيارات وأسطول الإيجار
          </h1>
          <p className="text-sm font-semibold text-slate-700 mt-1">
            استخدم الفلتر للعثور على السيارة المثالية — إيجار يومي وأسبوعي وشهري، بسائق أو قيادة ذاتية
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-xs font-extrabold text-slate-800 bg-white px-3.5 py-2 rounded-lg border border-slate-300 tabular-nums">
            عرض {filteredVehicles.length} من {FLEET_VEHICLES.length} سيارة وباقة
          </span>

          {/* Grid / List View Switcher */}
          <div className="inline-flex items-center p-1 bg-white rounded-lg border border-slate-300">
            <button
              type="button"
              onClick={() => setViewLayout('grid')}
              aria-label="عرض شبكي"
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewLayout === 'grid'
                  ? 'bg-blue-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>شبكة</span>
            </button>
            <button
              type="button"
              onClick={() => setViewLayout('list')}
              aria-label="عرض قائمة مفصلة"
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewLayout === 'list'
                  ? 'bg-blue-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>قائمة مفصلة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Organized High-Contrast Filter Panel */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-xs p-5 mb-8 space-y-5">
        {/* Top Row: Search input, Brand select, Sort select, Wedding toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
          <div className="lg:col-span-4">
            <label
              htmlFor="fleet-search-input"
              className="block text-xs font-extrabold text-slate-800 mb-1.5"
            >
              البحث بالكلمة المفتاحية
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="fleet-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن سيراتو، سبورتاج، مرسيدس، توسان، زفاف..."
                className="w-full pr-10 pl-3 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-500 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-800 focus:bg-white"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <label
              htmlFor="fleet-brand-select"
              className="block text-xs font-extrabold text-slate-800 mb-1.5"
            >
              الماركة
            </label>
            <select
              id="fleet-brand-select"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-blue-800 focus:bg-white"
            >
              <option value="all">جميع الماركات</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <label
              htmlFor="fleet-sort-select"
              className="block text-xs font-extrabold text-slate-800 mb-1.5"
            >
              ترتيب النتائج حسب
            </label>
            <select
              id="fleet-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-blue-800 focus:bg-white"
            >
              <option value="featured">الأكثر تميزاً وطلباً</option>
              <option value="price_asc">السعر: من الأقل إلى الأعلى</option>
              <option value="price_desc">السعر: من الأعلى إلى الأقل</option>
              <option value="year_desc">الموديل: الأحدث أولاً (2026)</option>
              <option value="popular">الأكثر مشاهدة</option>
            </select>
          </div>

          <div className="lg:col-span-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setWeddingOnly((prev) => !prev)}
              className={`flex-1 py-2.5 px-3 rounded-lg border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                weddingOnly
                  ? 'bg-amber-500 border-amber-600 text-slate-950'
                  : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>للزفاف فقط</span>
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              aria-label="إعادة ضبط الفلتر"
              title="إعادة ضبط الفلتر"
              className="p-2.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-extrabold text-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-900" />
            <span>فئة السيارة:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategory(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap ${
                  category === tab.id
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service Mode Tabs */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-slate-700 ml-2">نظام الخدمة:</span>
          {SERVICE_MODE_TABS.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setServiceMode(mode.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                serviceMode === mode.id
                  ? 'bg-red-700 text-white'
                  : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid or Detailed List */}
      {filteredVehicles.length > 0 ? (
        <div
          className={
            viewLayout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-5'
          }
        >
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} layout={viewLayout} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-300 p-10 text-center max-w-xl mx-auto my-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">
            لا توجد سيارات مطابقة لمعايير البحث الحالية
          </h2>
          <p className="text-sm text-slate-700 mb-6">
            جرّب تغيير فئة السيارة أو البحث باسم موديل آخر، أو تواصل معنا مباشرة لتوفير السيارة المطلوبة فوراً.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-extrabold cursor-pointer"
            >
              عرض جميع السيارات ({FLEET_VEHICLES.length})
            </button>
            <a
              href={`tel:${COMPANY_INFO.mainPhone}`}
              className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-extrabold inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-blue-900" />
              <span>اتصل بنا: {COMPANY_INFO.mainPhone}</span>
            </a>
          </div>
        </div>
      )}

      {/* Bottom Help Banner */}
      <div className="mt-12 bg-gradient-to-r from-[#0F2557] to-[#1E3A8A] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold mb-1">
            هل تبحث عن تعاقد طويل الأمد للشركات أو موكب زفاف خاص؟
          </h2>
          <p className="text-sm text-blue-100">
            فريق خدمة عملاء المستشار جروب متاح على مدار 24 ساعة لتقديم عروض أسعار مخصصة للشركات والأفراد.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={`tel:${COMPANY_INFO.mainPhone}`}
            className="px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs sm:text-sm font-extrabold transition-colors whitespace-nowrap"
          >
            اتصل الآن: {COMPANY_INFO.mainPhone}
          </a>
          <Link
            to="/contact"
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-extrabold transition-colors whitespace-nowrap"
          >
            اطلب عرض سعر
          </Link>
        </div>
      </div>
    </div>
  );
};
