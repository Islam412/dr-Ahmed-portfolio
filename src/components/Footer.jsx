import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { content } from '../data/content';

const Footer = ({ language }) => {
  const t = content[language].footer;
  const isRTL = language === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-card py-8 mt-20">
      <div className="container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-400"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          © {currentYear} Dr. Ahmed Mosa. {t.rights}.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-sm mt-2"
        >
          {isRTL ? 'صُمم بحب باستخدام أحدث التقنيات' : 'Made with'} <FaHeart className="inline text-red-500 animate-pulse" /> {!isRTL && 'using latest technologies'}
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;