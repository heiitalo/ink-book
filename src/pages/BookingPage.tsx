import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Upload, X } from "lucide-react";
import { artists } from "@/data/artists";
import { Calendar } from "@/components/ui/calendar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;

const BODY_PARTS = [
  "Braço", "Antebraço", "Ombro", "Costas", "Peito",
  "Costela", "Perna", "Coxa", "Tornozelo", "Pulso", "Pescoço", "Outro",
];

const BookingPage = () => {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === id);
  const [step, setStep] = useState<Step>(1);

  // Step 1 state
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [references, setReferences] = useState<File[]>([]);

  // Step 2 state
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Step 3 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Artista não encontrado.</p>
      </div>
    );
  }

  const availableDateObjects = artist.availableDays.map((d) => new Date(d + "T12:00:00"));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReferences((prev) => [...prev, ...files].slice(0, 3));
  };

  const removeFile = (index: number) => {
    setReferences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDates((prev) => {
      const exists = prev.find((d) => d.toDateString() === date.toDateString());
      if (exists) return prev.filter((d) => d.toDateString() !== date.toDateString());
      if (prev.length >= 3) return prev;
      return [...prev, date];
    });
  };

  const isAvailableDay = (date: Date) => {
    return availableDateObjects.some((d) => d.toDateString() === date.toDateString());
  };

  const canAdvance = () => {
    if (step === 1) return description.trim() && size.trim() && bodyPart;
    if (step === 2) return selectedDates.length > 0;
    if (step === 3) return name.trim() && email.trim() && phone.trim();
    return false;
  };

  const handleSubmit = () => {
    setStep(4);
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background";
  const inputShadow = { boxShadow: "var(--shadow-button)" };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={`/artista/${artist.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para {artist.name}
          </Link>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          {step < 4 && (
            <div className="flex items-center gap-2 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      s <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {s < step ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={cn(
                        "flex-1 h-px",
                        s < step ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Project */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2
                  className="font-display font-bold text-foreground leading-tight mb-2"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
                >
                  Seu projeto
                </h2>
                <p className="text-muted-foreground mb-8">
                  Descreva sua ideia para {artist.name}.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Descrição da ideia
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Conte o que você imagina para sua tatuagem..."
                      rows={4}
                      className={inputClass}
                      style={inputShadow}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tamanho estimado (cm)
                      </label>
                      <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="Ex: 10x15"
                        className={inputClass}
                        style={inputShadow}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Local do corpo
                      </label>
                      <select
                        value={bodyPart}
                        onChange={(e) => setBodyPart(e.target.value)}
                        className={cn(inputClass, !bodyPart && "text-muted-foreground")}
                        style={inputShadow}
                      >
                        <option value="">Selecione</option>
                        {BODY_PARTS.map((part) => (
                          <option key={part} value={part}>{part}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Imagens de referência (opcional)
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Anexe até 3 imagens de referência.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {references.map((file, i) => (
                        <div
                          key={i}
                          className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Referência ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeFile(i)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-foreground/80 text-background flex items-center justify-center"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {references.length < 3 && (
                        <label className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-muted-foreground transition-colors">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Dates */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2
                  className="font-display font-bold text-foreground leading-tight mb-2"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
                >
                  Datas de preferência
                </h2>
                <p className="text-muted-foreground mb-8">
                  Selecione até 3 datas disponíveis. O artista confirmará a melhor opção.
                </p>

                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={undefined}
                    onSelect={handleDateSelect}
                    disabled={(date) => !isAvailableDay(date)}
                    modifiers={{
                      selected: selectedDates,
                    }}
                    modifiersClassNames={{
                      selected: "bg-primary text-primary-foreground",
                    }}
                    className="p-3 pointer-events-auto rounded-xl"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  />
                </div>

                {selectedDates.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedDates.map((date, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm text-foreground"
                      >
                        {date.toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "short",
                        })}
                        <button onClick={() => handleDateSelect(date)}>
                          <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2
                  className="font-display font-bold text-foreground leading-tight mb-2"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
                >
                  Seus dados
                </h2>
                <p className="text-muted-foreground mb-8">
                  Para que o artista entre em contato.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nome</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome completo"
                      className={inputClass}
                      style={inputShadow}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className={inputClass}
                      style={inputShadow}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className={inputClass}
                      style={inputShadow}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-8"
                >
                  <Check className="w-8 h-8" />
                </motion.div>
                <h2
                  className="font-display font-bold text-foreground leading-tight mb-4"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
                >
                  Pedido enviado
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Seu pedido foi enviado para {artist.name}. O artista entrará em contato
                  para confirmar a data e o orçamento.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  Voltar ao início
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-12">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="px-6 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Voltar
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={() => {
                  if (step === 3) handleSubmit();
                  else setStep((s) => (s + 1) as Step);
                }}
                disabled={!canAdvance()}
                className={cn(
                  "px-8 py-3 rounded-full font-medium text-sm transition-all",
                  canAdvance()
                    ? "bg-primary text-primary-foreground hover:scale-[1.03] active:scale-[0.98]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {step === 3 ? "Enviar pedido" : "Continuar"}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
