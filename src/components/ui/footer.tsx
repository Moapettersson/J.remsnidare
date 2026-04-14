import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

const navItems = [
  { path: "/", label: "Hem" },
  { path: "/showroom", label: "Inspiration" },
  { path: "/shop", label: "Produkter" },
  { path: "/kurser", label: "Kurser" },
  { path: "/om-oss", label: "Om Oss" },
];

export default function Footer() {
  return (
    <footer
      className="py-20 relative pt-20 pb-16 text-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ändrat från items-start till items-center för att centrera på mobil */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logga / copyright - Tillagt: items-center md:items-start */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-logo text-2xl mb-2">Sadelmakeriet</span>
            <span className="text-sm text-foreground/70">
              &copy; {new Date().getFullYear()} Alla rättigheter reserverade.
            </span>
          </div>

          {/* Navigationslänkar - Tillagt: items-center */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm md:text-base">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:bg-beige-800 hover:text-beige-900"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social / kontakt */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            {/* Tillagt: justify-center md:justify-start */}
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="mailto:info@sadelmakeriet.se"
                className="hover:bg-beige-800 hover:text-beige-900"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+4600000000"
                className="hover:bg-beige-800 hover:text-beige-900"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/j_remsnidare/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-beige-800 hover:text-beige-900"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}