import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { artists } from "@/data/artists";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ArtistProfile = () => {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === id);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Artista não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 container mx-auto px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </motion.div>

        {/* Artist info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <h1
              className="font-display font-bold text-foreground leading-tight mb-2"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              {artist.name}
            </h1>
            <p className="text-muted-foreground text-sm mb-6">{artist.specialty}</p>
            <p className="text-foreground leading-relaxed mb-8">{artist.bio}</p>
            <Link
              to={`/agendar/${artist.id}`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Agendar sessão
            </Link>
          </motion.div>

          <div className="lg:col-span-8">
            <div className="columns-2 gap-4 space-y-4">
              {artist.portfolio.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.08 }}
                  className="break-inside-avoid"
                >
                  <img
                    src={img}
                    alt={`Portfólio ${artist.name} - trabalho ${i + 1}`}
                    className="w-full rounded-xl object-cover"
                    style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArtistProfile;
