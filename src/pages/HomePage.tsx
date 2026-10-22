import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Phone,
  ShieldCheck,
  Car,
  Award,
  Users,
  ArrowLeft,
  Handshake,
  CheckCircle2,
  Plane,
  Briefcase,
  Sparkles,
  Calendar,
} from 'lucide-react';
import {
  COMPANY_INFO,
  FLEET_VEHICLES,
  PARTNERS_LIST,
  VehicleCategory,
} from '../data/fleetData';
import { filterAndSortFleet } from '../utils/fleetLogic';
import { VehicleCard } from '../components/VehicleCard';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [quickQuery, setQuickQuery] = useState('');
  const [quickCategory, setQuickCategory] = useState<VehicleCategory>('all');
  const [homeTab, setHomeTab] = useState<VehicleCategory>('all');
  const [heroImgError, setHeroImgError] = useState(false);

  const featuredCars = filterAndSortFleet(FLEET_VEHICLES, {
    category: homeTab,
    sortBy: 'featured',
  }).slice(0, 6);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quickQuery.trim()) params.set('q', quickQuery.trim());
    if (quickCategory !== 'all') params.set('cat', quickCategory);
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#09152E] via-[#0F2557] to-[#132C66] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Right Column (in RTL): Brand Headline, Value Proposition, CTAs, Metrics */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-bold text-blue-100">
                <span>خبرة أكثر من 18 عاماً في صعيد مصر منذ 2005</span>
              </div>

              <h1
                className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold leading-tight tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                <span className="text-sky-400">المستشار</span> جروب لتأجير السيارات
              </h1>

              <p className="text-base sm:text-lg text-blue-100 font-medium leading-relaxed max-w-2xl">
                نقدم لكم أفضل خدمات تأجير السيارات والليموزين في صعيد مصر بأحدث الموديلات وأعلى معايير الأمان والرفاهية.
              </p>

              <p className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                يومي · أسبوعي · شهري · بسائق محترف وبدون سائق
              </p>

              {/* Primary & Secondary Hero Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  to="/cars"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-lg transition-colors whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>ابحث عن سيارة</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm shadow-lg transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-blue-900" />
                  <span>تواصل معنا</span>
                </Link>
              </div>

              {/* 4 Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3.5 text-center">
                  <Car className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                  <div className="text-xl font-extrabold text-white tabular-nums">+50</div>
                  <div className="text-xs font-semibold text-blue-100">سيارات حديثة</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3.5 text-center">
                  <ShieldCheck className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                  <div className="text-xl font-extrabold text-white tabular-nums">100%</div>
                  <div className="text-xs font-semibold text-blue-100">ضمان الجودة</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3.5 text-center">
                  <Award className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                  <div className="text-xl font-extrabold text-white tabular-nums">+18</div>
                  <div className="text-xs font-semibold text-blue-100">سنوات خبرة</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3.5 text-center">
                  <Users className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                  <div className="text-xl font-extrabold text-white tabular-nums">+5000</div>
                  <div className="text-xs font-semibold text-blue-100">عملاء راضون</div>
                </div>
              </div>
            </div>

            {/* Left Column (in RTL): Featured Mercedes S-Class Showcase Frame */}
            <div className="lg:col-span-5">
              <div className="relative bg-slate-950/80 border-2 border-blue-800/80 rounded-2xl p-3 sm:p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 text-white text-xs font-extrabold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    متاح الآن للحجز
                  </span>
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    ★ تقييم العملاء 4.9 / 5
                  </span>
                </div>

                <Link to="/cars/mercedes-s-class" className="block rounded-xl overflow-hidden bg-black">
                  {!heroImgError ? (
                    <img
                      src={COMPANY_INFO.heroImage}
                      alt="مرسيدس S-Class الفاخرة - المستشار جروب"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="w-full h-64 sm:h-72 object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-64 sm:h-72 flex flex-col items-center justify-center bg-slate-900 text-white">
                      <Car className="w-14 h-14 text-sky-400 mb-2" />
                      <span className="font-bold">مرسيدس بنز S-Class</span>
                    </div>
                  )}
                </Link>

                <div className="mt-3 flex items-center justify-between px-1 pt-2 border-t border-slate-800">
                  <div>
                    <div className="text-sm font-extrabold text-white">
                      مرسيدس بنز S-Class وأسطول 2026
                    </div>
                    <div className="text-xs text-blue-200 font-semibold">
                      أسيوط · شارع الجلاء · توصيل لجميع المحافظات
                    </div>
                  </div>
                  <Link
                    to="/cars/mercedes-s-class"
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                  >
                    احجزها الآن
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Bar & 4 High-Contrast Service Pillars (Fixes the washed-out white icons from original screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-300 shadow-lg p-5 sm:p-6">
          <form
            onSubmit={handleQuickSearch}
            className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end"
          >
            <div className="md:col-span-5">
              <label
                htmlFor="home-quick-search"
                className="block text-xs font-extrabold text-slate-800 mb-1.5"
              >
                ابحث باسم السيارة أو الموديل
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="home-quick-search"
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="مثال: كيا سيراتو 2026، سبورتاج، مرسيدس، هاي أس..."
                  className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-500 text-sm font-semibold focus:outline-none focus:border-blue-800 focus:bg-white"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label
                htmlFor="home-quick-category"
                className="block text-xs font-extrabold text-slate-800 mb-1.5"
              >
                فئة السيارة أو الخدمة
              </label>
              <select
                id="home-quick-category"
                value={quickCategory}
                onChange={(e) => setQuickCategory(e.target.value as VehicleCategory)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm font-bold focus:outline-none focus:border-blue-800 focus:bg-white"
              >
                <option value="all">جميع فئات السيارات (18 سيارة وباقة)</option>
                <option value="sedan">سيدان حديثة واقتصادية</option>
                <option value="suv">دفع رباعي عائلية SUV</option>
                <option value="luxury_wedding">سيارات فارهة وزفاف</option>
                <option value="van_bus">فان وباصات سياحية</option>
                <option value="corporate">تعاقدات شركات ومطارات</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 px-5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>عرض السيارات المتاحة</span>
              </button>
            </div>
          </form>

          {/* 4 High-Contrast Service Pillars (Replacing the 4 washed-out grey circles in original UI) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-200">
            <Link
              to="/cars?mode=self_drive"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">إيجار يومي وشهري</div>
                <div className="text-xs font-semibold text-slate-600">بسائق أو قيادة ذاتية</div>
              </div>
            </Link>

            <Link
              to="/cars?cat=luxury_wedding"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-red-700 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">سيارات الزفاف والأفراح</div>
                <div className="text-xs font-semibold text-slate-600">شاملة الزينة والسائق</div>
              </div>
            </Link>

            <Link
              to="/cars/airport-vip-transfer"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">توصيل واستقبال المطارات</div>
                <div className="text-xs font-semibold text-slate-600">أسيوط · سوهاج · القاهرة</div>
              </div>
            </Link>

            <Link
              to="/cars/corporate-long-term"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">تعاقدات الشركات</div>
                <div className="text-xs font-semibold text-slate-600">عقود سنوية وشهرية</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Section: اختر خدمتك — خدماتنا المميزة (Fixed high contrast) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold text-red-700 block mb-1">اختر خدمتك</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">خدماتنا المميزة</h2>
          <div className="w-16 h-1 bg-blue-900 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1: قيادة ذاتية */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0F2557] to-[#1D4ED8] text-white p-6 sm:p-8 border border-blue-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                  <Car className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold text-blue-100 bg-white/10 px-3 py-1 rounded-md">
                  حرية وخصوصية كاملة
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">قيادة ذاتية (بدون سائق)</h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                استأجر سيارتك المفضلة وقُدها بنفسك بحرية تامة. إجراءات تعاقد سريعة، سيارات موديل السنة مفحوصة بالكامل، وتسليم فوري في أسيوط أو المطار.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/15">
              <span className="text-xs font-bold text-amber-300">
                يومي · أسبوعي · شهري
              </span>
              <Link
                to="/cars?mode=self_drive"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-950 hover:bg-blue-50 text-xs font-extrabold transition-colors"
              >
                <span>اطلب الآن</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: مع سائق محترف */}
          <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-8 border-2 border-slate-200 hover:border-blue-800 shadow-md flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
                  <Users className="w-6 h-6" />
                </span>
                <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md">
                  راحة وأمان على الطريق
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">إيجار مع سائق محترف</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                سائق محترف يوصلك لأي مكان داخل الجمهورية براحة وأمان. مثالي لرحلات المطارات، المؤتمرات، رجال الأعمال، ومواكب الزفاف والمناسبات الخاصة.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700">
                التزام تام بالمواعيد · 24 ساعة
              </span>
              <Link
                to="/cars?mode=with_driver"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold transition-colors"
              >
                <span>اطلب الآن</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm font-bold text-slate-700 mt-5">
          أسطول متنوع من السيارات الحديثة · خدمة على مدار الساعة · أسعار تنافسية بدون وسطاء
        </p>
      </section>

      {/* Featured Fleet Section: أحدث الإعلانات والسيارات (Replaces the 6 empty skeleton boxes in original screenshot) */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                أحدث السيارات والإعلانات
              </h2>
              <p className="text-sm font-semibold text-slate-700 mt-1">
                اختر سيارتك من تشكيلتنا المتجددة — كل سيارة لها صفحة مستقلة بالتفاصيل والحجز المباشر
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'all', label: 'الكل' },
                  { id: 'sedan', label: 'سيدان' },
                  { id: 'suv', label: 'SUV' },
                  { id: 'luxury_wedding', label: 'فارهة وزفاف' },
                ] as { id: VehicleCategory; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setHomeTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap ${
                    homeTab === tab.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <Link
                to="/cars"
                className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold transition-colors whitespace-nowrap"
              >
                عرض الكل ({FLEET_VEHICLES.length})
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} layout="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Al-Mostashar Group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
            لماذا تختار المستشار جروب
          </h2>
          <p className="text-sm font-semibold text-slate-700 mt-2">
            خبرة تمتد لأكثر من 18 عاماً تجعلنا الخيار الأول لتأجير السيارات في صعيد مصر
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">ثقة وأمان</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              منصة موثوقة ومؤمنة تضمن حماية بياناتك وخصوصيتك في جميع المعاملات مع سيارات مفحوصة ومزودة بـ GPS.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">تعامل مباشر</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              تعاقد مباشر مع الشركة المالكة للأسطول بدون وسطاء أو سماسرة، مما يوفر عليك العمولات الإضافية والوقت.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">بحث وحجز سهل</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              نظام بحث وفلترة متقدم يساعدك في العثور على السيارة المثالية التي تناسب احتياجاتك وميزانيتك في ثوانٍ.
            </p>
          </div>
        </div>
      </section>

      {/* About Summary Section */}
      <section className="bg-white border-t border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">من نحن</h2>
            <div className="w-12 h-1 bg-blue-900 mx-auto mt-2 mb-4 rounded-full" />
            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              نحن شركة إيجار سيارات في صعيد مصر تأسست عام 2005، خبرة أكثر من 18 عاماً في مجال الليموزين والإيجار. نمتلك أسطولاً من أحدث السيارات المزودة بـ GPS ووسائل الأمان والرفاهية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <h3 className="text-lg font-extrabold text-blue-950 mb-2">أسطول متنوع</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                كيا جراند سيراتو، كيا سيراتو 2026، تويوتا كورولا، هيونداي سوناتا، توسان، سبورتاج، مرسيدس، BMW، هاي أس وباصات سياحية.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <h3 className="text-lg font-extrabold text-blue-950 mb-2">خدمات شاملة</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                مؤتمرات، اجتماعات، مناسبات وزفاف، زيارات رسمية، توصيل واستقبال من المطارات داخل جميع المحافظات.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
              <h3 className="text-lg font-extrabold text-blue-950 mb-2">سائقون محترفون</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                فريق عمل من السائقين مدربين على أعلى مستوى يمتلكون خبرات الطرق داخل كافة محافظات الجمهورية.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-colors"
            >
              <span>اقرأ المزيد عن المستشار جروب</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Partners Section: سابقة أعمالنا وشركاء النجاح */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            سابقة أعمالنا وشركاء النجاح
          </h2>
          <div className="w-14 h-1 bg-blue-900 mx-auto mt-2 mb-2 rounded-full" />
          <p className="text-sm font-semibold text-slate-700">
            نفتخر بثقة عملائنا من كبرى الشركات والمؤسسات والهيئات في مصر
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PARTNERS_LIST.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col items-center justify-center shadow-2xs hover:border-blue-800 transition-colors"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                referrerPolicy="no-referrer"
                className="h-16 w-auto object-contain mb-2"
              />
              <span className="text-xs font-extrabold text-slate-800 text-center">
                {partner.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-600 text-center">
                {partner.role}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
