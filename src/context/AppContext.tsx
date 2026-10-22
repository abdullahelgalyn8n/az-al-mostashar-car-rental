import React, { createContext, useContext, useState, useEffect } from 'react';
import { RentalPeriod } from '../utils/fleetLogic';

export interface SavedBooking {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  pickupDate: string;
  pickupLocation: string;
  vehicleSlug: string;
  vehicleTitle: string;
  period: RentalPeriod;
  periodLabel: string;
  quantity: number;
  withDriver: boolean;
  totalEgp: number;
  status: 'مؤكد المبدئي - قيد المتابعة' | 'تم التواصل';
  notes?: string;
}

export interface ContactSubmission {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

interface AppContextValue {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  bookings: SavedBooking[];
  addBooking: (booking: Omit<SavedBooking, 'id' | 'createdAt' | 'status'>) => SavedBooking;
  removeBooking: (id: string) => void;
  contactSubmissions: ContactSubmission[];
  addContactSubmission: (sub: Omit<ContactSubmission, 'id' | 'createdAt'>) => ContactSubmission;
  user: UserProfile | null;
  loginUser: (profile: UserProfile) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  FAVORITES: 'almostashar_favorites_v1',
  BOOKINGS: 'almostashar_bookings_v1',
  USER: 'almostashar_user_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['kia-cerato-2026', 'mercedes-s-class'];
    } catch {
      return ['kia-cerato-2026', 'mercedes-s-class'];
    }
  });

  const [bookings, setBookings] = useState<SavedBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {
      // ignore storage errors
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch {
      // ignore storage errors
    }
  }, [bookings]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {
      // ignore storage errors
    }
  }, [user]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  };

  const addBooking = (
    bookingInput: Omit<SavedBooking, 'id' | 'createdAt' | 'status'>
  ): SavedBooking => {
    const newBooking: SavedBooking = {
      ...bookingInput,
      id: `ALM-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      status: 'مؤكد المبدئي - قيد المتابعة',
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const removeBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const addContactSubmission = (
    sub: Omit<ContactSubmission, 'id' | 'createdAt'>
  ): ContactSubmission => {
    const entry: ContactSubmission = {
      ...sub,
      id: `MSG-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setContactSubmissions((prev) => [entry, ...prev]);
    return entry;
  };

  const loginUser = (profile: UserProfile) => {
    setUser(profile);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        bookings,
        addBooking,
        removeBooking,
        contactSubmissions,
        addContactSubmission,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
