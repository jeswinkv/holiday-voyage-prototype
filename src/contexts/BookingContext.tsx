
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DateRange } from 'react-day-picker';
import { differenceInDays } from 'date-fns';

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
  getNumberOfNights: () => number;
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

  const getNumberOfNights = () => {
    if (bookingState.dateRange?.from && bookingState.dateRange?.to) {
      const nights = differenceInDays(bookingState.dateRange.to, bookingState.dateRange.from);
      return nights > 0 ? nights : 1; // Minimum 1 night
    }
    return 7; // Default to 7 nights if no dates selected
  };

  return (
    <BookingContext.Provider value={{ 
      bookingState, 
      updateBookingState, 
      addToTotal, 
      subtractFromTotal, 
      setTotal,
      getNumberOfNights
    }}>
      {children}
    </BookingContext.Provider>
  );
};
