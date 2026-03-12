import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

export interface Artist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  portfolio: string[];
  availableDays: string[];
}

export const artists: Artist[] = [
  {
    id: "marina-costa",
    name: "Marina Costa",
    specialty: "Fine Line & Botânica",
    bio: "Especialista em traços finos e ilustrações botânicas. Cada peça é desenhada à mão com atenção obsessiva ao detalhe.",
    image: artist1,
    portfolio: [artist1, portfolio4, portfolio6, portfolio2],
    availableDays: ["2026-03-16", "2026-03-18", "2026-03-20", "2026-03-23", "2026-03-25", "2026-03-27"],
  },
  {
    id: "rafael-tanaka",
    name: "Rafael Tanaka",
    specialty: "Oriental & Blackwork",
    bio: "Fusão de tradição japonesa com técnicas contemporâneas. Dragões, carpas e ondas ganham vida em composições que respeitam a anatomia.",
    image: artist2,
    portfolio: [artist2, portfolio3, portfolio5, portfolio2],
    availableDays: ["2026-03-17", "2026-03-19", "2026-03-21", "2026-03-24", "2026-03-26"],
  },
  {
    id: "lena-vieira",
    name: "Lena Vieira",
    specialty: "Minimalismo & Geométrico",
    bio: "Menos é mais. Linhas precisas, formas puras e composições que dialogam com o corpo. Cada tattoo é uma declaração silenciosa.",
    image: artist3,
    portfolio: [artist3, portfolio4, portfolio6, portfolio3],
    availableDays: ["2026-03-16", "2026-03-19", "2026-03-22", "2026-03-25", "2026-03-28"],
  },
];
