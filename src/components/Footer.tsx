const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-display font-bold text-lg text-foreground">
          INKS.
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Inks Studio. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
