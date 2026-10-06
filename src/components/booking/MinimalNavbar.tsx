import Link from "next/link";
import { Fan, ArrowLeft } from "lucide-react";

export function MinimalNavbar() {
  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="h-5 w-5 text-brand-black" />
          </div>
        </Link>
        <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="text-brand-primary">
            <Fan className="h-7 w-7" />
          </div>
          <span className="text-xl font-bold text-brand-black tracking-tight">FixFlow</span>
        </Link>
        <div className="w-[40px]" /> {/* Spacer to enforce exact absolute centering */}
      </div>
    </header>
  );
}
