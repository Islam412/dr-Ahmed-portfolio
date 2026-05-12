import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaCode } from 'react-icons/fa';
import { content } from '../data/content';

const Footer = ({ language }) => {
  const t = content[language].footer;
  const isRTL = language === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-premium rounded-none border-b-0 border-x-0 py-8 mt-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {/* Main Footer Content */}
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <span>© {currentYear}</span>
              <span className="text-gradient-rainbow font-semibold">Dr. Ahmed Mosa</span>
              <span>{t.rights}</span>
            </motion.div>

            {/* Heart Line - Designed by Islam Hamdy */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="flex items-center justify-center gap-2 py-3 px-6 glass-premium rounded-full"
            >
              <span className="text-gray-400 text-sm">
                {isRTL ? 'صمم بكل حب بواسطة' : 'Designed with love by'}
              </span>
              <motion.a
                href="https://github.com/islam412"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 group"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <FaHeart className="text-red-500 text-sm group-hover:text-red-400 transition-colors" />
                </motion.div>
                <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                  Islam Hamdy
                </span>
                <FaGithub className="text-gray-400 group-hover:text-white transition-colors text-sm" />
              </motion.a>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-gray-500 text-xs"
            >
              <FaCode />
              <span>React + Vite + Tailwind CSS + Framer Motion</span>
            </motion.div>
          </div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4"
          />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;