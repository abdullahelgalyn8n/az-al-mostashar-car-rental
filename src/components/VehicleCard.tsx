import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Users,
  Fuel,
  Gauge,
  Calendar,
  Phone,
  ArrowLeft,
  Car,
  CheckCircle2,
} from 'lucide-react';
import { VehicleProduct, COMPANY_INFO } from '../data/fleetData';
import { formatCurrencyEgp } from '../utils/fleetLogic';
import { useApp } from '../context/AppContext';

interface VehicleCardProps {
  vehicle: VehicleProduct;
  layout?: 'grid' | 'list';
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  layout = 'grid',
}) => {
  const { favorites, toggleFavorite } = useApp();
  const [imgError, setImgError] = useState(false);
  const isFav = favorites.includes(vehicle.slug);

  const renderImage = () => (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden group">
      {!imgError ? (
        <img
          src={vehicle.image}
          alt={vehicle.title}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-blue-950 text-white p-6 text-center">
          <Car className="w-12 h-12 text-blue-300 mb-2" />
          <span className="font-bold text-base">{vehicle.title}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/25 pointer-events-none" />

      {/* Top row: Model year & Favorite toggle */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-md bg-red-700 text-white text-xs font-bold tracking-wide shadow-sm tabular-nums">
          موديل {vehicle.modelYear}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(vehicle.slug);
          }}
          aria-label={isFav ? `إزالة ${vehicle.title} من المفضلة` : `إضافة ${vehicle.title} للمفضلة`}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isFav
              ? 'bg-red-600 text-white'
              : 'bg-white/95 text-slate-800 hover:bg-white hover:text-red-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Bottom overlay info */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-semibold">
        <span className="bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded text-white">
          {vehicle.categoryLabel}
        </span>
        {vehicle.weddingReady && (
          <span className="bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded">
            متاحة للزفاف والأفراح
          </span>
        )}
      </div>
    </div>
  );

  if (layout === 'list') {
    return (
      <article className="bg-white rounded-xl border border-slate-200 hover:border-blue-800 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col md:flex-row">
        {/* Image side (Right in RTL) */}
        <Link
          to={`/cars/${vehicle.slug}`}
          className="md:w-80 lg:w-96 h-60 md:h-auto shrink-0 block"
        >
          {renderImage()}
        </Link>

        {/* Details side (Left in RTL) */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span>{vehicle.brand}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-800" />
                  {vehicle.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{vehicle.viewsCount} مشاهدة</span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                متاحة للحجز الفوري
              </span>
            </div>

            <Link
              to={`/cars/${vehicle.slug}`}
              className="block text-xl font-extrabold text-slate-900 hover:text-blue-800 transition-colors mb-1.5"
            >
              {vehicle.title}
            </Link>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {vehicle.description}
            </p>

            {/* Unboxed clean specifications bar with high contrast */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-800 shrink-0" />
                <span>السنة: {vehicle.modelYear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-blue-800 shrink-0" />
                <span>ناقل: {vehicle.transmission}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Fuel className="w-4 h-4 text-blue-800 shrink-0" />
                <span>الوقود: {vehicle.fuel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-800 shrink-0" />
                <span className="tabular-nums">المقاعد: {vehicle.seats} ركاب</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA footer */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-baseline gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-600 block">الإيجار اليومي يبدأ من</span>
                <span className="text-xl font-extrabold text-blue-900 tabular-nums">
                  {formatCurrencyEgp(vehicle.dailyRateEgp)}
                </span>
                <span className="text-xs font-semibold text-slate-600 mr-1">/ يوم</span>
              </div>
              <div className="text-xs font-semibold text-slate-700 border-r border-slate-300 pr-4">
                <span>أسبوعي: </span>
                <strong className="text-slate-900 tabular-nums">
                  {formatCurrencyEgp(vehicle.weeklyRateEgp)}
                </strong>
                <span className="mx-1.5 text-slate-400">·</span>
                <span>شهري: </span>
                <strong className="text-slate-900 tabular-nums">
                  {formatCurrencyEgp(vehicle.monthlyRateEgp)}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={`tel:${COMPANY_INFO.mainPhone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-blue-800" />
                <span>اتصال مباشر</span>
              </a>
              <Link
                to={`/cars/${vehicle.slug}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <span>التفاصيل والحجز</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-xl border border-slate-200 hover:border-blue-800 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      <Link to={`/cars/${vehicle.slug}`} className="h-56 w-full block">
        {renderImage()}
      </Link>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata row */}
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-600 mb-1.5">
            <div className="flex items-center gap-1.5 truncate">
              <span>{vehicle.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{vehicle.transmission}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{vehicle.seats} ركاب</span>
            </div>
            <span className="inline-flex items-center gap-1 text-emerald-800 font-bold shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              متاح
            </span>
          </div>

          <Link
            to={`/cars/${vehicle.slug}`}
            className="block text-lg font-extrabold text-slate-900 hover:text-blue-800 transition-colors line-clamp-1 mb-1"
          >
            {vehicle.title}
          </Link>

          <p className="text-xs text-slate-700 leading-relaxed line-clamp-2 mb-3">
            {vehicle.subtitle}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium mb-4">
            <MapPin className="w-3.5 h-3.5 text-blue-800 shrink-0" />
            <span className="truncate">{vehicle.location}</span>
          </div>
        </div>

        <div>
          {/* Pricing box with high contrast */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-200 mb-3.5">
            <div>
              <span className="text-[11px] font-semibold text-slate-600 block">الإيجار اليومي</span>
              <span className="text-base font-extrabold text-blue-900 tabular-nums">
                {formatCurrencyEgp(vehicle.dailyRateEgp)}
              </span>
            </div>
            <div className="text-left">
              <span className="text-[11px] font-semibold text-slate-600 block">الإيجار الشهري</span>
              <span className="text-xs font-bold text-slate-900 tabular-nums">
                {formatCurrencyEgp(vehicle.monthlyRateEgp)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/cars/${vehicle.slug}`}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              <span>التفاصيل والحجز</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <a
              href={`https://wa.me/201004418955?text=${encodeURIComponent(
                `مرحباً المستشار جروب، أرغب في الاستفسار عن حجز: ${vehicle.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-bold transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>تواصل للسعر</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
