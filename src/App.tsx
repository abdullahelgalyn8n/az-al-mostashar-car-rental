/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FleetSearchPage } from './pages/FleetSearchPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { BranchesPage } from './pages/BranchesPage';
import { ContactPage } from './pages/ContactPage';
import {
  PrivacyPage,
  TermsPage,
  FaqPage,
  BookingsAndFavoritesPage,
  AuthPage,
} from './pages/LegalAndFaqPages';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<FleetSearchPage />} />
            <Route path="/search" element={<FleetSearchPage />} />
            <Route path="/cars/:slug" element={<VehicleDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/branches" element={<BranchesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/bookings" element={<BookingsAndFavoritesPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
