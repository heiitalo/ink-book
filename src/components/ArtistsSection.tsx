import { motion } from "framer-motion";
import { artists } from "@/data/artists";
import ArtistCard from "./ArtistCard";

const ArtistsSection = () => {
  return (
    <section id="artistas" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="font-display font-bold text-foreground leading-tight mb-16"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
        >
          Nossos Artistas
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;
