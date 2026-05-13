import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaTooth, 
  FaArrowDown, 
  FaStar, 
  FaStarHalf, 
  FaCertificate, 
  FaPhoneAlt, 
  FaCalendarAlt,
  FaShieldAlt
} from 'react-icons/fa';
import { content, socialLinks } from '../data/content';
import { useState, useEffect } from 'react';

const Hero = ({ language }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const t = content[language].hero;
  const isRTL = language === 'ar';
  
  const rotatingTexts = isRTL 
    ? ['أفضل طبيب أسنان', 'ابتسامة هوليود', 'علاج بدون ألم', 'تقنيات حديثة']
    : ['Best Dentist', 'Hollywood Smile', 'Painless Treatment', 'Modern Tech'];

  useEffect(() => {
    let timeout;
    if (displayText.length < rotatingTexts[textIndex].length) {
      timeout = setTimeout(() => {
        setDisplayText(rotatingTexts[textIndex].slice(0, displayText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setDisplayText('');
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [displayText, textIndex, rotatingTexts]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex-1 text-center lg:text-left ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-block mb-6"
            >
              <div className="glass-premium px-6 py-2.5 rounded-full border border-cyan-500/30">
                <span className="text-gradient-rainbow font-semibold text-sm">
                  ⚡ {isRTL ? 'أفضل 1% من أطباء الأسنان' : 'Top 1% of Dentists'} ⚡
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
            >
              <span className="text-gradient-rainbow">
                {t.title}
              </span>
            </motion.h1>

            {/* Animated Rotating Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <div className="text-2xl md:text-3xl text-gray-300">
                {t.subtitle}
              </div>
              <div className="text-xl md:text-2xl text-cyan-400 mt-2 font-semibold">
                {displayText}
                <span className="animate-pulse">|</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {t.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.whatsapp}
                target="_blank"
                className="btn-glow flex items-center justify-center gap-3 group"
              >
                <FaWhatsapp className="group-hover:scale-110 transition-transform" />
                <span>{t.cta}</span>
                <FaArrowDown className="group-hover:translate-y-1 transition-transform" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#services"
                className="glass-premium px-8 py-3.5 text-cyan-400 font-semibold hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300 rounded-full flex items-center justify-center gap-2"
              >
                <FaTooth />
                {t.services}
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 px-3 py-2 glass-premium rounded-full">
                <div className="flex text-yellow-500">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
                </div>
                <span className="text-gray-300 text-sm">4.9 (500+)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 glass-premium rounded-full">
                <FaCertificate className="text-cyan-400" />
                <span className="text-gray-300 text-sm">{isRTL ? 'معتمد دولياً' : 'Certified'}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 glass-premium rounded-full">
                <FaShieldAlt className="text-green-400" />
                <span className="text-gray-300 text-sm">24/7</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Animated Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-20px] rounded-full border-4 border-dashed border-cyan-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-40px] rounded-full border-2 border-dotted border-purple-500/30"
              />
              
              {/* Main Image */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-2xl animate-pulse-glow"></div>
                <img
                  src="/photo.png"
                  alt="Dr. Ahmed Mosa"
                  className="w-80 h-80 md:w-96 md:h-96 rounded-full object-cover border-4 border-gradient-rainbow shadow-2xl relative z-10"
                />
                
                {/* Floating Cards */}
                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-10 -right-10 glass-premium p-3 rounded-2xl z-20"
                >
                  <FaCalendarAlt className="text-cyan-400 text-2xl" />
                  <div className="text-xs text-white mt-1">15+ {isRTL ? 'سنوات' : 'Years'}</div>
                </motion.div>
                
                <motion.div
                  animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-10 -left-10 glass-premium p-3 rounded-2xl z-20"
                >
                  <FaTooth className="text-purple-400 text-2xl" />
                  <div className="text-xs text-white mt-1">5000+ {isRTL ? 'مرضى' : 'Patients'}</div>
                </motion.div>
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 glass-premium px-6 py-2 rounded-full z-20"
              >
                <span className="text-gradient-primary font-bold">⭐ {isRTL ? 'خبرة ممتدة لأكثر من 15 عاماً' : 'Over 15 Years'}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        >
          <div className="w-8 h-12 rounded-full border-2 border-cyan-400 flex justify-center">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-cyan-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;