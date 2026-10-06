import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function ContactStrip() {
  return (
    <section id="contact" className="w-full bg-brand-primary py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 border border-white/30 shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white/80 font-medium">Email</span>
              <span className="font-semibold text-sm xl:text-base">hello@fixflow.com</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 border border-white/30 shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white/80 font-medium">Phone</span>
              <span className="font-semibold text-base">(310) 123-4567</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 border border-white/30 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white/80 font-medium">Office Address</span>
              <span className="font-semibold text-sm xl:text-base">775 Rolling Green Rd.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20 border border-white/30 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-white/80 font-medium">Monday - Saturday</span>
              <span className="font-semibold text-base">08:00 - 20:00</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
