import disneyLogo from '@/assets/logo/disney-logo.svg';

export default function Footer() {
    return (
      <footer 
        className="pb-10"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="container mx-auto px-4">
          <div 
            className="flex flex-col items-center gap-4"
            aria-label="Footer content"
          >
            {/* Logo with link to home */}
            <a 
              href="/" 
              aria-label="Return to Disney home page"
              className="focus:outline-none focus:ring-2 focus:ring-disney-blue focus:ring-opacity-50 rounded-lg"
            >
              <img 
                src={disneyLogo} 
                alt="Disney Logo"
                className="h-11 w-auto hover:scale-110 transition-all duration-300"
                width="110"
                height="44"
                aria-hidden="true"
              />
            </a>


            <div 
              role="contentinfo" 
              aria-label="Legal disclaimer"
            >
              <p className="font-[Lato] text-footer-text font-normal text-center text-xs">
                For educational use only. All characters and content are the property of Disney. 
                This test is for private use and development testing only and should not be 
                distributed for public consumption
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
}