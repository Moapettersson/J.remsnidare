import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-warm"
    style={{ backgroundColor: "var(--background)" }}>
      
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold font-playfair text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Sidan kunde inte hittas</p>
        <p className="mb-8 text-muted-foreground">Den sida du söker verkar inte existera.</p>
        <Button asChild>
          <Link to="/">
            Tillbaka till startsidan
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
