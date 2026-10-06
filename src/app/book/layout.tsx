import { DemoBar } from "@/components/DemoBar";
import { BookingProvider } from "@/components/booking/BookingContext";
import { MinimalNavbar } from "@/components/booking/MinimalNavbar";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <MinimalNavbar />
      <DemoBar />
      <main className="flex-1">
        <BookingProvider>
          {children}
        </BookingProvider>
      </main>
    </div>
  );
}
