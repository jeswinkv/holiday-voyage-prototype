
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DateRange } from 'react-day-picker';

interface BookingState {
  origin: string;
  destination: string;
  dateRange: DateRange | undefined;
  adults: string;
  children: string;
  infants: string;
  totalAmount: number;
}

interface BookingContextType {
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  addToTotal: (amount: number) => void;
  subtractFromTotal: (amount: number) => void;
  setTotal: (amount: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookingState, setBookingState] = useState<BookingState>({
    origin: '',
    destination: '',
    dateRange: undefined,
    adults: '2',
    children: '0',
    infants: '0',
    totalAmount: 0,
  });

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  };

  const addToTotal = (amount: number) => {
    setBookingState(prev => ({ ...prev, totalAmount: prev.totalAmount + amount }));
  };

  const subtractFromTotal = (amount: number) => {
    setBookingState(prev => ({ ...prev, totalAmount: Math.max(0, prev.totalAmount - amount) }));
  };

  const setTotal = (amount: number) => {
    setBookingState(prev => ({ ...prev, totalAmount: amount }));
  };

  return (
    <BookingContext.Provider value={{ 
      bookingState, 
      updateBookingState, 
      addToTotal, 
      subtractFromTotal, 
      setTotal 
    }}>
      {children}
    </BookingContext.Provider>
  );
};
