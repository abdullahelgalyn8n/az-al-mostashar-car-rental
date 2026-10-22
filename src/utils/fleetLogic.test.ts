import test from 'node:test';
import assert from 'node:assert/strict';
import { FLEET_VEHICLES } from '../data/fleetData';
import {
  filterAndSortFleet,
  getVehicleBySlug,
  calculateRentalEstimate,
  validateBookingForm,
} from './fleetLogic';

test('FLEET_VEHICLES contains 18 well-structured vehicles and packages with unique slugs', () => {
  assert.equal(FLEET_VEHICLES.length, 18);
  const slugs = new Set(FLEET_VEHICLES.map((v) => v.slug));
  assert.equal(slugs.size, 18);
});

test('filterAndSortFleet filters by category, serviceMode, and search query accurately', () => {
  const suvs = filterAndSortFleet(FLEET_VEHICLES, { category: 'suv' });
  assert.equal(suvs.length, 2);
  assert.ok(suvs.every((v) => v.category === 'suv'));

  const ceratoSearch = filterAndSortFleet(FLEET_VEHICLES, { query: 'سيراتو' });
  assert.ok(ceratoSearch.length >= 2);
  assert.ok(ceratoSearch.some((v) => v.slug === 'kia-cerato-2026'));

  const priceSorted = filterAndSortFleet(FLEET_VEHICLES, { sortBy: 'price_asc' });
  assert.ok(priceSorted[0].dailyRateEgp <= priceSorted[1].dailyRateEgp);
  assert.ok(
    priceSorted[priceSorted.length - 2].dailyRateEgp <=
      priceSorted[priceSorted.length - 1].dailyRateEgp
  );
});

test('getVehicleBySlug retrieves exact vehicle by route slug', () => {
  const car = getVehicleBySlug('mercedes-s-class');
  assert.ok(car);
  assert.equal(car.brand, 'مرسيدس');
  assert.equal(getVehicleBySlug('non-existent-car'), undefined);
});

test('calculateRentalEstimate computes daily, weekly, monthly rates and savings', () => {
  const cerato = getVehicleBySlug('kia-cerato-2026')!;
  const dailyEst = calculateRentalEstimate({
    vehicle: cerato,
    period: 'daily',
    quantity: 3,
    withDriver: true,
  });
  assert.equal(dailyEst.baseCostEgp, 1850 * 3);
  assert.equal(dailyEst.driverCostEgp, 450 * 3);
  assert.equal(dailyEst.totalEgp, (1850 + 450) * 3);
  assert.equal(dailyEst.savingsEgp, 0);

  const weeklyEst = calculateRentalEstimate({
    vehicle: cerato,
    period: 'weekly',
    quantity: 1,
    withDriver: false,
  });
  assert.equal(weeklyEst.baseCostEgp, 11500);
  assert.equal(weeklyEst.savingsEgp, 1850 * 7 - 11500);
});

test('validateBookingForm enforces valid Egyptian phone numbers and required fields', () => {
  const invalid = validateBookingForm({
    customerName: 'أح',
    phone: '12345',
    pickupDate: '',
    pickupLocation: '',
    vehicleSlug: '',
    period: 'daily',
    quantity: 1,
    withDriver: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.customerName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.pickupDate);

  const valid = validateBookingForm({
    customerName: 'أحمد محمود علي',
    phone: '01004418955',
    pickupDate: '2026-11-01',
    pickupLocation: 'المقر الرئيسي - أسيوط شارع الجلاء',
    vehicleSlug: 'kia-cerato-2026',
    period: 'daily',
    quantity: 3,
    withDriver: true,
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
