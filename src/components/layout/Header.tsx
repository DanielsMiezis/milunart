import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../ui/LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
  }`;

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const activeLinkClasses = 'font-medium text-[#722F37]';
  const linkClasses = 'text-gray-800 hover:text-[#722F37] transition-colors';

  return (
    <header className={headerClasses}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="z-10">
          <h1 className="logo">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              IngunaMiluna
            </motion.span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center">
          <nav className="flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 ${
                  location.pathname === link.path ? activeLinkClasses : linkClasses
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="ml-4 pl-4 border-l border-gray-200">
            <LanguageSelector />
          </div>
        </div>

        <button
          className="md:hidden z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-0 md:hidden">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xl ${
                    location.pathname === link.path ? 'text-[#722F37] font-medium' : 'text-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 w-24 text-center">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;