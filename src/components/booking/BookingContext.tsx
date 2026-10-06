"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type BookingData = {
  serviceId?: string;
  date?: string;
  timeSlot?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceAddress?: string;
  additionalNotes?: string;
};

interface BookingContextType {
  data: BookingData;
  updateData: (updates: Partial<BookingData>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BookingData>({});

  useEffect(() => { try { setData(prev=>({...JSON.parse(sessionStorage.getItem("fixflow-draft") || "{}"),...prev})); } catch {} }, []);

  const updateData = (updates: Partial<BookingData>) => {
    setData((prev) => { const next={...prev,...updates}; sessionStorage.setItem("fixflow-draft",JSON.stringify(next)); return next; });
  };

  return (
    <BookingContext.Provider value={{ data, updateData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
