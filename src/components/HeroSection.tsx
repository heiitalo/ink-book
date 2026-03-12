import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-tattoo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tatuagem botânica fine-line em antebraço"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <h1 className="text-primary-foreground font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
          >
            Arte que permanece.
            <br />
            Agende sua sessão.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          className="mt-6 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="#artistas"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("artistas")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-foreground text-primary font-medium text-base transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Conheça os artistas
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
