import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-lg">
        {/* Stor rubrik */}
        <h1 className="font-logo text-6xl md:text-8xl mb-6 text-logo-text">404</h1>

        {/* Text */}
        <p className="text-xl text-muted-foreground mb-2">
          Sidan kunde inte hittas
        </p>
        <p className="text-muted-foreground mb-8">
          Den sida du försökte nå verkar inte existera.
        </p>

        {/* Knapp */}
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link to="/">Tillbaka till startsidan</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
