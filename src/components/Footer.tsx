const Footer = () => {
  return (
    <footer className="border-t border-border py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Studio Bura. All rights reserved.
          </p>
          <a
            href="https://www.studiobura.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-60 transition-opacity"
          >
            www.studiobura.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
