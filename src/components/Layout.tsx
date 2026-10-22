import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  Link2,
  Check,
  ChevronLeft,
  BookmarkCheck,
  UserCheck,
} from 'lucide-react';
import { COMPANY_INFO, FLEET_VEHICLES } from '../data/fleetData';
import { getVehicleBySlug } from '../utils/fleetLogic';
import { useApp } from '../context/AppContext';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'الرئيسية',
  '/cars': 'أسطول السيارات والبحث',
  '/search': 'البحث عن السيارات',
  '/gallery': 'معرض السيارات',
  '/about': 'من نحن',
  '/branches': 'فروعنا ونقاط الخدمة',
  '/contact': 'اتصل بنا',
  '/faq': 'الأسئلة الشائعة',
  '/privacy': 'سياسة الخصوصية',
  '/terms': 'الشروط والأحكام',
  '/bookings': 'حجوزاتي والمفضلة',
  '/login': 'تسجيل الدخول',
  '/register': 'إنشاء حساب جديد',
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { bookings, favorites, user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  const currentPath = location.pathname;
  const isHome = currentPath === '/';

  // Resolve breadcrumb title
  let pageTitle = ROUTE_TITLES[currentPath] || 'صفحة داخلية';
  if (currentPath.startsWith('/cars/')) {
    const slug = currentPath.replace('/cars/', '');
    const car = getVehicleBySlug(slug);
    if (car) {
      pageTitle = car.title;
    }
  }

  const displayCanonicalUrl = `https://almostashergroup.com${currentPath}${location.search}`;

  const handleCopyRouteLink = () => {
    const fullUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullUrl).catch(() => {});
    }
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const navItems = [
    { to: '/', label: 'الرئيسية', end: true },
    { to: '/cars', label: 'السيارات' },
    { to: '/gallery', label: 'معرض الصور' },
    { to: '/about', label: 'من نحن' },
    { to: '/branches', label: 'فروعنا' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sticky Top Header following 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title (single line wordmark) */}
          <Link
            to="/"
            className="flex items-center gap-3 text-lg sm:text-xl font-extrabold tracking-tight text-blue-950 whitespace-nowrap shrink-0"
          >
            {!logoError ? (
              <img
                src={COMPANY_INFO.logo}
                alt="شعار المستشار جروب"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="w-10 h-10 rounded-full border border-slate-300 object-cover shrink-0"
              />
            ) : (
              <span className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                المستشار
              </span>
            )}
            <span>المستشار جروب</span>
          </Link>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-700"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-blue-900 text-blue-900 font-extrabold'
                      : 'border-transparent text-slate-700 hover:text-blue-900 hover:border-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/bookings"
              aria-label="حجوزاتي والمفضلة"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors whitespace-nowrap shrink-0"
            >
              <BookmarkCheck className="w-4 h-4 text-blue-900" />
              <span>حجوزاتي ({bookings.length + favorites.length})</span>
            </Link>

            {user ? (
              <Link
                to="/login"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg whitespace-nowrap shrink-0"
              >
                <UserCheck className="w-4 h-4" />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
            ) : null}

            <Link
              to="/contact"
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              اتصل واحجز الآن
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 border border-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`
                }
              >
                اتصل بنا
              </NavLink>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs font-bold">
              <Link
                to="/bookings"
                className="px-3 py-2 rounded-lg bg-slate-100 text-slate-900 border border-slate-300"
              >
                حجوزاتي والمفضلة ({bookings.length + favorites.length})
              </Link>
              <Link
                to="/faq"
                className="px-3 py-2 rounded-lg bg-slate-100 text-slate-900 border border-slate-300"
              >
                الأسئلة الشائعة
              </Link>
              <Link
                to="/login"
                className="px-3 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-200"
              >
                {user ? `حسابي (${user.name})` : 'تسجيل الدخول / حساب جديد'}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Dedicated Route & Breadcrumb Bar on Inner Pages */}
      {!isHome && (
        <div className="bg-slate-100 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
            {/* Breadcrumb path */}
            <nav aria-label="مسار الصفحة" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Link to="/" className="hover:text-blue-900 transition-colors">
                الرئيسية
              </Link>
              {currentPath.startsWith('/cars/') && (
                <>
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  <Link to="/cars" className="hover:text-blue-900 transition-colors">
                    أسطول السيارات
                  </Link>
                </>
              )}
              <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-blue-950 font-extrabold truncate max-w-xs sm:max-w-md">
                {pageTitle}
              </span>
            </nav>

            {/* Shareable Direct Route Link Indicator */}
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-slate-300 text-xs">
              <span className="text-slate-600 font-semibold hidden sm:inline">رابط الصفحة:</span>
              <code
                dir="ltr"
                className="font-mono text-[11px] font-semibold text-blue-950 truncate max-w-[210px] sm:max-w-[300px]"
              >
                {displayCanonicalUrl}
              </code>
              <button
                type="button"
                onClick={handleCopyRouteLink}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold transition-colors whitespace-nowrap shrink-0"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-emerald-800">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5" />
                    <span>نسخ الرابط</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Authentic High-Contrast Deep Navy Footer */}
      <footer className="bg-[#0F2557] text-white border-t border-blue-900 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Column 1: Brand Info */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4">
                {!logoError ? (
                  <img
                    src={COMPANY_INFO.logo}
                    alt="شعار المستشار جروب"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full bg-white p-0.5 object-cover shrink-0"
                  />
                ) : null}
                <div>
                  <span className="block text-lg font-extrabold text-white">
                    {COMPANY_INFO.name}
                  </span>
                  <span className="block text-xs font-semibold text-blue-200">
                    {COMPANY_INFO.subName}
                  </span>
                </div>
              </Link>
              <p className="text-sm text-blue-100 leading-relaxed mb-5">
                من أكبر شركات الليموزين وتأجير السيارات في صعيد مصر منذ عام 2005. نوفر أحدث الأسطول للإيجار اليومي والأسبوعي والشهري بسائق وبدون سائق.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  إنشاء حساب جديد
                </Link>
              </div>
            </div>

            {/* Column 2: Phone Numbers */}
            <div>
              <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>أرقام التواصل المباشر</span>
              </h3>
              <ul className="space-y-2.5 text-sm">
                {COMPANY_INFO.allPhones.map((item) => (
                  <li key={item.number} className="flex items-center justify-between gap-2">
                    <a
                      href={`tel:${item.number}`}
                      dir="ltr"
                      className="font-mono font-bold text-white hover:text-amber-300 transition-colors tabular-nums"
                    >
                      {item.number}
                    </a>
                    <span className="text-xs text-blue-200 font-medium">({item.label})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Fast Contact & Official Emails */}
            <div>
              <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>تواصل سريع وبريد رسمي</span>
              </h3>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold mb-4 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="tabular-nums">واتساب: {COMPANY_INFO.mainPhone}</span>
              </a>
              <ul className="space-y-1.5 text-xs text-blue-100 mb-4">
                {COMPANY_INFO.emails.map((e) => (
                  <li key={e.email} className="truncate">
                    <a
                      href={`mailto:${e.email}`}
                      dir="ltr"
                      className="hover:text-white transition-colors font-mono"
                    >
                      {e.email}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="space-y-1.5 text-xs text-blue-100 pt-2 border-t border-blue-800/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Column 4: Quick Links (Every page has its dedicated route!) */}
            <div>
              <h3 className="text-base font-extrabold text-white mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-sm font-semibold text-blue-100">
                <li>
                  <Link to="/" className="hover:text-white transition-colors block py-0.5">
                    الرئيسية (/)
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors block py-0.5">
                    من نحن (/about)
                  </Link>
                </li>
                <li>
                  <Link to="/cars" className="hover:text-white transition-colors block py-0.5">
                    السيارات والبحث (/cars)
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-white transition-colors block py-0.5">
                    معرض الصور (/gallery)
                  </Link>
                </li>
                <li>
                  <Link to="/branches" className="hover:text-white transition-colors block py-0.5">
                    الفروع (/branches)
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors block py-0.5">
                    اتصل بنا (/contact)
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors block py-0.5">
                    الأسئلة الشائعة (/faq)
                  </Link>
                </li>
                <li>
                  <Link to="/bookings" className="hover:text-white transition-colors block py-0.5">
                    حجوزاتي والمفضلة (/bookings)
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="mt-10 pt-6 border-t border-blue-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200 font-semibold">
            <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="hover:text-white transition-colors">
                الشروط والأحكام (/terms)
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                سياسة الخصوصية (/privacy)
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
