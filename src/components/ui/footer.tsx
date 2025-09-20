import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 relative pt-20 pb-16 text-center"
      style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Logga / copyright */}
          <div className="flex flex-col">
            <span className="font-logo text-2xl mb-2">Sadelmakeriet</span>
            <span className="text-sm text-foreground/70">&copy; {new Date().getFullYear()} Alla rättigheter reserverade.</span>
          </div>

          {/* Navigationslänkar */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm md:text-base">
            <Link to="/showroom" className="hover:text-primary">Showroom</Link>
            <Link to="/shop" className="hover:text-primary">Webbshop</Link>
            <Link to="/courses" className="hover:text-primary">Kurser</Link>
            <Link to="/contact" className="hover:text-primary">Kontakt</Link>
          </div>

          {/* Social / kontakt */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <a href="mailto:info@sadelmakeriet.se" className="hover:text-primary"><Mail className="w-5 h-5" /></a>
              <a href="tel:+4600000000" className="hover:text-primary"><Phone className="w-5 h-5" /></a>
              <a href="https://facebook.com" target="_blank" className="hover:text-primary"><Facebook className="w-5 h-5" /></a>
              <a href="https://instagram.com" target="_blank" className="hover:text-primary"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
