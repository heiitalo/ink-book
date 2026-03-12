import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl text-foreground tracking-tight">
          INKS.
        </Link>
        <Link
          to="/#artistas"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("artistas")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Artistas
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
