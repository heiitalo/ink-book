import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Artist } from "@/data/artists";

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

const ArtistCard = ({ artist, index }: ArtistCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: index * 0.08 }}
    >
      <Link
        to={`/artista/${artist.id}`}
        className="group block"
      >
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          className="relative overflow-hidden rounded-xl"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={artist.image}
              alt={`Trabalho de ${artist.name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}
            />
          </div>
        </motion.div>

        <div className="mt-4 space-y-1">
          <h3 className="font-display font-bold text-xl text-foreground">
            {artist.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {artist.specialty}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtistCard;
