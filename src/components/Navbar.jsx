import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaTooth, FaUserMd, FaStethoscope, FaHome, FaServicestack, FaImage, FaEnvelope } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { content } from '../data/content';

const Navbar = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = content[language].nav;
  const isRTL = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'services', 'diseases', 'gallery', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', name: t.home, icon: <FaHome /> },
    { id: 'services', name: t.services, icon: <FaServicestack /> },
    { id: 'diseases', name: t.diseases, icon: <FaUserMd /> },
    { id: 'gallery', name: t.gallery, icon: <FaImage /> },
    { id: 'about', name: t.about, icon: <FaUserMd /> },
    { id: 'contact', name: t.contact, icon: <FaEnvelope /> }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-gradient-to-r from-slate-900/95 to-purple-900/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/20' 
            : 'bg-transparent'
        }`}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaTooth className="text-white text-xl" />
              </div>
              <div className="hidden sm:block">
                <span className="text-cyan-400 font-bold text-xl">Dr.</span>
                <span className="text-white font-bold text-xl"> Ahmed Mosa</span>
              </div>
            </div>
          </motion.a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                whileHover={{ y: -2 }}
                className={`relative px-5 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 100 : -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden"
          >
            <div className="glass-premium mx-4 p-4 rounded-2xl">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;