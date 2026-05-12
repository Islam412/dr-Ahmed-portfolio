import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors"
    >
      <FaGlobe className="text-cyan-400" />
      <span className="text-cyan-400 font-medium">{language === 'ar' ? 'EN' : 'AR'}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;