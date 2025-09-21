import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnHeroSection, setIsOnHeroSection] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  // Observera vilken sektion som är synlig
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 100; // Offset för header höjd
        
        setIsOnHeroSection(scrollPosition < heroBottom);
      }
    };

    // Endast på startsidan
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Kör en gång vid load
    } else {
      setIsOnHeroSection(false); // Alltid mörk på andra sidor
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    // Om vi inte är på startsidan, navigera dit först
    if (location.pathname !== '/') {
      navigate('/');
      // Vänta lite så sidan hinner laddas, sen scrolla
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navItems = [
    { type: 'scroll', sectionId: 'home', label: 'Hem' },
    { type: 'link', path: '/showroom', label: 'Inspiration' },
    { type: 'link', path: '/shop', label: 'Produkter' },
    { type: 'link', path: '/kurser', label: 'Kurser' },
    { type: 'link', path: '/om-oss', label: 'Om Oss' },
  ];

  // Dynamiska färger baserat på sektion
  const headerBg = isOnHeroSection ? 'bg-transparent' : '';
  const headerStyle = isOnHeroSection ? {} : { backgroundColor: "var(--background)" };
  const textColor = isOnHeroSection ? 'text-white' : 'text-logo-text';
  const logoColor = isOnHeroSection ? 'text-white' : 'text-logo-text';
  const borderColor = isOnHeroSection ? 'border-white/20' : 'border-border';
  const headerHeight = isOnHeroSection ? 'h-16' : 'h-12';

  return (
    <nav className={`${headerBg} border-b ${borderColor} sticky top-0 z-50 transition-all duration-300`} style={headerStyle}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${headerHeight} transition-all duration-300`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className={`font-logo ${isOnHeroSection ? 'text-2xl' : 'text-xl'} ${logoColor} tracking-wide transition-all duration-300`}>
              Sadelmakeriet
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              item.type === 'scroll' ? (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`font-medium transition-colors hover:text-primary ${
                    isActive(item.path) 
                      ? "text-primary border-b-2 border-primary" 
                      : textColor
                  } cursor-pointer`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors hover:text-primary ${
                    isActive(item.path) 
                      ? "text-primary border-b-2 border-primary" 
                      : textColor
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={textColor}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden py-4 border-t ${borderColor}`}>
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                item.type === 'scroll' ? (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.sectionId)}
                    className={`font-medium text-base transition-colors hover:text-primary ${
                      isActive(item.path) ? "text-primary" : textColor
                    } text-left cursor-pointer`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium text-base transition-colors hover:text-primary ${
                      isActive(item.path) ? "text-primary" : textColor
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;