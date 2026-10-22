import {
  FLEET_VEHICLES,
  VehicleCategory,
  ServiceMode,
  VehicleProduct,
} from '../data/fleetData';

export type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'year_desc' | 'popular';
export type RentalPeriod = 'daily' | 'weekly' | 'monthly';

export interface FleetFilterCriteria {
  query?: string;
  category?: VehicleCategory;
  serviceMode?: ServiceMode;
  brand?: string;
  weddingOnly?: boolean;
  sortBy?: SortOption;
}

export interface RentalCalculationInput {
  vehicle: VehicleProduct;
  period: RentalPeriod;
  quantity: number;
  withDriver: boolean;
  weddingDecoration?: boolean;
}

export interface RentalCalculationResult {
  baseCostEgp: number;
  driverCostEgp: number;
  decorationCostEgp: number;
  totalEgp: number;
  totalDaysEquivalent: number;
  periodLabel: string;
  savingsEgp: number;
}

export interface BookingFormInput {
  customerName: string;
  phone: string;
  pickupDate: string;
  pickupLocation: string;
  vehicleSlug: string;
  period: RentalPeriod;
  quantity: number;
  withDriver: boolean;
  notes?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function filterAndSortFleet(
  vehicles: VehicleProduct[],
  criteria: FleetFilterCriteria
): VehicleProduct[] {
  const query = (criteria.query || '').trim().toLowerCase();
  const category = criteria.category || 'all';
  const serviceMode = criteria.serviceMode || 'all';
  const brand = (criteria.brand || 'all').trim();
  const weddingOnly = Boolean(criteria.weddingOnly);
  const sortBy: SortOption = criteria.sortBy || 'featured';

  const filtered = vehicles.filter((v) => {
    if (category !== 'all' && v.category !== category) {
      return false;
    }
    if (serviceMode !== 'all' && !v.serviceModes.includes(serviceMode)) {
      return false;
    }
    if (brand !== 'all' && brand !== '' && v.brand !== brand) {
      return false;
    }
    if (weddingOnly && !v.weddingReady) {
      return false;
    }
    if (query.length > 0) {
      const searchable = [
        v.title,
        v.subtitle,
        v.brand,
        v.categoryLabel,
        v.description,
        String(v.modelYear),
        ...v.highlights,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.dailyRateEgp - b.dailyRateEgp;
      case 'price_desc':
        return b.dailyRateEgp - a.dailyRateEgp;
      case 'year_desc':
        return b.modelYear - a.modelYear || b.viewsCount - a.viewsCount;
      case 'popular':
        return b.viewsCount - a.viewsCount;
      case 'featured':
      default:
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return b.viewsCount - a.viewsCount;
    }
  });
}

export function getVehicleBySlug(
  slug: string,
  vehicles: VehicleProduct[] = FLEET_VEHICLES
): VehicleProduct | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function calculateRentalEstimate(
  input: RentalCalculationInput
): RentalCalculationResult {
  const qty = Math.max(1, Math.floor(input.quantity || 1));
  const { vehicle, period, withDriver, weddingDecoration } = input;

  let baseUnitRate = vehicle.dailyRateEgp;
  let totalDaysEquivalent = qty;
  let periodLabel = `${qty} ${qty === 1 ? 'يوم' : qty === 2 ? 'يومين' : 'أيام'}`;

  if (period === 'weekly') {
    baseUnitRate = vehicle.weeklyRateEgp;
    totalDaysEquivalent = qty * 7;
    periodLabel = `${qty} ${qty === 1 ? 'أسبوع' : qty === 2 ? 'أسبوعين' : 'أسابيع'}`;
  } else if (period === 'monthly') {
    baseUnitRate = vehicle.monthlyRateEgp;
    totalDaysEquivalent = qty * 30;
    periodLabel = `${qty} ${qty === 1 ? 'شهر' : qty === 2 ? 'شهرين' : 'شهور'}`;
  }

  const baseCostEgp = baseUnitRate * qty;
  const driverCostEgp = withDriver ? vehicle.withDriverExtraEgp * totalDaysEquivalent : 0;
  // Wedding decoration is complimentary on wedding-ready vehicles when requested
  const decorationCostEgp = weddingDecoration && !vehicle.weddingReady ? 500 : 0;

  const unbundledDailyCost = vehicle.dailyRateEgp * totalDaysEquivalent;
  const savingsEgp = Math.max(0, unbundledDailyCost - baseCostEgp);

  return {
    baseCostEgp,
    driverCostEgp,
    decorationCostEgp,
    totalEgp: baseCostEgp + driverCostEgp + decorationCostEgp,
    totalDaysEquivalent,
    periodLabel,
    savingsEgp,
  };
}

export function validateBookingForm(input: BookingFormInput): BookingValidationResult {
  const errors: Record<string, string> = {};

  const name = (input.customerName || '').trim();
  if (name.length < 3) {
    errors.customerName = 'يرجى إدخال الاسم بالكامل (3 أحرف على الأقل)';
  }

  const cleanedPhone = (input.phone || '').replace(/[\s()-]/g, '');
  const egyptPhoneRegex = /^(\+?20|0)?1[0125]\d{8}$/;
  if (!egyptPhoneRegex.test(cleanedPhone)) {
    errors.phone = 'يرجى إدخال رقم هاتف مصري صحيح (مثال: 01004418955)';
  }

  if (!input.pickupDate || input.pickupDate.trim() === '') {
    errors.pickupDate = 'يرجى اختيار تاريخ الاستلام';
  }

  if (!input.pickupLocation || input.pickupLocation.trim().length < 2) {
    errors.pickupLocation = 'يرجى تحديد مكان الاستلام (المقر الرئيسي أو المطار أو عنوانك)';
  }

  if (!input.vehicleSlug || input.vehicleSlug.trim() === '') {
    errors.vehicleSlug = 'يرجى اختيار السيارة أو الباقة المطلوبة';
  }

  if (!input.quantity || input.quantity < 1 || input.quantity > 365) {
    errors.quantity = 'يرجى إدخال مدة إيجار صحيحة';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatCurrencyEgp(amount: number): string {
  return `${amount.toLocaleString('en-US')} ج.م`;
}
