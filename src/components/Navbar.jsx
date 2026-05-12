import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { content } from '../data/content';

const Navbar = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = content[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.home, href: '#home' },
    { name: t.services, href: '#services' },
    { name: t.diseases, href: '#diseases' },
    { name: t.gallery, href: '#gallery' },
    { name: t.about, href: '#about' },
    { name: t.contact, href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-card py-3' : 'bg-transparent py-5'
      }`}
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold"
        >
          <span className="text-cyan-400">Dr.</span>
          <span className="text-white"> Ahmed Mosa</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 animated-border"
              whileHover={{ y: -2 }}
            >
              {item.name}
            </motion.a>
          ))}
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-full left-0 right-0 glass-card mt-2 py-4 flex flex-col items-center gap-4 md:hidden"
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;