import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Heart,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Calculator,
  Calendar,
  ArrowRight,
  Car,
  Sparkles,
  Check,
} from 'lucide-react';
import { FLEET_VEHICLES, COMPANY_INFO } from '../data/fleetData';
import {
  getVehicleBySlug,
  calculateRentalEstimate,
  validateBookingForm,
  formatCurrencyEgp,
  RentalPeriod,
} from '../utils/fleetLogic';
import { useApp, SavedBooking } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';

export const VehicleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { favorites, toggleFavorite, addBooking } = useApp();

  const vehicle = getVehicleBySlug(slug || '');

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [period, setPeriod] = useState<RentalPeriod>('daily');
  const [quantity, setQuantity] = useState<number>(2);
  const [withDriver, setWithDriver] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('2026-10-25');
  const [pickupLocation, setPickupLocation] = useState(
    'المقر الرئيسي - أسيوط شارع الجلاء'
  );
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<SavedBooking | null>(null);

  useEffect(() => {
    if (vehicle) {
      setSelectedImage(vehicle.image);
      setWithDriver(!vehicle.serviceModes.includes('self_drive'));
      setConfirmedBooking(null);
      setFormErrors({});
    }
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-slate-300 p-10 shadow-xs">
          <Car className="w-14 h-14 text-blue-900 mx-auto mb-3" />
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
            السيارة المطلوبة غير موجودة
          </h1>
          <p className="text-sm text-slate-700 mb-6">
            ربما تم تغيير الرابط أو انتقل الإعلان إلى قسم آخر. يمكنك تصفح كافة سيارات الأسطول المتاحة.
          </p>
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-extrabold"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى أسطول السيارات</span>
          </Link>
        </div>
      </div>
    );
  }

  const isFav = favorites.includes(vehicle.slug);
  const canSelfDrive = vehicle.serviceModes.includes('self_drive');

  const estimate = calculateRentalEstimate({
    vehicle,
    period,
    quantity,
    withDriver,
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm({
      customerName,
      phone,
      pickupDate,
      pickupLocation,
      vehicleSlug: vehicle.slug,
      period,
      quantity,
      withDriver,
      notes,
    });

    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    const saved = addBooking({
      customerName: customerName.trim(),
      phone: phone.trim(),
      pickupDate,
      pickupLocation,
      vehicleSlug: vehicle.slug,
      vehicleTitle: vehicle.title,
      period,
      periodLabel: estimate.periodLabel,
      quantity,
      withDriver,
      totalEgp: estimate.totalEgp,
      notes: notes.trim(),
    });
    setConfirmedBooking(saved);
  };

  const similarVehicles = FLEET_VEHICLES.filter(
    (v) => v.slug !== vehicle.slug && (v.category === vehicle.category || v.brand === vehicle.brand)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Column (7 cols in RTL): Gallery, Description, Specifications */}
        <div className="lg:col-span-7 space-y-6">
          {/* Gallery Box */}
          <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-xs">
            <div className="relative h-72 sm:h-96 bg-slate-950">
              <img
                src={selectedImage || vehicle.image}
                alt={vehicle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-red-700 text-white text-xs font-extrabold shadow-xs tabular-nums">
                  موديل {vehicle.modelYear} · {vehicle.categoryLabel}
                </span>
                <button
                  type="button"
                  onClick={() => toggleFavorite(vehicle.slug)}
                  aria-label={isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer ${
                    isFav
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  <span>{isFav ? 'محفوظة بالمفضلة' : 'حفظ بالمفضلة'}</span>
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {vehicle.gallery.length > 1 && (
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-3 overflow-x-auto">
                {vehicle.gallery.map((imgUrl, idx) => (
                  <button
                    key={`${imgUrl}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-24 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImage === imgUrl
                        ? 'border-blue-900 ring-2 ring-blue-900/30'
                        : 'border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${vehicle.title} - صورة ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Overview & Highlights */}
          <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span>الماركة: {vehicle.brand}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-900" />
                  {vehicle.location}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                متاحة للتسليم الفوري
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              {vehicle.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {vehicle.description}
            </p>

            {/* Highlights Grid */}
            <h2 className="text-base font-extrabold text-slate-900 mb-3">
              أبرز مميزات السيارة والخدمة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {vehicle.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-900"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Technical Specifications Table */}
            <h2 className="text-base font-extrabold text-slate-900 mb-3">
              المواصفات الفنية والتفاصيل
            </h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <dl className="divide-y divide-slate-200 text-sm">
                {vehicle.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-3 px-4 py-3 ${
                      i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <dt className="font-bold text-slate-700">{spec.label}</dt>
                    <dd className="col-span-2 font-extrabold text-slate-900">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Left Column (5 cols in RTL): Contiguous Pricing Calculator & Direct Booking Form */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-blue-900 shadow-md overflow-hidden">
            {/* Header Banner */}
            <div className="bg-[#0F2557] text-white p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>حاسبة التكلفة والحجز الفوري</span>
                </span>
                {vehicle.weddingReady && (
                  <span className="text-[11px] font-extrabold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded">
                    زينة الزفاف مجانية
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                  {formatCurrencyEgp(estimate.totalEgp)}
                </span>
                <span className="text-xs font-semibold text-blue-200">
                  إجمالي تقديري لمدة {estimate.periodLabel}
                </span>
              </div>
              {estimate.savingsEgp > 0 && (
                <div className="mt-1.5 text-xs font-bold text-emerald-300 tabular-nums">
                  ✓ وفّرت {formatCurrencyEgp(estimate.savingsEgp)} باختيار باقة الإيجار {period === 'weekly' ? 'الأسبوعي' : 'الشهري'}!
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Period Selector (Daily / Weekly / Monthly) */}
              <div>
                <span className="block text-xs font-extrabold text-slate-800 mb-2">
                  1. اختر نظام المحاسبة:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'daily', label: 'يومي', price: vehicle.dailyRateEgp },
                      { id: 'weekly', label: 'أسبوعي', price: vehicle.weeklyRateEgp },
                      { id: 'monthly', label: 'شهري', price: vehicle.monthlyRateEgp },
                    ] as { id: RentalPeriod; label: string; price: number }[]
                  ).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setPeriod(p.id);
                        setQuantity(1);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                        period === p.id
                          ? 'bg-blue-900 text-white border-blue-900 font-extrabold'
                          : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100 font-bold'
                      }`}
                    >
                      <span className="block text-xs">{p.label}</span>
                      <span className="block text-xs mt-0.5 tabular-nums opacity-95">
                        {formatCurrencyEgp(p.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Mode Selector (Self-drive vs With Driver) */}
              <div>
                <span className="block text-xs font-extrabold text-slate-800 mb-2">
                  2. نظام القيادة:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {canSelfDrive && (
                    <button
                      type="button"
                      onClick={() => setWithDriver(false)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold transition-colors cursor-pointer ${
                        !withDriver
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      قيادة ذاتية (بدون سائق)
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setWithDriver(true)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold transition-colors cursor-pointer ${
                      withDriver
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                    } ${!canSelfDrive ? 'col-span-2' : ''}`}
                  >
                    {vehicle.withDriverExtraEgp === 0
                      ? 'شامل سائق محترف مجاناً'
                      : `مع سائق محترف (+${vehicle.withDriverExtraEgp} ج.م/يوم)`}
                  </button>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label htmlFor="rental-qty" className="text-xs font-extrabold text-slate-800">
                  عدد {period === 'daily' ? 'الأيام' : period === 'weekly' ? 'الأسابيع' : 'الشهور'}:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="تقليل المدة"
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-extrabold text-slate-900 hover:bg-slate-100 cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    id="rental-qty"
                    type="number"
                    min={1}
                    max={365}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-14 text-center font-extrabold text-sm bg-white border border-slate-300 rounded-lg py-1 tabular-nums"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="زيادة المدة"
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-extrabold text-slate-900 hover:bg-slate-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Booking Form or Confirmation State */}
              {confirmedBooking ? (
                <div
                  data-testid="booking-confirmation"
                  className="bg-emerald-50 border-2 border-emerald-600 rounded-xl p-5 text-right space-y-3"
                >
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base">
                    <Check className="w-5 h-5 bg-emerald-600 text-white rounded-full p-0.5" />
                    <span>تم تسجيل طلب الحجز بنجاح!</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed">
                    رقم الحجز المرجعي:{' '}
                    <strong className="font-mono text-blue-950">{confirmedBooking.id}</strong> — سنتواصل معك فوراً على الرقم{' '}
                    <strong className="font-mono">{confirmedBooking.phone}</strong> لتأكيد استلام{' '}
                    <strong>{confirmedBooking.vehicleTitle}</strong>.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a
                      href={`https://wa.me/201004418955?text=${encodeURIComponent(
                        `مرحباً المستشار جروب، قمت بتسجيل طلب حجز رقم ${confirmedBooking.id}\nالسيارة: ${confirmedBooking.vehicleTitle}\nالاسم: ${confirmedBooking.customerName}\nالمدة: ${confirmedBooking.periodLabel}\nتاريخ الاستلام: ${confirmedBooking.pickupDate}\nالإجمالي التقديري: ${confirmedBooking.totalEgp} ج.م`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold text-center"
                    >
                      إرسال تفاصيل الحجز عبر واتساب
                    </a>
                    <Link
                      to="/bookings"
                      className="py-2.5 px-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-extrabold"
                    >
                      عرض حجوزاتي
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3.5 pt-2 border-t border-slate-200">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    3. أدخل بياناتك لتأكيد الحجز المبدئي:
                  </h3>

                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-xs font-bold text-slate-800 mb-1"
                    >
                      الاسم بالكامل *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="اكتب اسمك الثلاثي"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-900 focus:bg-white"
                    />
                    {formErrors.customerName && (
                      <p className="text-xs font-bold text-red-700 mt-1">
                        {formErrors.customerName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-bold text-slate-800 mb-1"
                      >
                        رقم الهاتف / واتساب *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01004418955"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-mono font-bold text-right focus:outline-none focus:border-blue-900 focus:bg-white"
                      />
                      {formErrors.phone && (
                        <p className="text-xs font-bold text-red-700 mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-xs font-bold text-slate-800 mb-1"
                      >
                        تاريخ الاستلام *
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-blue-900 focus:bg-white"
                      />
                      {formErrors.pickupDate && (
                        <p className="text-xs font-bold text-red-700 mt-1">
                          {formErrors.pickupDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-location"
                      className="block text-xs font-bold text-slate-800 mb-1"
                    >
                      مكان الاستلام المفضل *
                    </label>
                    <select
                      id="booking-location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-blue-900 focus:bg-white"
                    >
                      <option value="المقر الرئيسي - أسيوط شارع الجلاء">
                        المقر الرئيسي — أسيوط شارع الجلاء
                      </option>
                      <option value="مطار أسيوط الدولي - صالة الوصول">
                        مطار أسيوط الدولي — صالة الوصول
                      </option>
                      <option value="مطار سوهاج الدولي">مطار سوهاج الدولي</option>
                      <option value="مطار القاهرة الدولي">مطار القاهرة الدولي</option>
                      <option value="توصيل إلى عنوان العميل داخل المحافظة">
                        توصيل خاص إلى عنواني داخل المحافظة
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-extrabold text-sm shadow-sm transition-colors cursor-pointer"
                  >
                    تأكيد طلب الحجز ({formatCurrencyEgp(estimate.totalEgp)})
                  </button>
                </form>
              )}

              {/* Direct Call & WhatsApp Buttons */}
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${COMPANY_INFO.mainPhone}`}
                  className="py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-extrabold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-900" />
                  <span className="tabular-nums">{COMPANY_INFO.mainPhone}</span>
                </a>
                <a
                  href={`https://wa.me/201004418955?text=${encodeURIComponent(
                    `مرحباً المستشار جروب، أود حجز سيارة: ${vehicle.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>حجز عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>

          {/* Trust Guarantee Box */}
          <div className="bg-white rounded-xl border border-slate-300 p-4 flex items-center gap-3 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-8 h-8 text-blue-900 shrink-0" />
            <div>
              <span className="block text-slate-900 font-extrabold">
                ضمان المستشار جروب منذ 2005
              </span>
              <span className="text-slate-700 font-medium">
                جميع السيارات مفحوصة ومؤمنة ومزودة بـ GPS مع دعم فني وطوارئ 24 ساعة.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Vehicles Section */}
      {similarVehicles.length > 0 && (
        <section className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              سيارات مشابهة قد تهمك
            </h2>
            <Link
              to="/cars"
              className="text-xs sm:text-sm font-extrabold text-blue-900 hover:underline"
            >
              عرض كل الأسطول ←
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} layout="grid" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
