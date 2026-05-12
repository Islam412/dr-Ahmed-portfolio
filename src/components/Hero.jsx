import { motion } from 'framer-motion';
import { FaTooth, FaArrowDown } from 'react-icons/fa';
import { content, socialLinks } from '../data/content';

const Hero = ({ language }) => {
  const t = content[language].hero;
  const isRTL = language === 'ar';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex-1 text-center lg:text-${isRTL ? 'right' : 'left'}`}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="glass-card px-4 py-2 text-cyan-400 text-sm font-semibold">
                {language === 'ar' ? 'أفضل رعاية لابتسامتك' : 'Best Care For Your Smile'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t.title}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-300 mb-4"
            >
              {t.subtitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {t.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-center"
              >
                {t.cta}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#services"
                className="px-8 py-3 glass-card border border-cyan-500/30 rounded-full font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 text-center"
              >
                {t.services}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Animated Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Dr. Ahmed Mosa"
                  className="w-80 h-80 rounded-full object-cover border-4 border-cyan-500/50 shadow-2xl"
                />
                <div className="absolute -bottom-5 -right-5 glass-card p-4 rounded-full">
                  <FaTooth className="text-4xl text-cyan-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a href="#services" className="text-cyan-400 text-2xl">
            <FaArrowDown />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;