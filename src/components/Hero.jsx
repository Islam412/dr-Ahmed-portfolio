import { motion } from 'framer-motion';
import { FaTooth, FaArrowDown, FaWhatsapp, FaStethoscope } from 'react-icons/fa';
import { content, socialLinks } from '../data/content';

const Hero = ({ language }) => {
  const t = content[language].hero;
  const isRTL = language === 'ar';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl"></div>
        
        {/* Animated floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 20, -20, 20],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex-1 text-center lg:text-${isRTL ? 'right' : 'left'} ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="glass-card px-5 py-2.5 text-cyan-400 text-sm font-semibold rounded-full border border-cyan-500/30">
                <FaStethoscope className="inline mr-2 mb-0.5" />
                {language === 'ar' ? 'أفضل رعاية لابتسامتك' : 'Best Care For Your Smile'}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t.title}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-300 mb-4 font-light"
            >
              {t.subtitle}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {t.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(56, 189, 248, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-center flex items-center justify-center gap-2 group"
              >
                <FaWhatsapp className="group-hover:scale-110 transition-transform" />
                {t.cta}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#services"
                className="px-8 py-3.5 glass-card border border-cyan-500/30 rounded-full font-semibold text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300 text-center"
              >
                {t.services}
              </motion.a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">15+ {language === 'ar' ? 'سنوات خبرة' : 'Years Experience'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">5000+ {language === 'ar' ? 'مرضى سعداء' : 'Happy Patients'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">24/7 {language === 'ar' ? 'دعم طبي' : 'Medical Support'}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Section - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              
              {/* Rotating border ring */}
              <motion.div
                className="absolute inset-[-10px] rounded-full border-2 border-dashed border-cyan-500/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Main Image */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Dr. Ahmed Mosa"
                    className="w-80 h-80 md:w-96 md:h-96 rounded-full object-cover border-4 border-cyan-500/50 shadow-2xl"
                  />
                  
                  {/* Floating badge 1 */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-5 -right-5 glass-card p-3 rounded-full shadow-lg"
                  >
                    <FaTooth className="text-3xl text-cyan-400" />
                  </motion.div>
                  
                  {/* Floating badge 2 */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute -bottom-5 -left-5 glass-card p-3 rounded-full shadow-lg"
                  >
                    <FaStethoscope className="text-3xl text-blue-400" />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Stats circles around image */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-10 left-0 glass-card px-3 py-1.5 rounded-full text-sm"
              >
                ⭐ 4.9 {language === 'ar' ? 'تقييم' : 'Rating'}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-8 right-5 glass-card px-3 py-1.5 rounded-full text-sm"
              >
                🏆 {language === 'ar' ? 'معتمد دولياً' : 'Internationally Certified'}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <a href="#services" className="text-cyan-400 text-2xl hover:text-cyan-300 transition-colors">
            <FaArrowDown className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;